import React, { useState } from 'react'
import Pagination from '../components/Pagination'
import { useAllCarsStore } from '../store'
import GenerateCarsBtn from '../components/GenerateCarsBtn'
import RemoveCarBtn from '../components/RemoveCarBtn'
import AddCarBtn from '../components/AddCarBtn'
import Header from '../components/Header'

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
        <Header/>
        <GenerateCarsBtn />
        <AddCarBtn />
        <div className='race-field'>
          {displayedCars && displayedCars?.map(each => (
            <div key={each.id}>
              <p key={each.id}>{each.name}, {each.id} {each.color}</p>
              <RemoveCarBtn carId={each.id!} />
            </div>
          ))}
        </div>
        <Pagination currPage={currPage} setCurrPage={setCurrPage} totalPages={totalPages}/>
    </div>
  )
}

export default GarageView
