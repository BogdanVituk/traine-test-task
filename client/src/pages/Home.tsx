import SuperHeroDialog from "@/components/SuperHeroDialog";
import SuperHeroList from "../components/SuperHeroList";
import SuperHeroPagination from "@/components/SuperHeroPagination";
import { useState } from "react";


const Home = () => {
    

    const [openDialog, setOpenDialog] = useState(false);

    return (
        <div>
            <SuperHeroList/>

            <SuperHeroPagination/>
            
            <SuperHeroDialog openDialog={openDialog} setOpenDialog={setOpenDialog} mode='create' />
        </div>
    )
}

export default Home;