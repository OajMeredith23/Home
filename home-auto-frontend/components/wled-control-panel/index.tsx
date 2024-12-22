"use client"
import {useState} from 'react'
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import {  IDevice } from "@/constants/devices"
import { useWledDevice } from "@/utils/useWledDevice"
import { RefreshCw, CirclePowerIcon } from "lucide-react"

export const WledDeviceControlPanel = ({ address, state: initialState, device_name,...props}: IDevice & {device_name: string}) => {

    console.log({props})
    const {loading, online, checkStatus, deviceState, toggleWledOn } = useWledDevice(address, initialState, device_name)

    return (
        <section className='bg-secondary p-s rounded-[8px]'>
            <div className="flex items-center gap-m">   
                    <Button className="p-0" variant="ghost" onClick={() => checkStatus(address)}>
                        <RefreshCw color={loading ? 'grey' : !online ? 'red' : 'green'}/>
                    </Button>
                <div className="space-y-2xs">
                    <div>
                        <p className="text-step-0 font-heading">{props.name}</p>
                        {props.description && <div className='text-step--1' dangerouslySetInnerHTML={{__html: props.description}}/>}
                    </div>

                    <Switch 
                        onClick={() => toggleWledOn(deviceState.toggle === 'on' ? 'off' : 'on')}
                        checked={deviceState.toggle === 'on'}
                    />
                </div>
                
            </div> 
        </section>
        
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
