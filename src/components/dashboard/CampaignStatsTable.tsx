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
  
  interface Props {
    campaigns: CampaignStats[];
    onRowClick: (campaignId: string) => void;
  }
    
export function CampaignStatsTable({ campaigns, onRowClick} : Props) {
    return (
        <div> 
            <Table>
                <TableCaption>
                    {campaigns.length > 0
                        ? 'A list of your campaigns and number of plays. Click a campaign for impressions breakdown'
                        : 'No campaigns available, try adding some.'}
                </TableCaption>
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
            </Table>
        </div>
    )
}