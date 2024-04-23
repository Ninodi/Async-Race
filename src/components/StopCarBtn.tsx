import React from 'react'
import useRequest from '../hooks/useRequest'
import { useAllCarsStore } from '../store'


function StopCarBtn({carId} : {carId: number}) {
    const {requestData} = useRequest({method: 'PATCH', endpoint: `engine?id=${carId}&status=stopped `})
    const setCarTime = useAllCarsStore((state) => state.setCarTime)
    const setCarPosition = useAllCarsStore((state) => state.setCarPosition)
    const setCarAnimation = useAllCarsStore((state) => state.setCarAnimation)
    const startEngine = async () => {
        try {
            setCarTime(carId, 0)
            setCarAnimation(false)
            setCarPosition(carId, 0)
            await requestData()
        } catch (error) {
            console.error(error)
        }

    }
  return (
    <button onClick={startEngine}>Stop Car</button>
  )
}

export default StopCarBtn