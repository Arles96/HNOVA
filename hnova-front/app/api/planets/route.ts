import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongoose';
import Exoplanet, { ExoplanetData } from '@/lib/Exoplanet';
import ProjectModel from '@/lib/Project';
import { IExoplanetData, IProject } from '@/lib/utils';

const modelPrediction = async (data: IExoplanetData[]) => {
  return new Promise<IExoplanetData[]>((resolve) => {
    setTimeout(() => {
      const result = data.map((item) => {
        const newData: IExoplanetData = {
          ...item,
          projectId: `${Math.random()}`,
          isExoplanet: Math.random() > 0.5,
          percentage: Math.random() * 100,
        };
        return newData;
      });
      resolve(result);
    }, 100);
  });
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const body: IProject = await req.json();

    // First, create the project and get its _id
    const project = await ProjectModel.create({
      projectName: body.projectName,
      email: body.email,
    });

    const projectId = project._id;

    // Then, insert each result from payload.results into Exoplanet
    let exoplanetResult;
    let count = 0;

    const resultData: IExoplanetData[] = await modelPrediction(body.results);

    const exoplanetData = resultData.map((item) => ({
      ...item,
      projectId,
    }));

    exoplanetResult = await Exoplanet.insertMany(exoplanetData);
    count = exoplanetResult.length;

    const response: IProject = {
      _id: project._id.toString(),
      projectName: body.projectName,
      email: body.email,
      results: resultData,
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
    const queryProject: any = {}
    
    if (projectId) {
      query.projectId = projectId;
      queryProject._id = projectId
    }
    
    if (planetId) {
      query._id = planetId;
    }

    let exoplanets: ExoplanetData[]  = []

    if (planetId || projectId) {
      exoplanets = await Exoplanet.find(query);
    }

    const projects = await ProjectModel.find(queryProject);

    return NextResponse.json({
      ok: true,
      data: {
        projects,
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