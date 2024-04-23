import { useEffect, useState } from 'react'
import Pagination from '../components/Pagination'
import { useAllCarsStore } from '../store'
import GenerateCarsBtn from '../components/GenerateCarsBtn'
import AddCarBtn from '../components/AddCarBtn'
import Header from '../components/Header'
import EditCarBtn from '../components/EditCarBtn'
import CarLane from '../components/CarLane'
import RaceBtn from '../components/RaceBtn'
import ResetBtn from '../components/ResetBtn'
import '../assets/styles/GarageView.css'
function GarageView() {
    const [currPage, setCurrPage] = useState<number>(1)
    const [selectedCar, setSelectedCar] = useState<number>(0)
    const [winner, setWinner] = useState<number>(0)
    const allCars = useAllCarsStore((state) => state.allCars)
    const itemPerPage: number = 7
    const startIndex = (currPage - 1) * itemPerPage
    const endIndex = startIndex + itemPerPage
    const displayedCars = allCars?.slice(startIndex, endIndex)
    const totalPages = Math.ceil(allCars?.length / itemPerPage)

    useEffect(() => {
      console.log('GarageView rendered') // Log when GarageView re-renders
    })
  return (
    <div>
          <Header/>
        <div className="controls">
          <RaceBtn setWinner={setWinner}/>
          <ResetBtn />
          <GenerateCarsBtn />
          <AddCarBtn />
          <EditCarBtn selectedCar={selectedCar} setSelectedCar={setSelectedCar} />
        </div>
        <div className='race-field'>
          {displayedCars && displayedCars?.map(each => (
            <CarLane key={each.id} setSelectedCar={setSelectedCar} name={each.name} color={each.color} id={each.id}/>
          ))}
        </div>
        <Pagination currPage={currPage} setCurrPage={setCurrPage} totalPages={totalPages}/>
    </div>
  )
}

export default GarageView
