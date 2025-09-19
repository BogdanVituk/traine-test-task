import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button";
import { useState } from "react";
import EditSuperheroForm from "./EditSuperheroForm";

const EditSuperHeroDialog = () => {

    const [open, setOpen] = useState(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger><Button>Edit Hero</Button></DialogTrigger>
            <DialogContent>
                <EditSuperheroForm onClose={setOpen}/>
            </DialogContent>
        </Dialog>
    )
}

export default EditSuperHeroDialog;