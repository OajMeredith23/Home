"use client"
import {useState} from 'react'
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import {  IDevice } from "@/constants/devices"
import { useWledDevice } from "@/utils/useWledDevice"
import { RefreshCw, CirclePowerIcon } from "lucide-react"

export const WledDeviceControlPanel = ({ address, state: initialState, device_name,...props}: IDevice & {device_name: string}) => {

    const {loading, online, checkStatus, deviceState, toggleWledOn } = useWledDevice(address, initialState, device_name)

    return (
        <>
        <div className="bg-secondary p-s rounded-[8px] flex items-center gap-m">   
        
                <Button className="p-0" variant="ghost" onClick={() => checkStatus(address)}>
                    <RefreshCw color={loading ? 'grey' : !online ? 'red' : 'green'}/>
                </Button>
                <p className="text-step-1 font-heading">{props.name}</p>

                <Switch 
                    onClick={() => toggleWledOn(deviceState.toggle === 'on' ? 'off' : 'on')}
                    checked={deviceState.toggle === 'on'}
                />
               
        </div> 
        </>
        
    )
}

interface IToggle {
    checked: 'on' | 'off'
    handleClick: (toggle: 'on' | 'off') => void
}
const Toggle = ({checked,  handleClick}: IToggle) => {
    return (
        <div>
            <Switch 
                onClick={() => handleClick(checked === 'on' ? 'off' : 'on')}
                checked={checked === 'on'}
            />
           
    </div>
    )
}
