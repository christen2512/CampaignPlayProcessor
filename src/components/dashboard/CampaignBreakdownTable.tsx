'use client'
import { ScreenStat } from "@/lib/types";
import { Spinner } from "../ui/spinner";
import { Button } from "../ui/button";
import { Card, CardAction, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";

interface Props{
    campaignBreakdowns: ScreenStat[];
    isLoading: boolean;
    onClose: () => void;
}
export default function CampaignBreakdownTable({campaignBreakdowns, isLoading, onClose} : Props){

    return (
        <div className="flex p-6 justify-center w-82">
            {isLoading ? (<Spinner/>) : (
            <Card className="grid grid-flow-col grid-cols-2 gap-6 w-full max-w-sm">
                <CardContent>
                    <CardHeader className="flex flex-row gap-9">
                        <CardTitle className="row-start-1 col-start-1">
                            Screen IDs
                        </CardTitle>
                        <CardTitle className="row-start-1 col-start-2">
                            Impressions
                        </CardTitle>
                    </CardHeader>
                <div>
                    {campaignBreakdowns.map((campaign) => (
                        <div key={campaign.screen_id} className='flex flex-row gap-8 pl-6 my-4'>
                            <p className="pr-4">{campaign.screen_id}</p>
                            <p>{campaign.impressions}</p>
                        </div>
                    ))}
                </div>
                <CardFooter className="flex justify-center">
                    <CardAction>
                        <Button variant='outline' onClick={onClose}>Close</Button>
                    </CardAction>
                </CardFooter>
                </CardContent>
            </Card>
           
            )}

        </div>
    )
}