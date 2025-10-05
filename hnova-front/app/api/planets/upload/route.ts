import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/app/lib/mongoose';
import Exoplanet, { ExoplanetData } from '@/app/models/Exoplanet';

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    
    const body: ExoplanetData | ExoplanetData[] = await req.json();
    
    let result;
    let count = 0;
    
    if (Array.isArray(body)) {
      result = await Exoplanet.insertMany(body);
      count = result.length;
    } else {
      result = await Exoplanet.create(body);
      count = 1;
    }
    
    return NextResponse.json({ 
      ok: true, 
      message: `Successfully inserted ${count} exoplanet${count > 1 ? 's' : ''}`,
      data: result 
    }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { 
        ok: false, 
        error: error instanceof Error ? error.message : 'Failed to insert exoplanet data' 
      },
      { status: 400 }
    );
  }
}