import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"

import { Button } from "@/components/ui/button";
import SuperheroForm from "./SuperHeroForm";
import type { Dispatch, SetStateAction } from "react";
import type { SuperHero } from "@/types";

interface SuperHeroDialogProps {
    mode: "create" | 'edit';
    openDialog: boolean
    setOpenDialog: Dispatch<SetStateAction<boolean>>
    hero?: SuperHero
}

const SuperHeroDialog = ({ mode, openDialog, setOpenDialog, hero }: SuperHeroDialogProps) => {

 
    return (
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogTrigger asChild>
                <Button variant={mode === "edit" ? "outline" : "default"}>
                    {mode =='create' ? "Create Hero" : 'Edit Hero'}
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-xl p-6">
                <SuperheroForm 
                mode={mode}
                onClose={() => setOpenDialog(false)}
                hero={hero}
                />
            </DialogContent>
        </Dialog>
    )
}

export default SuperHeroDialog;