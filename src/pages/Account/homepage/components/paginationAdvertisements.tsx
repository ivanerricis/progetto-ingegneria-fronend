import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import { useHomepageSearch } from "@/hooks/account/useHomepageSearch"
import useAdvertisements from "@/hooks/account/useAdvertisements"

export const PaginationAdvertisements = () => {
    const { page, setPage } = useHomepageSearch()
    const { totalPages } = useAdvertisements()

    if (totalPages <= 1) return null

    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious
                        onClick={() => page > 0 && setPage(page - 1)}
                        aria-disabled={page === 0}
                        className={page === 0 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                    />
                </PaginationItem>

                {Array.from({ length: totalPages }, (_, i) => (
                    <PaginationItem key={i}>
                        <PaginationLink
                            isActive={page === i}
                            onClick={() => setPage(i)}
                            className="cursor-pointer"
                        >
                            {i + 1}
                        </PaginationLink>
                    </PaginationItem>
                ))}

                <PaginationItem>
                    <PaginationNext
                        onClick={() => page < totalPages - 1 && setPage(page + 1)}
                        aria-disabled={page === totalPages - 1}
                        className={
                            page === totalPages - 1 ? "pointer-events-none opacity-50" : "cursor-pointer"
                        }
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    )
}
