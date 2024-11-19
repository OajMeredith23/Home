"use client"
import { useEffect, useMemo, useState } from "react";
import { IDevice } from "@/constants/devices";
import {socket} from "@/utils/socket"

const checkStatus = async (address: string) => {
    try {
        const req = await fetch(`${address}/?status_request=true`)
        return true
    } catch (error: any) {
        console.warn(address, error.message)
        return false
    }
}
export const useDevice = (address: string, initialState: IDevice['state']) => {

    const [deviceState, setDeviceState] = useState(initialState)
    const [loading, setLoading] = useState(true)
    const [online, setOnline] = useState<boolean | null>(null)
    const [error, setError] = useState<string>('');

   

    const checkStatus = async (address: string) => {
        console.log("checking...")
        setLoading(true)
        try {
            const req = await fetch(`https://api.panthabunny.co.uk/status-request`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                  },
                body: JSON.stringify({
                    address
                })
            })
            const res = await req.json()
            console.log("res", res, address, res.success, res.device_response)
            setOnline(res.success)
            setLoading(false)
            return true
        } catch (error: any) {
            console.log("Status error", error)
            setOnline(false)
            setLoading(false)
            console.warn(address, error.message)
            return false
        }
    }

    useEffect(() => {
        checkStatus(address)
    }, [])


     socket.on('device_state', (device_state) => {
        console.log("received scoket", device_state)
        if(Object.keys(device_state)[0] === address){
            console.log("Received socket for:", address)
            setDeviceState(device_state[address])
        }
      });

     const controlDevice = async({
        toggle = deviceState.toggle || "on",
        scale = deviceState.scale || '0'
      }: IDevice['state']) => {

        try {
            
            const req= await fetch('https://api.panthabunny.co.uk/control-pico',{
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                  },
                body: JSON.stringify({
                    address, toggle, scale
                })
            })
            const res = await req.json()
            console.log("control res", {[address]: res.device_response})
            socket.emit('device_state', {[address]: res.device_response})
           
            return res
        } catch (error: any) {
            console.warn("device error error", error)
            setError(error.message)
            return error.message
        }
      }

      return {
        controlDevice,
        checkStatus,
        loading,
        online,
        error,
        state: deviceState
      }
  }