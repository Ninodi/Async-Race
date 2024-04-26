import React from 'react'
import useRequest from '../hooks/useRequest'
import { useAllCarsStore } from '../store'

function StartCarBtn({carId} : {carId: number}) {
    const {requestData} = useRequest({method: 'PATCH', endpoint: `engine?id=${carId}&status=started`})
    const setCarTime = useAllCarsStore((state) => state.setCarTime)
    const setCarPosition = useAllCarsStore((state) => state.setCarPosition)
    const setCarAnimation = useAllCarsStore((state) => state.setCarAnimation)

    const startEngine = async () => {
        try {
            const resp = await requestData()
            const finalResp = await resp?.json()
            const time = finalResp.distance / finalResp.velocity
            setCarTime(carId, time)
            setCarAnimation(true)
            setCarPosition(carId, 100)
        } catch (error) {
            console.error(error)
        }
    }
  return (
    <button id='start-btn' onClick={startEngine} >Start Car</button>
  )
}

export default StartCarBtn