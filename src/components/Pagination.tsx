import React from 'react'

type SetCurrPageType = React.Dispatch<React.SetStateAction<number>>

interface PaginationProps {
 currPage: number;
 setCurrPage: SetCurrPageType;
 totalPages: number
}

function Pagination({ currPage, setCurrPage, totalPages }: PaginationProps) {
 return (
    <div className='pagination-container'>
      <button onClick={() => setCurrPage((prevPage: number) => Math.max(prevPage - 1, 1))}>Prev</button>
      <div>{currPage} / {totalPages}</div>
      <button onClick={() => setCurrPage((prevPage: number) => Math.min(prevPage + 1, totalPages))}>Next</button>
    </div>
 )
}

export default Pagination
