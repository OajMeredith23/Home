"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { IDeviceOld, IDevice } from "@/constants/devices"
import { useDevice } from "@/utils/control-device"
import { RefreshCw } from "lucide-react"

import { IDeviceJSON } from "@/constants/devices"
export const DeviceControlPanel = ({controls, address, state: initialState, ...props}: IDevice) => {

    const {controlDevice, checkStatus, loading, state, online, error} = useDevice(address, initialState)

    if(!state) return <p>Couldn't get the device state, try refreshing...</p>

    return (
        <>
        <pre>STATE: 
            {state && JSON.stringify(state, null, 2)}
        </pre>
        <div className="bg-secondary p-s rounded-[8px] flex items-center gap-m">   
        
                <Button className="p-0" variant="ghost" onClick={() => checkStatus(address)}>
                    <RefreshCw color={loading ? 'grey' : !online ? 'red' : 'green'}/>
                </Button>
                <p className="text-step-1 font-heading">{props.name}</p>
                {online && state && Object.entries(state).map(([key, value], i) => {
                    switch(key){
                            case 'toggle':
                            return <Switch 
                                    key={i}
                                    onClick={() => controlDevice({toggle: value === 'on' ? 'off' : 'on'})}
                                    checked={value === 'on'}
                                />
                            case 'scale': 
                            return <input key={i} type="range" onChange={(e) => controlDevice({scale: e.target.value})} min="0" max="150" value={value}></input>
                           
                        default: {
                            return <></>
                        }
                        }
                })}
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

interface IScale {
    disabled: boolean;
    handleChange: (scale: string) => void 
    defaultValue: string
    range: [number, number]
}

const Scale = ({disabled, handleChange, range,  defaultValue}: IScale) => {

    return (
        <input 
            type="range" 
            min={range[0]} 
            max={range[1]}
            defaultValue={defaultValue}
            disabled={disabled}
            onMouseUp={(e) => {
              const val = e.currentTarget.value
              handleChange(val)
            }}/>
    )
}