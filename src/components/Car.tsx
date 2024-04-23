import React, { useEffect, useState } from 'react'
import RemoveCarBtn from './RemoveCarBtn'
import SelectCarBtn from './SelectCarBtn'
import StartCarBtn from './StartCarBtn'
import StopCarBtn from './StopCarBtn'
import { ICar } from '../constants/interfaces'
import { useAllCarsStore } from '../store'

interface CarProps extends ICar {
    setSelectedCar: React.Dispatch<React.SetStateAction<number>>
}


function Car({id, name, color, setSelectedCar} : CarProps) {
  const allCars = useAllCarsStore((state) => state.allCars)
  const car = allCars.find((car) => car.id === id)
  const [currCarPosition, setCurrCarPosition] = useState<number>(0)
  const animationStatus = useAllCarsStore((state) => state.animationStatus)

  useEffect(() => {
    setCurrCarPosition(car?.position || 0)
  }, [car])


  return (
      <div key={id}>
          <p>{name}, {id} {color}, {car?.time || 0}</p>
          <div className={`car-obj ${animationStatus ? 'moving' : ''}`} style={{backgroundColor: color, marginLeft: `${currCarPosition === 0 ? `${currCarPosition}%` :`calc(${currCarPosition}% - 50px)`}`}}></div>
      </div>
  )
}


export default Car