import { useEffect, useMemo, useState } from "react";
import { TDeviceControl } from "@/constants/devices";
interface IControlDevice {
    toggle: 'on' | 'off',
    scale: string
  }


const checkStatus = async (address: string) => {
    try {
        const req = await fetch(`${address}/?status_request=true`)
        return true
    } catch (error: any) {
        console.warn(address, error.message)
        return false
    }
}
export const useDevice = (address: string) => {

    const [loading, setLoading] = useState(true)
    const [online, setOnline] = useState<boolean | null>(null)
    const [toggle, setToggle] = useState<IControlDevice['toggle']>('off');
    const [scale, setScale] = useState<IControlDevice['scale']>('1');
    const [error, setError] = useState<string>('');

    
    const checkStatus = async (address: string) => {
        console.log("checking...")
        setLoading(true)
        try {
            const req = await fetch(`${address}/?status_request=true`)
            setOnline(true)
            setLoading(false)
            return true
        } catch (error: any) {
            setOnline(false)
            setLoading(false)
            console.warn(address, error.message)
            return false
        }
    }

    useEffect(() => {
        checkStatus(address)
    }, [])

     console.log(`${address} is ${online ? 'online' : 'offline'}`);

     const controlDevice = async({
        toggle,
        scale
      }: IControlDevice) => {
        console.log("going...", toggle)
        try {
            
            if(toggle === 'off') scale = '0'
            const req = await fetch(`${address}/?toggle=${toggle}&scale=${scale}`, { signal: AbortSignal.timeout(5000) })
            const res = await req.json()
            setToggle(toggle)
            setScale(scale)
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
        scale,
        toggle,
        online,
        error
      }
  }