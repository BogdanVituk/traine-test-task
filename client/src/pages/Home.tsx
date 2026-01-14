import SuperHeroDialog from "@/components/SuperHeroDialog";
import SuperHeroList from "../components/SuperHeroList";
import SuperHeroPagination from "@/components/SuperHeroPagination";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { fetchSuperHeros, setPage } from "@/slices/superheroSlice";

const Home = () => {
    
    const { page, totalPages, superheros } = useAppSelector(state => state.superheros)
    
    const dispatch = useAppDispatch();

    useEffect(() => {

        dispatch(fetchSuperHeros(page))
        
    }, [page, dispatch])

    return (
        <div>
            <SuperHeroList 
            superheros={superheros}
            />

            <SuperHeroPagination
            page={page}
            totalPages={totalPages}
            onChange={p => dispatch(setPage(p))}
            />
            
            <SuperHeroDialog mode='create' />
        </div>
    )
}

export default Home;