import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination"
import { useAppDispatch, useAppSelector } from "@/hooks"
import { useGetSuperHerosQuery } from "@/store/superHeroApi"
import { setPage } from "@/store/superheroSlice"



const SuperHeroPagination = () => {

  const dispatch = useAppDispatch();

  const { page } = useAppSelector(state => state.superheros)

  const { data } = useGetSuperHerosQuery(page);

  const totalPages = data?.meta.lastPage || 1;

  return (
    <Pagination className="mb-2">
      <PaginationContent>
        {[...Array(totalPages)].map((_, i) => {
          const p = i + 1
          return (
            <PaginationItem key={p}>
              <PaginationLink
                isActive={page === p}
                onClick={() => dispatch(setPage(p))}
              >
                {p}
              </PaginationLink>
            </PaginationItem>
          )
        })}
      </PaginationContent>
    </Pagination>
  )
}


export default SuperHeroPagination;