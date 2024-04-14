import React, { useState } from 'react'
import useRequest from '../hooks/useRequest'
import useFetch from '../hooks/useFetch'
import { useAllCarsStore } from '../store'
import ColorPicker from './ColorPicker'

function AddCarBtn() {
    const {requestData} =  useRequest({method: 'POST', endpoint: 'garage'})
    const [carName, setCarName] = useState<string>('')
    const [color, setColor] = useState<string>('')
    const {fetchData} = useFetch({endpoint: 'garage'})
    const setAllCars = useAllCarsStore((state) => state.setAllCars)

    const addCar = async () => {
        if(carName === '') return
        await requestData({
            name: carName,
            color: color
        })
        const updatedCars = await fetchData()
        
        setAllCars(updatedCars)
        setCarName('')
    }
  return (
    <div className='add-car-box'>
        <input type="text" value={carName} onChange={(e) => {setCarName(e.target.value)}} />
        <ColorPicker setCarColor={setColor}/>
        <button onClick={addCar}>Add Car</button>
    </div>
  )
}

export default AddCarBtn