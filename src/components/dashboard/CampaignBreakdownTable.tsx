'use client'
import { ScreenStat } from "@/lib/types";
import { Spinner } from "../ui/spinner";
import { Table } from "lucide-react";
import { TableCaption, TableHeader, TableRow, TableHead, TableBody, TableCell } from "../ui/table";
import { Dialog, DialogClose, DialogContent, DialogTitle } from "@radix-ui/react-dialog";
import { DialogFooter, DialogHeader } from "../ui/dialog";
import { Button } from "../ui/button";
import { useState } from "react";

interface Props{
    campaignBreakdowns: ScreenStat[];
    isLoading: boolean;
}
export default function CampaignBreakdownTable({campaignBreakdowns, isLoading} : Props){
    const [isOpen, setIsOpen] = useState<boolean>(true);
    return (
        <div>
            {isLoading ? (<Spinner/>) : (
       
            <Dialog open={isOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Screen IDs
                    </DialogTitle>
                    <DialogTitle>
                        Impressions per Hour
                    </DialogTitle>
                </DialogHeader>
              <div>
              {campaignBreakdowns.map((campaign) => (
                <div className='flex flex-row justify-center'>
                    <p className="pr-4">{campaign.screen_id}</p>
                    <p>{campaign.impressions}</p>
                </div>
                ))}
              </div>
              <DialogFooter>
                <DialogClose asChild>
                    <Button variant='outline' onClick={() => setIsOpen(!isOpen)}>Close</Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
            )}

        </div>
    )
}