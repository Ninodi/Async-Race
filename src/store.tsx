import {create} from 'zustand'
import { ICar } from './constants/interfaces'
import { devtools } from 'zustand/middleware';

interface AllCarsStore {
    allCars: ICar[],
    animationStatus: boolean,
    setAllCars: (cars: ICar[]) => void,
    setCarTime: (carId: number, time: number, velocity?: number) => void,
    setCarPosition: (carId: number, position: number) => void,
    setCarAnimation: (status: boolean) => void
}

export const useAllCarsStore = create<AllCarsStore>()(devtools((set) => ({
    allCars: [],
    animationStatus: false,
    setAllCars: (cars) => set({ allCars: cars }),
    setCarTime: (carId, time, velocity) => {
        set((state) => ({
            allCars: state.allCars.map((car) => {
                if (car.id === carId) {
                    return { ...car, time: time, velocity: velocity }
                }
                return car
            }),
        }))
    },
    setCarPosition: (carId, position) => {
        set((state) => ({
            allCars: state.allCars.map((car) => {
                if (car.id === carId) {
                    return { ...car, position: position }
                }
                return car
            }),
        }))
    },
    setCarAnimation: (status) => {
        set((state) => ({
            animationStatus: status
        }))
    },
})))


