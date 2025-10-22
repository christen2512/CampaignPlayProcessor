import { NextResponse } from 'next/server';
import redis from '@/lib/redis';
import { ScreenStat } from '@/lib/types';


export async function GET(request: Request, context: {params: {campaignId: string}}) {
  try {
    const { campaignId } = await context.params;

    if (!campaignId) {
      return NextResponse.json({ error: 'Campaign ID is required' }, { status: 400 });
    }

    const allScreenStats = await redis.hgetall('screen_stats');

    const campaignScreenStats: ScreenStat[] = [];

    for (const [compositeKey, impressions] of Object.entries(allScreenStats)) {
      if (compositeKey.startsWith(`${campaignId}:`)) {
        const screen_id = compositeKey.split(':')[1];
        campaignScreenStats.push({
          screen_id,
          impressions: parseInt(impressions, 10),
        });
      }
    }

    return NextResponse.json(campaignScreenStats);

  } catch (error: any) {
    console.error('Error fetching screen stats:', error);
    return NextResponse.json({ error: 'Failed to fetch screen stats' }, { status: 500 });
  }
}