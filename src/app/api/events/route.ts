import { NextResponse } from 'next/server';
import redis from '@/lib/redis';
import { PlayEvent } from '@/lib/types';

export async function POST(request: Request) {
  try {
    const event = (await request.json()) as PlayEvent;

    if (!event.screen_id || !event.campaign_id || !event.timestamp) {
      return NextResponse.json({ error: 'Invalid event data' }, { status: 400 });
    }

    await redis.rpush('events_queue', JSON.stringify(event));

    return NextResponse.json({ message: 'Event accepted for processing' }, { status: 200 });
  } catch (error) {
    console.error('Error processing event:', error);
    return NextResponse.json({ error: 'Failed to process event' }, { status: 500 });
  }
}
