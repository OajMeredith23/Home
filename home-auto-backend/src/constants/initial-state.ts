export type TDeviceControl = {
    /** Toggle must send 'toggle=on' or 'toggle=off' */
    type: 'toggle'
    state: 'on' | 'off'
} | {
    type: 'scale',
    range: [number, number]
}

export interface IDevice {
    name: string;
    address: string;
    controls?: TDeviceControl[]
}

export const devices: IDevice[] = [
     {
        name: 'pico',
        address: 'http://192.168.1.12',
        controls: [
            {
                type: 'toggle',
                state: 'on'
            },
            {
                type: 'scale',
                range: [0, 100]
            },
        ]
        
    },  
    {
        name: 'made-up-thing',
        address: 'http://notanaddress.com',
        controls:[
            {
                type: 'toggle',
                state: 'off'
            }
        ], 
    }
]