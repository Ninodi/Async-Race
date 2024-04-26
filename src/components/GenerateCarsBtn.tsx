import React, { useEffect } from 'react'
import useFetch from '../hooks/useFetch'
import useRequest from '../hooks/useRequest'
import { useAllCarsStore } from '../store'
import { ICar } from '../constants/interfaces'

function GenerateCarsBtn() {
    const { data: cars, fetchData} = useFetch({ endpoint: 'garage' })
    const { requestData } = useRequest({ method: 'POST', endpoint: 'garage' })
    const setAllCars = useAllCarsStore((state) => state.setAllCars)

    const totalCars = 20

    useEffect(() => {
        setAllCars(cars)
    }, [cars, setAllCars])

    const generateMultipleCars = async (carNum: number) => {
        const allCars = useAllCarsStore.getState().allCars
        if (allCars && allCars.length >= carNum) return

        const carNames: string[] = cars?.map((car) => car.name) || []
        const newCars: ICar[] = Array.from({ length: carNum - (allCars ? allCars.length : 0) }, () => ({
            name: `${carNames[Math.floor(Math.random() * carNames.length)]} ${carNames[Math.floor(Math.random() * carNames.length)]}`,
            color: '#'+ Math.floor(Math.random()*16777215).toString(16),
        }));

        await Promise.all(newCars.map((carInfo) => requestData(carInfo)))
        fetchData()
    }

    return (
        <button id='more-cars-btn' onClick={() => generateMultipleCars(totalCars)}>Get More Cars</button>
    )
}

export default GenerateCarsBtn
