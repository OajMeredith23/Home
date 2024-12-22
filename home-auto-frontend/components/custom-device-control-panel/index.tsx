"use client"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import {  IDevice } from "@/constants/devices"
import { useCustomDevice } from "@/utils/useCustomDevice"
import { RefreshCw } from "lucide-react"

export const CustomDeviceControlPanel = ({ address, state: initialState, ...props}: IDevice) => {

    const {controlDevice, checkStatus, loading, state, online } = useCustomDevice(address, initialState)

    if(!state) return <p>Couldn't get the device state, try refreshing...</p>

    return (
        <section className='bg-secondary p-s rounded-[8px]'>
            <div className="flex items-center gap-m">
        
                <Button className="p-0" variant="ghost" onClick={() => checkStatus(address)}>
                    <RefreshCw color={loading ? 'grey' : !online ? 'red' : 'green'}/>
                </Button>

                <div className="space-y-2xs">
                    <div>
                        <p className="text-step-0 font-heading">{props.name}</p>
                        {props.description && <div dangerouslySetInnerHTML={{__html: props.description}}/>}
                    </div>
                    {online && state && Object.entries(state).map(([key, value], i) => {
                        switch(key){
                            case 'toggle':
                                return <div key={i}><Switch 
                                
                                onClick={() => controlDevice({toggle: value === 'on' ? 'off' : 'on'})}
                                checked={value === 'on'}
                                /></div>
                                case 'scale': 
                                return <div key={i}><input type="range" onChange={(e) => controlDevice({scale: e.target.value})} min="0" max="150" value={value}></input></div>
                                
                                default: {
                                    return <></>
                                }
                            }
                        })}
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