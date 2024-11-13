import { useEffect, useMemo, useState } from "react";
import { TDeviceControl } from "@/constants/devices";
import {socket} from "@/utils/socket"
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
    const [toggle, setToggle] = useState<IControlDevice['toggle']>('on');
    const [scale, setScale] = useState<IControlDevice['scale']>('1');
    const [error, setError] = useState<string>('');

   

    const checkStatus = async (address: string) => {
        console.log("checking...")
        setLoading(true)
        try {
            // const req = await fetch(`${address}/?status_request=true`)
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
            console.log("res", address, res.success, res.device_response)
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

    //  console.log(`${address} is ${online ? 'online' : 'offline'}`);

     socket.on('device_state', (device_state) => {
        // console.log("device_state", device_state)
        if(device_state.hasOwnProperty('toggle')){
            setToggle(device_state.toggle)
        }
        if(device_state.hasOwnProperty('scale')){
            setScale(device_state.scale)
        }
        // setMessages((prevMessages) => [...prevMessages, message]);
      });

     const controlDevice = async({
        toggle,
        scale
      }: IControlDevice) => {
        try {
            
            if(toggle === 'off') scale = '0'
            const req= await fetch('https://api.panthabunny.co.uk/control-pico',{
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                  },
                body: JSON.stringify({
                    address, toggle, scale
                })
            })
            // const req = await fetch(`${address}/?toggle=${toggle}&scale=${scale}`, { signal: AbortSignal.timeout(5000) })
            const res = await req.json()
            console.log("control res", res.device_response)
            socket.emit('device_state', res.device_response)
            // setToggle(toggle)
            // setScale(scale)
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