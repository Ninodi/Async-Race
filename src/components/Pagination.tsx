import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom';

type SetCurrPageType = React.Dispatch<React.SetStateAction<number>>

interface PaginationProps {
 currPage: number;
 setCurrPage: SetCurrPageType;
 totalPages: number;
 storePage: () => void
}

function Pagination({ currPage, setCurrPage, totalPages, storePage }: PaginationProps) {
  const location = useLocation();
  useEffect(() => {
    storePage()
  }, [currPage, storePage, location])

 return (
    <div className='pagination-container'>
      <button onClick={() => setCurrPage((prevPage: number) => Math.max(prevPage - 1, 1))}>Prev</button>
      <div>{currPage} / {totalPages}</div>
      <button onClick={() => setCurrPage((prevPage: number) => Math.min(prevPage + 1, totalPages))}>Next</button>
    </div>
 )
}

export default Pagination
