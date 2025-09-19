import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"
import CreateSuperheroForm from "./CreateSuperheroForm";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const CreateSuperHeroDialog = () => {

    const [openDialog, setOpenDialog] = useState(false);
 
    return (
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogTrigger><Button>CreateHero</Button></DialogTrigger>
            <DialogContent>
                <CreateSuperheroForm onClose={setOpenDialog}/>
            </DialogContent>
        </Dialog>
    )
}

export default CreateSuperHeroDialog;