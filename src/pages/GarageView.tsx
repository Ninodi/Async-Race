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
import FinishLine from '../components/FinishLine'
import WinnerBanner from '../components/WinnerBanner'

function GarageView() {
    const garagePage = sessionStorage.getItem('garagePage')
    const [currPage, setCurrPage] = useState<number>(Number(garagePage) || 1)
    const [selectedCar, setSelectedCar] = useState<number>(0)
    const [winner, setWinner] = useState<number>(0)
    const allCars = useAllCarsStore((state) => state.allCars)
    const itemPerPage: number = 7
    const startIndex = (currPage - 1) * itemPerPage
    const endIndex = startIndex + itemPerPage
    const displayedCars = allCars?.slice(startIndex, endIndex)
    const totalPages = Math.ceil(allCars?.length / itemPerPage)
    const [winnerBanner, setWinnerBanner] = useState<boolean>(false)

  const storePage = (pageType: string) => {
    sessionStorage.setItem(pageType, `${currPage}`)
  }

  return (
    <div className='app-container'>
          <Header/>
        <div className="controls">
          <RaceBtn setWinner={setWinner} winner={winner} setWinnerBanner={setWinnerBanner}/>
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
        <Pagination currPage={currPage} setCurrPage={setCurrPage} totalPages={totalPages} storePage={() => storePage('garagePage')}/>
        <WinnerBanner winner={winner} setWinner={setWinner} setWinnerBanner={setWinnerBanner} winnerBanner={winnerBanner}/>
    </div>
  )
}

export default GarageView
