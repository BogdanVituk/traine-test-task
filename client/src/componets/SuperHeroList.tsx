import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks"
import {  fetchSuperHeros, setPage } from "../slices/superheroSlice";
import SuperHeroItem from "./SuperHeroItem";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

const SuperHeroList = () => {

    const dispatch = useAppDispatch();

    const { totalPages, page, loading  } = useAppSelector(state => state.superheros)


    const { superheros } = useAppSelector(state => state.superheros)

    useEffect(() => {
        dispatch(fetchSuperHeros(page))
    }, [page, dispatch])

    if(loading) return <div>Loadin...</div>

    return (
        <>  
        <div className="flex justify-between mb-3 mt-4">
            {
                superheros.map(superhero => {
                    return <SuperHeroItem superhero={superhero}/>

                })
            }
         </div>

   
        <Pagination className="mb-3">
            <PaginationContent>
                    {
                    [...Array(totalPages)].map((_, i) => {

                        const pageNum = i + 1;
                        return (
                            <div>
                                <PaginationItem>
                                    <PaginationLink 
                                    key={pageNum}
                                    onClick={() => dispatch(setPage(pageNum))}
                                    isActive={page === pageNum}
                                    href="#">{pageNum}</PaginationLink>
                                </PaginationItem>
                            </div>

                        )
                    })
                }
            </PaginationContent>
        </Pagination>
        </>
    )
}

export default SuperHeroList;