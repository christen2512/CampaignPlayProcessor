'use client'

import { API_BASE_URL, CampaignStats, MOCK_PLAY_EVENTS, PlayEvent, ScreenStat } from "@/lib/types"
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { CampaignStatsTable } from "./CampaignStatsTable";
import CampaignBreakdownTable from "./CampaignBreakdownTable";


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
    const [isLoading, setIsLoading] = useState<boolean>(true);

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
                setIsLoading(false);
            } catch(error: any){
                console.error(`Couldn't fetch data for campaigns with error ${error.message}`);
            }
           
        }
        const timer = setInterval(() => {
            getCampaignData();
        }, 1500)

        return () => {
            clearTimeout(timer);
        }
    }, [campaigns])


    const simulateEvent = async () => {
        const event = generateRandomEvent();
        try{
            await fetch(`${API_BASE_URL}/events`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify(event)
            });
        } catch(error: any){
            console.error('Failed to send event to server: ', error.message)
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
    return (
    <div className="flex flex-row items-center m-10">
        <Button variant='outline' onClick={simulateEvent} className="m-6">Simulate Event</Button>
        <CampaignStatsTable
             campaigns={campaigns} 
             onRowClick={handleCampaignSelect}
             selectedCampaignId={selectedCampaignId} 
             isLoading={isLoading}
        />
        {selectedCampaignId && !isBreakdownLoading && (
            <CampaignBreakdownTable 
                campaignBreakdowns={campaignBreakdown} 
                isLoading={isBreakdownLoading}
            />
        )}
    </div>
    )
}