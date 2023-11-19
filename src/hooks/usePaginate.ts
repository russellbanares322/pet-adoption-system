import  { useState } from "react"

const ITEMS_PER_PAGE = 6;

type UsePaginateProps<T> = {
  pageData: T[]
}


const usePaginate = <T>({ pageData }: UsePaginateProps<T>) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalItemsCount = pageData.length;
  const pageSize = ITEMS_PER_PAGE;

  const onPageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber)
  }

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentItems = pageData.slice(startIndex, endIndex);

  return {pageSize, currentItems, onPageChange, totalItemsCount}
}

export default usePaginate