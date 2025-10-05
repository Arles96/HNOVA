import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongoose';
import mongoose from 'mongoose';

const TestSchema = new mongoose.Schema({
  hostId: String,
  isExoplanet: Boolean
}, { collection: 'test' });

const Test = mongoose.models.Test || mongoose.model('Test', TestSchema);

export async function GET() {
  try {
    await connectDB();
    
    const testData = await Test.create({
      hostId: 'TEST-001',
      isExoplanet: true
    });
    
    return NextResponse.json({ ok: true, data: testData });
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: error instanceof Error ? error.message : 'Database error' },
      { status: 500 }
    );
  }
}