import React, { useEffect, useState } from 'react'
import RemoveCarBtn from './RemoveCarBtn'
import SelectCarBtn from './SelectCarBtn'
import StartCarBtn from './StartCarBtn'
import StopCarBtn from './StopCarBtn'
import { ICar } from '../constants/interfaces'
import { useAllCarsStore } from '../store'
import Car from './Car'
import FinishLine from './FinishLine'

interface CarProps extends ICar {
    setSelectedCar: React.Dispatch<React.SetStateAction<number>>
}


function CarLane({id, name, color, setSelectedCar} : CarProps) {
  const allCars = useAllCarsStore((state) => state.allCars)
  const car = allCars.find((car) => car.id === id)
  const [currCarPosition, setCurrCarPosition] = useState<number>(0)
  const animationStatus = useAllCarsStore((state) => state.animationStatus)

  useEffect(() => {
    setCurrCarPosition(car?.position || 0)
  }, [car])


  return (
      <div className='car-lane' key={id}>
        <span>{name}</span>
          <div className="car-controls">
            <RemoveCarBtn carId={id!} />
            <SelectCarBtn setSelectedCar={setSelectedCar} carId={id!} />
            <StartCarBtn carId={id!} />
            <StopCarBtn carId={id!}/>
          </div>
          <div className={`car-obj ${animationStatus ? 'moving' : ''}`} style={{ marginLeft: `${currCarPosition === 0 ? `${currCarPosition}%` :`calc(${currCarPosition}% - 200px)`}`}}
          >
            <Car color={color} />
          </div>
          <FinishLine />
      </div>
  )
}


export default CarLane