import { NextResponse } from 'next/server';
import topics from '@/data/topics.json';

export async function GET() {
  return NextResponse.json(topics);
}
