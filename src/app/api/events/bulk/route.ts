import redis from "@/lib/redis";
import { PlayEvent } from "@/lib/types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest){
    try{
        const events = (await request.json()) as PlayEvent[];

        if(!Array.isArray(events)){
            return NextResponse.json({error: "Request body must be an array of events"})
        }

        const invalidEvents = [];
        let processedCount = 0;
        for(const event of events){
            if(!event.screen_id || !event.campaign_id || !event.timestamp){
                invalidEvents.push(event);
                continue;
            }

            await redis.rpush('events_queue', JSON.stringify(event));
            processedCount++;
        }

        return NextResponse.json({message: "Processed bulk event", processed: processedCount, skipped: invalidEvents.length});
    } catch(error){
        console.error('Error processing bulk events: ', error)
        return NextResponse.json({error: 'Failed to process bulk events'}, {status: 500});
    }
}