"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.devices = void 0;
exports.devices = {
    "pico_one": {
        type: 'custom',
        name: 'pico',
        address: 'http://192.168.1.12',
        "state": {
            "toggle": "on",
            "scale": "0"
        }
    },
    "wled_matrix": {
        type: 'wled',
        name: 'WLED Matrix',
        address: 'http://wled.local',
        description: `<a href="http://wled.local/" target="_blank">wled.local</a>`,
        "state": {
            "toggle": "on",
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
};
