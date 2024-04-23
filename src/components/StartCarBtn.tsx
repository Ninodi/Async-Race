import React from 'react'
import useRequest from '../hooks/useRequest'
import { useAllCarsStore } from '../store'

function StartCarBtn({carId} : {carId: number}) {
    const {requestData} = useRequest({method: 'PATCH', endpoint: `engine?id=${carId}&status=started`})
    const setCarTime = useAllCarsStore((state) => state.setCarTime)

    const startEngine = async () => {
        try {
            let resp = await requestData()
            let finalResp = await resp?.json()
            let time = (finalResp.distance / finalResp.velocity) / 1000
            setCarTime(carId, time)
        } catch (error) {
            console.error(error)
        }
    }
  return (
    <div>
        <button onClick={startEngine} >Start Car</button>
    </div>
  )
}

export default StartCarBtn