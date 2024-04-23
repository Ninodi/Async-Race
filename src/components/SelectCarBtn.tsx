import React from 'react'

type SelectCarProps = {
    setSelectedCar: React.Dispatch<React.SetStateAction<number>>;
    carId: number
}

function SelectCarBtn({setSelectedCar, carId}: SelectCarProps) {
  return (
    <button onClick={() => setSelectedCar(carId)}>Select</button>
  )
}

export default SelectCarBtn