import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/app/lib/mongoose';
import Exoplanet from '@/app/models/Exoplanet';
import ProjectModel from '@/app/models/Project';
import { IExoplanetData, IProject } from '@/lib/utils';
import { modelPrediction } from '../modelPrediction';

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