'use client'
import {Button} from "@/components/button"
import { useEffect, useState } from "react"
import { devices } from "@/constants/devices"


type DeviceResponses = {
    name: string
    online: true
    address: string
} | {
    name: string 
    online: false
    error: string
    address: string
}

export default function Home() {
    
    const [loading, setLoading] = useState(true)
    const [deviceStatuses, setDeviceStatuses] = useState<DeviceResponses[]>()
    const getDeviceStatuses = async (): Promise<DeviceResponses[]> => {
        const result: DeviceResponses[] = []

        // async function() {
            for await (const device of devices){
                try {
                    const req = await fetch(`${device.address}/?status_request`)
                    console.log("REQ", await req.text())
                    result.push({
                        name: device.name,
                        online: true,
                        address: device.address
                    })
                } catch (error) {
                    console.warn(device.name, error.message)
                    result.push({
                        name: device.name,
                        online: false,
                        error: error.message,
                        address: device.address
                    })
                    
                    
                }

                setLoading(false)
            }
            
        setDeviceStatuses(result)
        console.log("RESULT", result)
        return result
    }

  useEffect(() => {
    getDeviceStatuses()
    // (async () => {
    //     const deviceStatuses = await getDeviceStatuses()
    //     console.log({deviceStatuses})
    // })()
  }, [])
  
  console.log({deviceStatuses})
  return (
   <div>
    <h1 className="text-step-5 font-heading" >Device status</h1>
    <ul className="space-y-4">
        {loading && <h1 className="text-step-4">Loading...</h1>}
        {!loading && !!deviceStatuses?.length && deviceStatuses.map(device => {
            return (
                <li key={device.name} className="flex bg-slate-900 rounded-[4px] p-2xs items-center gap-4">
                    <div className={`rounded-full w-[20px] h-[20px] ${device.online ? 'bg-green-500' : 'bg-red-500'}`}/>
                    <div>
                        <span className="text-step--2">Device</span>
                        <p>{device.name}</p>
                    </div>     
                    <div>
                        <span className="text-step--2">Address</span>
                        <p>{device.address}</p>
                        
                    </div>
                </li>
            )
        })}
    </ul>
   </div>
  );
}
