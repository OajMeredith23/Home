import { Button } from "@/components/button"
import { IDevice } from "@/constants/devices"
import {useDevice} from "@/utils/control-device"

export const DeviceControlPanel = ({controls, address, ...props}: IDevice) => {

    console.log({props})
    const {controlDevice, checkStatus, loading, toggle, scale, online, error} = useDevice(address)
    console.log({toggle, scale})
    return (
        <div className="space-y-2xs bg-slate-600 p-s rounded-[8px]">   
            <section className="flex items-center gap-s">
                <div className={`rounded-full w-[20px] h-[20px] ${online === false &&'bg-red-500'} ${online === true &&'bg-green-500'} ${online === null &&'bg-gray-500'}`}/>
                    <p className="text-step-1 font-heading">{props.name}</p>
            </section>
            <Button onClick={() => checkStatus(address)}>Check status</Button>
            {loading && <p>Loading...</p>}
            <section className="space-y-2xs">
            {online && controls?.map(control => {
                console.log({control})

                switch(control.type){
                    case 'toggle':
                       return <Toggle
                            state={toggle}
                            handleClick={(e) => controlDevice({toggle: e, scale})}
                            error={!!error}
                        />
                    case 'scale': 
                        return <Scale 
                            disabled={toggle === 'off'}
                            state={scale}
                            handleChange={(e) => controlDevice({toggle, scale: e})}
                            range={control.range}
                            defaultValue={scale}
                            error={!!error}
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
    state: 'on' | 'off'
    handleClick: (toggle: 'on' | 'off') => void
    error: boolean
}
const Toggle = ({state,  handleClick, error}: IToggle) => {
    return (
        <div>
            <Button 
                className={`${state === 'on' ? 'bg-green-400' : ''} ${error ? 'bg-slate-500 text-gray-300' : ''}`} 
                onClick={() => handleClick('on')}
            >
                On
            </Button>
            <Button 
                className={`${state === 'off' ? 'bg-green-400' : ''} ${error ? 'bg-slate-500 text-gray-300' : ''}`} 
                onClick={() => handleClick('off')}
            >
                Off
            </Button>

    </div>
    )
}

interface IScale {
    state: string;
    disabled: boolean;
    handleChange: (scale: string) => void 
    defaultValue: string
    range: [number, number]
    error: boolean
}

const Scale = ({state, disabled, handleChange, range,  defaultValue,error}: IScale) => {

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