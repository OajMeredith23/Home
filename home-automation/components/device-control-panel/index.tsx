import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { IDevice } from "@/constants/devices"
import { useDevice } from "@/utils/control-device"
import { RefreshCw } from "lucide-react"

export const DeviceControlPanel = ({controls, address, ...props}: IDevice) => {

    const {controlDevice, checkStatus, loading, toggle, scale, online, error} = useDevice(address)

    return (
        <div className="bg-secondary p-s rounded-[8px] flex items-center gap-m">   
                <Button className="p-0" variant="ghost" onClick={() => checkStatus(address)}>
                    <RefreshCw color={loading ? 'grey' : !online ? 'red' : 'green'}/>
                </Button>
                <p className="text-step-1 font-heading">{props.name}</p>
            {online && controls?.map((control, i) => {
                switch(control.type){
                        case 'toggle':
                        return <Switch 
                                key={i}
                                onClick={() => controlDevice({toggle: toggle === 'on' ? 'off' : 'on', scale})}
                                checked={toggle === 'on'}
                            />
                        case 'scale': 
                        return <input type="range" onChange={(e) => controlDevice({toggle, scale: e.target.value})} min={control.range[0]} max={control.range[1]} value={scale}></input>
                        // <Slider 
                        //         key={i} 
                        //         // disabled={toggle === 'off'}
                        //         // onValueChange={(e) => console.log(e)}
                        //         onValueCommit={(e) => controlDevice({toggle, scale: e[0].toString()})}
                        //         min={control.range[0]}
                        //         max={control.range[1]}
                        //         // defaultValue={[s]}
                        //         // defaultValue={scale}
                        //         // range={control.range}
                        //     />
                        // <Scale 
                        //         key={i}
                        //         disabled={toggle === 'off'}
                        //         handleChange={(e) => controlDevice({toggle, scale: e})}
                        //         range={control.range}
                        //         defaultValue={scale}
                        //     />
                    default: {
                        return <></>
                    }
                    }
            })}
           
        </div> 
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
                // className={`${checked === 'on' ? 'bg-green-400' : ''} ${error ? 'bg-slate-500 text-gray-300' : ''}`} 
                onClick={() => handleClick(checked === 'on' ? 'off' : 'on')}
                checked={checked === 'on'}
            />
            {/* <Switch 
                // className={`${checked === 'on' ? 'bg-green-400' : ''} ${error ? 'bg-slate-500 text-gray-300' : ''}`} 
                onClick={() => handleClick('off')}
                checked={checked === 'off'}
            /> */}
                
            {/* <Switch 
                className={`${state === 'off' ? 'bg-green-400' : ''} ${error ? 'bg-slate-500 text-gray-300' : ''}`} 
                onClick={() => handleClick('off')}
            >
                Off
            </Switch> */}

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