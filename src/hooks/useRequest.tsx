import React from 'react'
import { ICar } from '../interfaces/interfaces';

function useRequest({ method, endpoint }: { method: string, endpoint: string }) {
    const requestData = async (data: ICar) => {
      try {
        let options: RequestInit = {
          method,
          headers: {
            'Content-Type': 'application/json'
          }
        }
  
        if (method !== 'DELETE' && data) {
          options.body = JSON.stringify(data)
        }
  
        const response = await fetch(`http://127.0.0.1:3000/${endpoint}`, options)
        
        return response
      } catch (error) {
        console.error(error)
      }
    }
  
    return {requestData}
  }
  
  export default useRequest
  