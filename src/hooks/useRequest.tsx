import { ICar } from '../constants/interfaces';

function useRequest({ method, endpoint }: { method: string, endpoint: string }) {
  const requestData = async (body?: ICar | number, custom?: string) => {
    try {
      let options: RequestInit = {
          method,
          headers: {
            'Content-Type': 'application/json'
          }
        }
  
        if (method !== 'DELETE' && body) {
          options.body = JSON.stringify(body)
        }
        
        const url = custom ? `http://127.0.0.1:3000/${endpoint}` + custom : `http://127.0.0.1:3000/${endpoint}`
        const response = await fetch(url, options)
        
        return response
      } catch (error) {
        console.error(error)
      }
    }
  
    return {requestData}
  }
  
export default useRequest
  