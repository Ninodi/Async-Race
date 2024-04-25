import React from 'react'

type SelectCarProps = {
    setSelectedCar: React.Dispatch<React.SetStateAction<number>>;
    carId: number
}

function SelectCarBtn({setSelectedCar, carId}: SelectCarProps) {
  return (
    <button id='select-btn' onClick={() => setSelectedCar(carId)}>Select</button>
  )
}

export default SelectCarBtn