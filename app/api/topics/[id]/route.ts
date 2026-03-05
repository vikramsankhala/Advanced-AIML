import { NextResponse } from 'next/server';
import topics from '@/data/topics.json';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const topic = topics.topics.find((t: { id: string }) => t.id === id);
  if (!topic) {
    return NextResponse.json({ error: 'Topic not found' }, { status: 404 });
  }
  return NextResponse.json(topic);
}
