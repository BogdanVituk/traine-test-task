import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"

import { Button } from "@/components/ui/button";
import { useState } from "react";
import SuperheroForm from "./SuperHeroForm";

interface SuperHeroDialogProps {
    mode: "create" | 'edit';

}

const SuperHeroDialog = ({mode}: SuperHeroDialogProps) => {

    const [openDialog, setOpenDialog] = useState(false);

 
    return (
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogTrigger asChild>
                <Button variant={mode === "edit" ? "outline" : "default"}>
                    {mode =='create' ? "Create Hero" : 'Edit Hero'}
                </Button>
            </DialogTrigger>
            <DialogContent>
                <SuperheroForm 
                onClose={setOpenDialog}
                />
            </DialogContent>
        </Dialog>
    )
}

export default SuperHeroDialog;