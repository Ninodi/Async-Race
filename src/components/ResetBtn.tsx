import React from 'react'
import { useAllCarsStore } from '../store'
import useRequest from '../hooks/useRequest'

function ResetBtn() {
  const allCars = useAllCarsStore((state) => state.allCars)
  const setCarTime = useAllCarsStore((state) => state.setCarTime)
  const setCarPosition = useAllCarsStore((state) => state.setCarPosition)
  const setCarAnimation = useAllCarsStore((state) => state.setCarAnimation)
  const {requestData} = useRequest({ method: 'PATCH', endpoint: `engine` })
  const {requestData: rerequest} = useRequest({ method: 'PUT', endpoint: `garage` })

  const resetCars = async () => {
    try {
      allCars.forEach( async (car) => {
        setCarTime(car.id ?? 0, 0, 0)
        setCarPosition(car.id ?? 0, 0) 
        setCarAnimation(false) 
        await requestData(undefined, `?id=${car.id}&status=stopped`)
        await rerequest({
          ...car,
          time: 0,
          position: 0
        }, `/${car.id}`)
      })
    } catch (error) {
        console.error("Error resetting cars:", error)
    }
  }
  return (
    <button id='reset-btn' onClick={resetCars}>Reset</button>
  )
}

export default ResetBtn