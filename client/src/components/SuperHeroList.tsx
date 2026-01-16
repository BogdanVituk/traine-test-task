import { useAppSelector } from "../hooks"
import SuperHeroItem from "./SuperHeroItem";
import { useGetSuperHerosQuery } from "@/store/superHeroApi";



const SuperHeroList = () => {

    const { page } = useAppSelector(state => state.superheros)

    const { isError, data, isLoading } = useGetSuperHerosQuery(page);

    if (isLoading) return <div>Loading...</div>


    if (isError) return <div>Error...</div>

    return (
        <div className="flex justify-between mb-3 mt-4">
            {data?.data.map(superhero => <SuperHeroItem superhero={superhero} />)}
        </div>
    )
}

export default SuperHeroList;