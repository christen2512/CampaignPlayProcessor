import { NextResponse } from 'next/server';
import redis from '@/lib/redis';

export async function GET() {
  try {
    const stats = await redis.hgetall('campaign_stats');

    const campaigns = Object.entries(stats).map(([campaign_id, count]) => ({
      campaign_id,
      play_count: parseInt(count, 10)
    }));
    
    campaigns.sort((a, b) => a.campaign_id.localeCompare(b.campaign_id));
    
    return NextResponse.json(campaigns);
  } catch (error) {
    console.error('Error fetching campaign stats:', error);
    return NextResponse.json({ error: 'Failed to fetch campaign stats' }, { status: 500 });
  }
}
