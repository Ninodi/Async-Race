import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { useAllCarsStore } from '../store'
import useRequest from '../hooks/useRequest'
import useFetch from '../hooks/useFetch'
import { IWinnerInfo } from '../constants/interfaces'


function RaceBtn({setWinner, winner, setWinnerBanner} : {winner: number, setWinner: Dispatch<SetStateAction<number>>, setWinnerBanner: Dispatch<SetStateAction<boolean>>}) {
    const allCars = useAllCarsStore((state) => state.allCars)
    const { requestData } = useRequest({ method: 'PATCH', endpoint: `engine` })
    const setCarTime = useAllCarsStore((state) => state.setCarTime)
    const setCarPosition = useAllCarsStore((state) => state.setCarPosition)
    const [shortestTime, setShortestTime] = useState<number>(0)
    const setCarAnimation = useAllCarsStore((state) => state.setCarAnimation)
    const [totalDistance, setTotalDistance] = useState<number>(0)
    const {requestData: rerequest} = useRequest({ method: 'PUT', endpoint: `garage` })
    const {requestData: requestWinner} = useRequest({ method: 'POST', endpoint: `winners` })
    const {requestData: rerequestWinner} = useRequest({ method: 'PUT', endpoint: `winners` })
    const {fetchData} = useFetch({endpoint: `winners` })
    
    useEffect(() => {
        if (shortestTime !== 0) {
            allCars.forEach(async car => {
                const position: number = (shortestTime * (car?.velocity ?? 0)) / totalDistance * 100
                setCarPosition((car.id ?? 0), position)
                await rerequest({
                    ...car,
                    position: position
                }, `/${car.id}`)
            })

            setTimeout(async () => {
                setCarAnimation(false)
                const allWinners = await fetchData()
                const currWinner = allWinners.find((car: IWinnerInfo) => car.id === winner)

                //adding win counts       
                if(!currWinner) {
                    await requestWinner({
                        id: winner,
                        wins: 1,
                        time: shortestTime,
                    })
                }else{
                    await rerequestWinner({
                        ...currWinner,
                        wins: currWinner.wins + 1,
                        time: currWinner.time > shortestTime ? shortestTime : currWinner.time,
                    }, `/${currWinner.id}`)
                }

            }, shortestTime)
            
        }
    }, [shortestTime])
    
    const startRace = async () => {
        setCarAnimation(true)
        try {
            const requests = allCars.map(async (car) => {
                const response = await requestData(undefined, `?id=${car.id}&status=started`)
                const { velocity, distance } = await response?.json() || undefined
                const time = distance / velocity
                setTotalDistance(distance)
                setCarTime(car.id ?? 0, time, velocity)
                return { car, time }
            })
            const results = await Promise.all(requests)
    
            // get winner car info
            const winnerCarInfo = results.reduce((shortest, current) => {
                return current.time < shortest.time ? current : shortest
            })
            // set the winner
            setWinner(winnerCarInfo.car.id ?? 0)
            
            // setshortest time
            setShortestTime(winnerCarInfo.time)
            setTimeout(() => {
                setWinnerBanner(true)
            }, 1000)
            return winnerCarInfo.car
        } catch (err) {
            console.log(err)
        }
    };


    return (
        <button id='race-btn' onClick={startRace}>Race</button>
    )
}


export default RaceBtn