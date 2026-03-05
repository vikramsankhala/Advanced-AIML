import { NextResponse } from 'next/server';
import topics from '@/data/topics.json';
import resources from '@/data/resources.json';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const topicId = searchParams.get('topicId');
  const type = searchParams.get('type');

  let filtered = resources.resources;

  if (topicId) {
    filtered = filtered.filter((r: { topicId: string }) => r.topicId === topicId);
  }
  if (type) {
    filtered = filtered.filter((r: { type: string }) => r.type === type);
  }

  return NextResponse.json({
    resources: filtered,
    topics: topics.topics,
  });
}
