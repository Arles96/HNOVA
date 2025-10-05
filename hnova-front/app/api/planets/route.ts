import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/app/lib/mongoose';
import Exoplanet from '@/app/models/Exoplanet';
import ProjectModel from '@/app/models/Project';
import { IExoplanetData, IProject } from '@/lib/utils';
import { modelPrediction } from '../modelPrediction';

export async function POST(req: NextRequest) {
  try {
    console.log('start');
    await connectDB();

    console.log('db');

    const body: IProject = await req.json();
    
    // First, create the project and get its _id
    const project = await ProjectModel.create({
      projectName: body.projectName,
      email: body.email,
    });

    const projectId = `${project._id}`;

    // Then, insert each result from payload.results into Exoplanet
    let exoplanetResult;
    let count = 0;

    const formattedData: IExoplanetData[] = body.results.map((item) => ({
      ...item,
      projectId,
    }));

    console.log('predictions');
    const resultData: IExoplanetData[] | undefined = await modelPrediction(formattedData);
    console.log('predictions end');

    const exoplanetData = resultData?.map((item) => ({
      ...item,
      projectId,
    }));

    exoplanetResult = await Exoplanet.insertMany(exoplanetData || []);
    count = exoplanetResult.length;

    const response: IProject = {
      projectName: body.projectName,
      email: body.email,
      results: resultData || [],
      timestamp: project.timestamp?.toISOString(),
    }

    return NextResponse.json({
      ok: true,
      message: `Successfully created project and inserted ${count} exoplanet${count > 1 ? 's' : ''}`,
      data: response,
    }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error: error instanceof Error ? error.message : 'Failed to insert project and exoplanet data'
      },
      { status: 400 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const projectId = searchParams.get('projectId');
    const planetId = searchParams.get('planetId');

    const query: any = {};

    if (projectId) {
      query.projectId = projectId;
    }

    if (planetId) {
      query._id = planetId;
    }

    const exoplanets = await Exoplanet.find(query);
    const project = await ProjectModel.findOne({ _id: projectId });

    return NextResponse.json({
      ok: true,
      data: {
        project,
        exoplanets,
      },
    }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error: error instanceof Error ? error.message : 'Failed to fetch exoplanet data'
      },
      { status: 400 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    await connectDB();

    const { feedbackIsPlanet }: { feedbackIsPlanet: boolean } = await req.json();
    const { searchParams } = new URL(req.url);
    const planetId = searchParams.get('planetId');

    const query: any = {};

    if (planetId) {
      query._id = planetId;
    }

    const exoplanet = await Exoplanet.findOneAndUpdate(query, { feedbackIsPlanet });

    return NextResponse.json({
      ok: true,
      data: {
        exoplanet,
      },
    }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error: error instanceof Error ? error.message : 'Failed to fetch exoplanet data'
      },
      { status: 400 }
    );
  }
}