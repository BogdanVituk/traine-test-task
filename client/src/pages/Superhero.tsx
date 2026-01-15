import { useNavigate, useParams } from "react-router";
import { useState } from "react";


import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button";
import SuperHeroDialog from "@/components/SuperHeroDialog";
import type { image, SuperHero } from "@/types";
import { useDeleteSuperHeroMutation, useGetSuperHeroByIdQuery } from "@/store/superHeroApi";


const SuperHero = () => {


    const { id } = useParams();

    const navigate = useNavigate();


    const [openDialog, setOpenDialog] = useState(false);

    if (!id) return;

    const { data, error, isLoading } = useGetSuperHeroByIdQuery(id)
    const [ deleteSuperHero] = useDeleteSuperHeroMutation();

    const removeSuperHeroHandler = async () => {
        await deleteSuperHero(id);
        navigate('/')
    }

    if (isLoading) return <div>Loading...</div>

    if (error) return <div>Error...</div>

    return (
        <div>
            <Card className="mb-4">
                <CardHeader>
                    <CardTitle>{data?.nickname}</CardTitle>
                    <CardDescription>Real name: {data?.real_name}</CardDescription>
                </CardHeader>
                <CardContent>
                    <p>Catch phrase: {data?.catch_phrase}</p>
                    <p>Origin description: {data?.origin_description}</p>
                </CardContent>
                <CardFooter className="flex-col items-center">
                    <p>Superpowers: {data?.superpowers}</p>
                    <div className="mt-3 mb-4 flex gap-3">
                        {
                            data?.Images && data?.Images.map((item: image) => (
                                <img src={`${import.meta.env.VITE_API_URL}${item.url}`} alt="prewiew" width={250} height={100} style={{ objectFit: 'cover' }} />
                            ))
                        }
                    </div>
                    <Button onClick={removeSuperHeroHandler}>Delete superhero</Button>
                </CardFooter>
            </Card>

            <div>

                <SuperHeroDialog openDialog={openDialog} setOpenDialog={setOpenDialog} hero={data} mode="edit" />
            </div>
        </div>
    )
}

export default SuperHero;