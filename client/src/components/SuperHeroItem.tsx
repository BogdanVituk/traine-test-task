import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import type { SuperHero } from "@/types";

import { Link } from "react-router-dom";


interface SuperHeroItemProps {
    superhero: SuperHero
}

const SuperHeroItem = ({superhero}: SuperHeroItemProps) => {


    return (
        <Link to={`/superhero/${superhero.id}`} >
            <Card className="w-[200px] h-[370px]">
                <CardHeader>
                    <CardTitle>{superhero.nickname}</CardTitle>
                </CardHeader>
                <CardContent className="flex justify-center items-center h-[270px]">
                    <img 
                    src={`${import.meta.env.VITE_API_URL}${superhero.Images[0]?.url}`} 
                    alt="previe" 
                    className="w-full h-full object-cover rounded" />
                </CardContent>
            </Card>
        </Link>
    )
}

export default SuperHeroItem;