export interface IDevice {
    name: string;
    address: string;
    state: {
        toggle?: 'on' | 'off';
        scale?: string
    }
}

export const devices: {[key:string]: IDevice} = {

    "pico_one": {
       name: 'pico',
       address: 'http://192.168.1.12',
       "state": {
            "toggle": "on",
            "scale": "0"
       }
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
