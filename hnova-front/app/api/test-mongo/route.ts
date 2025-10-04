// Copy this file to: app/api/hello/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const DB_NAME = 'myDatabase';

export async function GET() {
  let client;
  
  try {
    client = await MongoClient.connect(MONGODB_URI);
    const db = client.db(DB_NAME);
    const collection = db.collection('test');
    
    // Insert mockup data if collection is empty
    const count = await collection.countDocuments();
    if (count === 0) {
      const mockData = Array.from({ length: 20 }, (_, i) => ({
        name: `User ${i + 1}`,
        email: `user${i + 1}@example.com`,
        age: 20 + Math.floor(Math.random() * 40),
        createdAt: new Date(),
      }));
      await collection.insertMany(mockData);
    }
    
    // Retrieve last 10 documents
    const results = await collection
      .find({})
      .sort({ _id: -1 })
      .limit(10)
      .toArray();
    
    return NextResponse.json({ ok: true, data: results });
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: error instanceof Error ? error.message : 'Database error' },
      { status: 500 }
    );
  } finally {
    if (client) await client.close();
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    return NextResponse.json({ ok: true, received: body }, { status: 201 });
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid JSON body' }, { status: 400 });
  }
}