import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/app/lib/mongoose';
import Exoplanet, { ExoplanetData } from '@/app/models/Exoplanet';
import ProjectModel, { Project } from '@/app/models/Project';
import { IProject } from '@/lib/utils';

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const body: Project = await req.json();

    // First, create the project and get its _id
    const project = await ProjectModel.create({
      projectName: body.projectName,
      email: body.email,
      results: body.results,
    });

    const projectId = project._id;

    // Then, insert each result from payload.results into Exoplanet
    let exoplanetResult;
    let count = 0;

    if (Array.isArray(body.results)) {
      exoplanetResult = await Exoplanet.insertMany(body.results);
      count = exoplanetResult.length;
    } else {
      exoplanetResult = await Exoplanet.create(body.results);
      count = 1;
    }

    const response: IProject = {
      projectName: body.projectName,
      email: body.email,
      results: body.results,
      timestamp: new Date(),
    }

    return NextResponse.json({
      ok: true,
      message: `Successfully created project and inserted ${count} exoplanet${count > 1 ? 's' : ''}`,
      projectId: projectId,
      exoplanetData: exoplanetResult
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