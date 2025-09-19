import { useNavigate, useParams } from "react-router";
import { useAppDispatch, useAppSelector } from "../hooks";
import { useEffect } from "react";
import { deleteSuperHero, fetchSuperHero } from "../slices/superheroSlice";
import EditSuperHeroDialog from "@/componets/EditSuperHeroDialog";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button";

const SuperHero = () => {

    const dispatch = useAppDispatch();

    const { id } = useParams();   

    const navigate = useNavigate();

    const { selectedSuperhero, loading } = useAppSelector(state => state.superheros)

    useEffect(() => {
        dispatch(fetchSuperHero(id))
    }, [])


    const removeSuperHeroHandler = () => {
        dispatch(deleteSuperHero(id))
        navigate('/')
    }

    if(loading) return <div>Loading...</div>


    return (
        <div>
            <Card className="mb-4">
                <CardHeader>
                    <CardTitle>{selectedSuperhero?.nickname}</CardTitle>
                    <CardDescription>Real name: {selectedSuperhero?.real_name}</CardDescription>
                </CardHeader>
                <CardContent>
                    <p>Catch phrase: {selectedSuperhero?.catch_phrase}</p>
                    <p>Origin description: {selectedSuperhero?.origin_description}</p>
                </CardContent>
                <CardFooter className="flex-col items-center">
                    <p>Superpowers: {selectedSuperhero?.superpowers}</p>
                    <div className="mt-3 mb-4 flex gap-3">
                        {
                        selectedSuperhero?.Images && selectedSuperhero?.Images.map(item => (
                                    <img src={`http://localhost:3000${item.url}`} alt="prewiew"  width={250} height={100} style={{ objectFit: 'cover' }} />
                                ))
                        }
                    </div>
                    <Button onClick={removeSuperHeroHandler}>Delete superhero</Button>
                </CardFooter>
                </Card>
            <div>

                <EditSuperHeroDialog/>
            </div>
        </div>
    )
}

export default SuperHero;