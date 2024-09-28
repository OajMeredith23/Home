import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { IDevice } from "@/constants/devices"
import {useDevice} from "@/utils/control-device"

export const DeviceControlPanel = ({controls, address, ...props}: IDevice) => {

    // console.log({props})
    const {controlDevice, checkStatus, loading, toggle, scale, online, error} = useDevice(address)
    // console.log({toggle, scale})
    return (
        <div className="space-y-2xs bg-secondary p-s rounded-[8px]">   
            <section className="flex items-center gap-s">
                <div className={`rounded-full w-[20px] h-[20px] ${online === false &&'bg-red-500'} ${online === true &&'bg-green-500'} ${online === null &&'bg-gray-500'}`}/>
                    <p className="text-step-1 font-heading">{props.name}</p>
            </section>
            <Button onClick={() => checkStatus(address)}>Check status</Button>
            {loading && <p>Loading...</p>}
            <section className="space-y-2xs">
            {online && controls?.map((control, i) => {
                console.log({control})

                switch(control.type){
                    case 'toggle':
                       return <Toggle
                                key={i}
                                checked={toggle}
                                handleClick={(e) => controlDevice({toggle: e, scale})}
                                />
                        case 'scale': 
                        return <Scale 
                                key={i}
                                disabled={toggle === 'off'}
                                handleChange={(e) => controlDevice({toggle, scale: e})}
                                range={control.range}
                                defaultValue={scale}
                            />
                    default: {
                        return <></>
                    }
                    }
            })}
            </section>
           
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