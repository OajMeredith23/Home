"use client"
import { useEffect, useMemo, useState } from "react";
import { IDevice } from "@/constants/devices";
import {socket} from "@/utils/socket"

export const useWledDevice = (address: string, initialState: IDevice['state'], device_name: string) => {


    const [loading, setLoading] = useState(true)
    const [online, setOnline]= useState<boolean | null>(null)
    const [deviceState, setDeviceState] = useState(initialState)

    const checkStatus = async (address: string) => {
        console.log("checking.WLED..", address)
        setLoading(true)
        try {
            const req = await fetch(`https://api.panthabunny.co.uk/wled-status`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                  },
                body: JSON.stringify({
                    address,
                    device_name
                })
            })
            const res = await req.json()
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
            setDeviceState(device_state[address])
        }
    });

    const toggleWledOn = async (toggle: 'on' | 'off') => {
        try {
            const req = await fetch(`https://api.panthabunny.co.uk/control-wled`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                  },
                body: JSON.stringify({
                    address, 
                    toggle: toggle === 'on' ? true : false,
                    device_name
                })
            })
            const res = await req.json()
            socket.emit('device_state', {[address]: res.device_response})
            return true
        } catch (error: any) {
            setLoading(false)
            return false
        }
    }
    return {
        checkStatus,
        loading, 
        online,

        deviceState,
        toggleWledOn,
    }
}