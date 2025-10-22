'use client'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { CampaignStats } from "@/lib/types";
import { useState } from "react";
import { Spinner } from "../ui/spinner";
  
interface Props{
    campaigns: CampaignStats[];
    onRowClick: (campaignId: string) => void;
    selectedCampaignId: string | null;
    isLoading: boolean;
}
  
export function CampaignStatsTable({ campaigns, onRowClick, selectedCampaignId, isLoading} : Props) {
  
    return (
        <div>
            {isLoading ? (
                <div>
                    <p>Loading data....</p>
                    <Spinner/>
                </div>) : 
                (<Table>
                    <TableCaption>A list of your campaigns and number of plays.</TableCaption>
                    <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Campaign ID</TableHead>
                        <TableHead>Number of Plays</TableHead>
                    </TableRow>
                    </TableHeader>
                    <TableBody>
                    {campaigns.map((campaign) => (
                        <TableRow 
                            key={campaign.campaign_id}
                            onClick={() => onRowClick(campaign.campaign_id)}
                            className="cursor-pointer hover:bg-gray-400"    
                        >
                        <TableCell className="font-medium">{campaign.campaign_id}</TableCell>
                        <TableCell>{campaign.play_count}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>)}
        </div>
    )
    
}
  