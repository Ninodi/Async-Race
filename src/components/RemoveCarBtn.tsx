import useRequest from '../hooks/useRequest'
import useFetch from '../hooks/useFetch'
import { useAllCarsStore } from '../store'

function RemoveCarBtn({carId} : {carId: number }) {
    const {requestData} = useRequest({method: 'DELETE', endpoint: `garage/${carId}`})
    const {fetchData} = useFetch({endpoint: 'garage'})
    const setAllCars = useAllCarsStore((state) => state.setAllCars)

    const deleteCar = async () => {
        try {
            await requestData(carId)
            const updatedCars = await fetchData()
            setAllCars(updatedCars)
        } catch (error) {
            console.error('Error deleting car or fetching updated list:', error)
        }
    }

  return (
    <button key={carId} onClick={deleteCar}>Remove {carId}</button>
  )
}

export default RemoveCarBtn