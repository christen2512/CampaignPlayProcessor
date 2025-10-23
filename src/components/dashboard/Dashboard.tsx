'use client'

import { API_BASE_URL, CampaignStats, MOCK_PLAY_EVENTS, PlayEvent, ScreenStat } from "@/lib/types"
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { CampaignStatsTable } from "./CampaignStatsTable";
import CampaignBreakdownTable from "./CampaignBreakdownTable";
import { LoadingIndicator } from "../ui/LoadingIndicator";


const generateRandomEvent = (): PlayEvent => {
    const getRandomElement = (arr: PlayEvent[]): PlayEvent => {
        return arr[Math.floor(Math.random() * arr.length)];
    }

    const randomScreenEvent = getRandomElement(MOCK_PLAY_EVENTS);
    const randomCampaignEvent = getRandomElement(MOCK_PLAY_EVENTS);

    const newEvent: PlayEvent = {
        campaign_id: randomCampaignEvent.campaign_id,
        screen_id: randomScreenEvent.screen_id,
        timestamp: new Date().toISOString(),
    };

    return newEvent;
}

export function Dashboard(){

    const [selectedCampaignId, setSelectedCampaignId] = useState<string | null>(null);
    const [campaignBreakdown, setCampaignBreakdown] = useState<ScreenStat[]>([]);
    const [isBreakdownLoading, setIsBreakdownLoading] = useState(false);
    const [campaigns, setCampaigns] = useState<CampaignStats[]>([])
    const [isCampaignStatsLoading, setIsCampaignStatsLoading] = useState<boolean>(true);

    useEffect(() => {
        const getCampaignData = async () => {
            try{
                const response = await fetch(`${API_BASE_URL}/campaigns`)
                if(!response.ok){
                    throw new Error(`Response statsu: ${response.status}`);
                }
                const result = (await response.json()) as CampaignStats[];

                for(const campaign of result){
                    console.log(`Campaign_id ${campaign.campaign_id}, Play_Count ${campaign.play_count}`);
                }
 
                setCampaigns(result)
                setIsCampaignStatsLoading(false);
            } catch(error){
                console.error(`Couldn't fetch data for campaigns with error ${error}`);
            }
           
        }
        const timer = setInterval(getCampaignData, 1500)

        return () => {
            clearTimeout(timer);
        }
    }, [])


    const simulateEvent = async () => {
        const event = generateRandomEvent();
        try{
            await fetch(`${API_BASE_URL}/events`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify(event)
            });
        } catch(error){
            console.error('Failed to send event to server: ', error)
        }
       
    }

    const handleCampaignSelect = async (campaignId: string) => {
        if(selectedCampaignId === campaignId){
            setSelectedCampaignId(null);
            return;
        }
        setSelectedCampaignId(campaignId);
        setIsBreakdownLoading(true);
        try{
            const response = await fetch(`${API_BASE_URL}/campaigns/${campaignId}`);
            const data = await response.json();
            setCampaignBreakdown(data);
        }catch (error){
            console.error("Failed to fetch screen breakdown", error);
        }finally{
            setIsBreakdownLoading(false);
        }

    }

    const handleCloseBreakdown = () => {
        setSelectedCampaignId(null);
    }

    const simulateBulkEvents = async () => {
      try{
        await fetch(`${API_BASE_URL}/events/bulk`, {
            method:'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(MOCK_PLAY_EVENTS)
        });
      }catch(error){
        console.error('Failed to send bulk events to server ', error);
      }
    }
    return (
    <div className="flex flex-row justify-center w-full">
        <div className="flex flex-col ">
            <Button variant='outline' onClick={simulateEvent} className="m-6">Simulate Event</Button>
            <Button variant='secondary' onClick={simulateBulkEvents} className='m-4'>Load Bulk Events</Button>
        </div>
        {isCampaignStatsLoading ? (
            <LoadingIndicator title="Loading campaigns...." />
        ) : (
        <CampaignStatsTable
            campaigns={campaigns} 
            onRowClick={handleCampaignSelect}
       />)}
        
        {isBreakdownLoading && <LoadingIndicator title="Loading breakdown...." />}
        
        {selectedCampaignId && !isBreakdownLoading && (
            <CampaignBreakdownTable 
                campaignBreakdowns={campaignBreakdown} 
                isLoading={isBreakdownLoading}
                onClose={handleCloseBreakdown}
            />
        )}
    </div>
    )
}