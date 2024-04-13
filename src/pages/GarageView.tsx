import React, { useEffect, useState } from 'react'
import Pagination from '../components/Pagination'
import { useAllCarsStore } from '../store'
import GenerateCarsBtn from '../components/GenerateCarsBtn'

function GarageView() {
    const [currPage, setCurrPage] = useState<number>(1)

    const allCars = useAllCarsStore((state) => state.allCars)
    const itemPerPage: number = 7
    const startIndex = (currPage - 1) * itemPerPage
    const endIndex = startIndex + itemPerPage

    const displayedCars = allCars?.slice(startIndex, endIndex)
    const totalPages = Math.ceil(allCars?.length / itemPerPage)

  return (
    <div>
        <GenerateCarsBtn />
        {displayedCars && displayedCars?.map(each => (
          <p key={each.id}>{each.name}, {each.id}</p>
        ))}
        <Pagination currPage={currPage} setCurrPage={setCurrPage} totalPages={totalPages}/>
    </div>
  )
}

export default GarageView
