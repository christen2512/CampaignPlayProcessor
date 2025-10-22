import redis from './lib/redis';

console.log('Worker started, waiting for events...');

async function processEvents() {
  while (true) {
    try {
      const result = await redis.blpop('events_queue', 0);

      if (result) {
        const eventString = result[1];
        const event = JSON.parse(eventString);
        
        if (!event || !event.campaign_id || !event.screen_id) {
          console.error('Invalid event structure in queue:', event);
          continue; 
        }

        
        console.log('Processing event:', event);
        
        await redis.hincrby('campaign_stats', event.campaign_id, 1);

        const impressions = Math.floor(Math.random() * 10) + 1;
        const screenStatsKey = `${event.campaign_id}:${event.screen_id}`;

        console.log(`Generating impression ${impressions} for composite ${screenStatsKey}`);

        await redis.hincrby('screen_stats', screenStatsKey, impressions);
      }
    } catch (error) {
      console.error('Error processing event from queue:', error);
  
      await new Promise(resolve => setTimeout(resolve, 5000));
    }
  }
}

processEvents();
