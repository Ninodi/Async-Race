import React, { useState } from 'react'
import ColorPicker from './ColorPicker'
import useRequest from '../hooks/useRequest'
import useFetch from '../hooks/useFetch'
import { useAllCarsStore } from '../store'


function EditCarBtn({selectedCar, setSelectedCar}: {selectedCar: number, setSelectedCar: React.Dispatch<React.SetStateAction<number>>}) {
    const [carName, setCarName] = useState<string>('')
    const [color, setColor] = useState<string>('#8320E5')
    const {requestData} =  useRequest({method: 'PUT', endpoint: `garage/${selectedCar}`})
    const {fetchData} = useFetch({endpoint: 'garage'})
    const setAllCars = useAllCarsStore((state) => state.setAllCars)
    const allCars = useAllCarsStore((state) => state.allCars)


    const editCar = async () => {
        if(selectedCar === 0 ) return
        const currCar = allCars.find(car => car.id === selectedCar)
        
        await requestData({
            name: carName === '' ? (currCar?.name ?? '') : carName,
            color: color,
            position: currCar?.position
        })

        const updatedCars = await fetchData()
        
        setAllCars(updatedCars)
        setCarName('')
        setSelectedCar(0)
        console.log(selectedCar + ' was edited')
    }
  return (
    <div className='edit-car-box'>
        <input type="text" value={carName} onChange={(e) => {setCarName(e.target.value)}} />
        <ColorPicker setCarColor={setColor} />
        <button onClick={editCar}>Edit Car</button>
    </div>
  )
}

export default EditCarBtn