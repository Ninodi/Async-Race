import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import useFetch from '../hooks/useFetch'
import { ICar, IWinnerInfo } from '../constants/interfaces'
import { useAllCarsStore } from '../store'

function WinnersView() {
  const {fetchData} = useFetch({endpoint: 'winners'})
  const [winnerList, setWinnerList] = useState<ICar[] | []>([])
  const [allCars, setAllCars] = useState<ICar [] | []>([])
  const {fetchData: fetchCars} = useFetch({endpoint: 'garage'})

  useEffect(() => {
    const getCars = async () => {
      let resp = await fetchCars()
      setAllCars(resp)
    }
    getCars()
  }, [])

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
    <div>
      <Header />
      <h1>Winners View</h1>
      {winnerList.map(each => (
        <p>{each.name}</p>
      ))}
    </div>
  )
}

export default WinnersView