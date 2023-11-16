import { useState } from "react"

const ITEMS_PER_PAGE = 6;

const usePaginate = (pageData: Record<string, any>) => {
    const [itemOffset, setItemOffset] = useState(0);
    const pageDataTotalCount = pageData.length
    const endOffset = itemOffset * ITEMS_PER_PAGE
    const paginatedItems = pageData.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(pageDataTotalCount / ITEMS_PER_PAGE);

    const handlePageClick = (event:any) => {
        const newOffset = (event.selected * ITEMS_PER_PAGE) % pageDataTotalCount
        setItemOffset(newOffset)
    }

  return {paginatedItems, handlePageClick, pageCount}
}

export default usePaginate