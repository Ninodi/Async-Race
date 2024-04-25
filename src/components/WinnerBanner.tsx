import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { useAllCarsStore } from '../store'
import useFetch from '../hooks/useFetch'

function WinnerBanner({setWinner, winner, setWinnerBanner, winnerBanner} : {winner: number, setWinner: Dispatch<SetStateAction<number>>, winnerBanner: boolean, setWinnerBanner: Dispatch<SetStateAction<boolean>>}) {
    const allCars = useAllCarsStore((state) => state.allCars)
    const winnerCar = allCars.find(car => car.id === winner)
    // const {fetchData} = useFetch({endpoint: `winners/${winner}`})
    // const [winInfo, setWinInfo] = useState<{
    //     bestTime: number;
    //     wins: number;
    // }>({
    //     bestTime: 0,
    //     wins: 0
    // })

    // useEffect(() => {
    //     const getWinInfo = async() => {
    //         let resp = await fetchData()
    //         setWinInfo({
    //             bestTime: resp.time,
    //             wins: resp.wins
    //         })
    //     }
        
    //     getWinInfo()
    // }, [winner])
  return (
    <div id='winner-banner' className={winnerBanner ? '' : 'hidden'}>
        <h1>Winner</h1>
        <div>
            <h2>{winnerCar?.name}</h2>
            <h2>Time: {((winnerCar?.time || 0) / 100).toFixed(2)}s</h2>
        </div>
        <button id='close-btn' onClick={() => setWinnerBanner(false)}>X</button>
    </div>
  )
}

export default WinnerBanner