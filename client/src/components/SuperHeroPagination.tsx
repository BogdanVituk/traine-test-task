import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
} from "@/components/ui/pagination"

interface PaginationProps {
  page: number
  totalPages: number
  onChange: (page: number) => void
}

const SuperHeroPagination = ({ page, totalPages, onChange }: PaginationProps) => {
  return (
    <Pagination className="mb-2">
      <PaginationContent>
        {[...Array(totalPages)].map((_, i) => {
          const p = i + 1
          return (
            <PaginationItem key={p}>
              <PaginationLink
                isActive={page === p}
                onClick={() => onChange(p)}
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