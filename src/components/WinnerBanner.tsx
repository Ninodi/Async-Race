import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { useAllCarsStore } from '../store'
import useFetch from '../hooks/useFetch'

function WinnerBanner({setWinner, winner, setWinnerBanner, winnerBanner} : {winner: number, setWinner: Dispatch<SetStateAction<number>>, winnerBanner: boolean, setWinnerBanner: Dispatch<SetStateAction<boolean>>}) {
    const allCars = useAllCarsStore((state) => state.allCars)
    const winnerCar = allCars.find(car => car.id === winner)
  return (
    <div id='winner-banner-container' className={winnerBanner ? '' : 'hidden'}>
      <div className="winner-banner">
        <h1>Winner</h1>
          <div>
              <h2>{winnerCar?.name}</h2>
              <h2>Time: {((winnerCar?.time || 0) / 100).toFixed(2)}s</h2>
          </div>
          <button id='close-btn' onClick={() => setWinnerBanner(false)}>X</button>
      </div>
    </div>
  )
}

export default WinnerBanner