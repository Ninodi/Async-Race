import React, { useEffect, useState } from 'react'
import { useAllCarsStore } from '../store'
import useRequest from '../hooks/useRequest'

const screenWidth = window.innerWidth

function RaceBtn() {
    const allCars = useAllCarsStore((state) => state.allCars)
    const { requestData } = useRequest({ method: 'PATCH', endpoint: `engine` })
    const setCarTime = useAllCarsStore((state) => state.setCarTime)
    const setCarPosition = useAllCarsStore((state) => state.setCarPosition)
    const [shortestTime, setShortestTime] = useState<number>(0)
    const [winner, setWinner] = useState<number>(0)
    const setCarAnimation = useAllCarsStore((state) => state.setCarAnimation)

    useEffect(() => {
        if(shortestTime !== 0){
            allCars.forEach(car => {
                setCarPosition(car.id!, ((shortestTime * car.velocity!) / 500000) * 100)
            })

            
            setTimeout(() => {
                setCarAnimation(false)
            }, shortestTime)
        }
    }, [shortestTime])

    const startRace = async () => {
        setCarAnimation(true)
        try {
            const requests = allCars.map(async (car) => {
                const response = await requestData(undefined, `?id=${car.id}&status=started`)
                const { velocity, distance } = await response?.json()
                const time = distance / velocity
                setCarTime(car.id!, time, velocity)
                return { car, time }
            })
            const results = await Promise.all(requests)
    
            // get winner car info
            const winnerCarInfo = results.reduce((shortest, current) => {
                return current.time < shortest.time ? current : shortest
            });

    
            // set the winner
            setWinner(winnerCarInfo.car.id!)
    
            // setshortest time
            setShortestTime(winnerCarInfo.time)
            return winnerCarInfo.car
        } catch (err) {
            console.log(err);
        }
    };


    return (
        <button onClick={startRace}>Race</button>
    )
}


export default RaceBtn



    // const fastestCar = async () => {
    //     try {
    //         const carSpeeds = allCars.map(async (car) => {
    //             const speedInfoResp = await requestData(undefined, `?id=${car.id}&status=started`)
    //             const speedInfo = await speedInfoResp?.json()
    //             let carTime = (screenWidth/speedInfo.velocity)/10
    //             setCarTime(car.id!, carTime, speedInfo.velocity)
    //             console.log(`Car ${car.id}:`, car)
    //             return carTime
    //         })
    //         const resolvedCarSpeeds = await Promise.all(carSpeeds)
    //         let fastestTime = resolvedCarSpeeds.sort().reverse()[resolvedCarSpeeds.length - 1]
    //         return fastestTime
    //     } catch (error) {
    //         console.error(error)
    //     }
    // }

    // const driveCars = async (time: number) => {
    //     try {
    //         const carPositions = allCars.map((car) => {
    //             let speed = 2
    //             // console.log(car)
    //             // console.log(`Speed for car ${car.id}: ${car.time}`)
    //             const newPosition = speed * time
    //             setCarPosition(car.id!, newPosition)
    //         })
    //         await Promise.all(carPositions)
    //     } catch (error) {
    //         console.error(error)
    //     }
    // }
    
    // const raceCars = async () => {
    //     try {
    //         let fastest = await fastestCar()
    //         await driveCars(fastest!)
    //     } catch (error) {
    //         console.error(error)
    //     }
    // }



    // const moveCars = async () => {
    //     let fastest = 0
    //     try{    
    //         const carPromises = allCars.map(async (car) => {
    //             const response = await requestData(undefined, `?id=${car.id}&status=started`)
    //             const { velocity, distance } = await response?.json()
    //             const time = (distance / velocity) * 1000 // Calculate time in milliseconds
    //             setCarTime(car.id!, time, velocity)
    //             setCarPosition(car.id!, velocity * distance)
    //             return { id: car.id, time }
    //           });

    //           const carsInfo = await Promise.all(carPromises);
    //           const shortestTime = Math.min(...carsInfo.map((car) => car.time))
    //           console.log(shortestTime)

    //     }catch(err){
    //         console.error(err)
    //     }
    // }
