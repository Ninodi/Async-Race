import { useCallback, useEffect, useState } from 'react'
import { ICar } from '../constants/interfaces'

function useFetch({endpoint} : {endpoint: string} ) {
    const [data, setData] = useState<ICar[] | []>([])

    const fetchData = useCallback(async(custom?: string) => {
        const url = custom ? `http://127.0.0.1:3000/${endpoint}` + custom : `http://127.0.0.1:3000/${endpoint}`
        try{
            const res = await fetch(url)
            if (!res.ok) {
                throw new Error('Network response was not ok')
            }

            const result = await res.json()
            setData(result)
            console.log('logged')
            return result
        }catch(err){
            console.error(err)
        }

        return () => {
            setData([])
        }    
    }, [endpoint])

    useEffect(() => {
        fetchData()
    }, [fetchData])


    return {fetchData, data}
}

export default useFetch