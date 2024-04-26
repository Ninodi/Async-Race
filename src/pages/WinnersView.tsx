import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import useFetch from '../hooks/useFetch'
import { ICar, IWinnerInfo } from '../constants/interfaces'
import '../assets/styles/WinnersView.css'
import Car from '../components/Car'
import Pagination from '../components/Pagination'

function WinnersView() {
  const {fetchData} = useFetch({endpoint: 'winners'})
  const [winnerList, setWinnerList] = useState<ICar[] | []>([])
  const [allCars, setAllCars] = useState<ICar [] | []>([])
  const {fetchData: fetchCars} = useFetch({endpoint: 'garage'})
  const winnersPage = sessionStorage.getItem('winnersPage')
  const [currPage, setCurrPage] = useState<number>(Number(winnersPage) || 1)
  const itemPerPage = 7
  const startIndex = (currPage - 1) * itemPerPage
  const endIndex = startIndex + itemPerPage
  const displayedCars = winnerList?.slice(startIndex, endIndex)
  const totalPages = Math.ceil(winnerList?.length / itemPerPage)


  useEffect(() => {
    const getCars = async () => {
      const resp = await fetchCars()
      setAllCars(resp)
    }
    getCars()
  }, [])

  const storePage = (pageType: string) => {
    sessionStorage.setItem(pageType, `${currPage}`)
  }

  useEffect(() => {
    const fetchWinners = async () => {
      const winnersData = await fetchData()

      const formattedWinners = winnersData.map((eachCar: IWinnerInfo) => {

        const car = allCars.find((car: ICar) => car.id === eachCar.id)
        const name = car ? car.name : 'Unknown'
        const color = car ? car.color : 'Unknown'

        return {
          id: eachCar.id,
          name: name,
          color: color,
          wins: eachCar.wins,
          bestTime: eachCar.time
        }

      })
      setWinnerList(formattedWinners)
    }
  
    fetchWinners()
  }, [allCars])
  

  return (
    <div className='app-container'>
      <Header />
      <div className="winners-content-container">
        <div className="winners-container">
          <div className="title-bar">
            <p>N</p>
            <p>Car</p>
            <p>Name</p>
            <p>Wins</p>
            <p>Best Time (seconds)</p>
          </div>
          <div className="winners-list">
            {displayedCars?.map(car => (
              <div key={car.id} className="winner-row">
                <p>{car.id}</p>
                <div className="car-obj">
                  <Car color={car.color} />
                </div>
                <p>{car.name}</p>
                <p>{car.wins}</p>
                <p>{((car.bestTime || 0) / 100).toFixed(2)}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="pag">
          <Pagination currPage={currPage} setCurrPage={setCurrPage} totalPages={totalPages} storePage={() => storePage('winnersPage')}/>
        </div>
      </div>
    </div>
  )
}

export default WinnersView