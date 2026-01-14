
import type { SuperHero } from "@/types";
import { useAppSelector } from "../hooks"
import SuperHeroItem from "./SuperHeroItem";


interface Props {
    superheros: SuperHero[]
}

const SuperHeroList = ({superheros}: Props) => {

    const { loading } = useAppSelector(state => state.superheros)


    if (loading) return <div>Loading...</div>

    return (
            <div className="flex justify-between mb-3 mt-4">
                {superheros.map(superhero => <SuperHeroItem superhero={superhero} />)}
            </div>
    )
}

export default SuperHeroList;