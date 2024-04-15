import {create} from 'zustand'
import { ICar } from './constants/interfaces'

interface AllCarsStore {
    allCars: ICar[],
    setAllCars: (cars: ICar[]) => void
}

export const useAllCarsStore = create<AllCarsStore>((set) => ({
    allCars: [],
    setAllCars: (cars) => set({ allCars: cars })
}))