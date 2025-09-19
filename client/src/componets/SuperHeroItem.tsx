import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import type { SuperHero } from "@/slices/superheroSlice";
import { Link } from "react-router-dom";


interface SuperHeroItemProps {
    superhero: SuperHero
}

const SuperHeroItem = ({superhero}: SuperHeroItemProps) => {


    return (
        <Link to={`/superhero/${superhero.id}`} >
            <Card className="w-[200px] h-[300px]">
                <CardHeader>
                    <CardTitle>{superhero.nickname}</CardTitle>
                </CardHeader>
                <CardContent>
                    <img src={`${import.meta.env.VITE_API_URL}${superhero.Images[0]?.url}`} alt="previe" className="max-w-[100%] max-h-[70%] object-cover" />
                </CardContent>
            </Card>
        </Link>
    )
}

export default SuperHeroItem;