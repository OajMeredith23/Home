// export type TDeviceControl = {
//     /** Toggle must send 'toggle=on' or 'toggle=off' */
//     type: 'toggle'
//     state: 'on' | 'off'
// } | {
//     type: 'scale',
//     range: [number, number]
// }

export interface IDevice {
    type: 'custom' | 'wled',
    name: string;
    address: string;
    description?: string;
    state: {
        toggle?: 'on' | 'off';
        scale?: string
    }
}

// // export interface IDevice {
// //     name: string;
// //     address: string;
// //     controls?: TDeviceControl[]
// //     state: {
// //         toggle?: 'on' | 'off';
// //         scale?: string
// //     }
// // }

// export interface IDeviceJSON {
//     [key:string]: IDevice
// }

// export type TDeviceControlOld = {
//     /** Toggle must send 'toggle=on' or 'toggle=off' */
//     type: 'toggle'
// } | {
//     type: 'scale',
//     range: [number, number]
// }

// export interface IDeviceOld {
//     name: string;
//     address: string;
//     controls?: TDeviceControlOld[]
// }

// export const devices: IDeviceOld[] = [
//      {
//         name: 'pico',
//         address: 'http://192.168.1.12',
//         controls: [
//             {
//                 type: 'toggle'
//             },
//             {
//                 type: 'scale',
//                 range: [0, 100]
//             },
//         ]
        
//     },  
//     // {
//     //     name: 'made-up-thing',
//     //     address: 'http://notanaddress.com',
//     //     controls:[
//     //         {
//     //             type: 'toggle'
//     //         }
//     //     ], 
//     // }
// ]