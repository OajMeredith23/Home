export interface IDevice {
    type: 'custom' | 'wled',
    name: string;
    address: string;
    description?: string;
    /** DEPRECATED DON'T /USE */
    state?: {
        toggle?: 'on' | 'off';
        scale?: string
    }
    controls: {
        name: string;
        type: 'toggle' | 'range'
    }[]
}

export const devices: {[key:string]: IDevice} = {

    "pico_one": {
       type: 'custom', 
       name: 'pico',
       address: 'http://192.168.1.12',
       controls: [{
        type: 'toggle',
        name: 'toggle'
       }]
    //    "state": {
    //         "toggle": "on",
    //         "scale": "0"
    //    }
   },  
    "wled_matrix": {
       type: 'wled',
       name: 'WLED Matrix',
       address: 'http://wled.local',
       description: `<a href="http://wled.local/" target="_blank">wled.local</a>`,
       "state": {
            "toggle": "on",
       },
       controls: [{
            type: 'toggle',
            name: 'toggle',
       }]
   },  
//    "device_two": {
//        name: 'made-up-thing',
//        address: 'http://notanaddress.com',
//        "state": {
//             "toggle": "on",
//             "scale": "0"
//        }
//    }
}
