import type { IDevice } from '$lib/types/devices.js';

export async function load() {

    let data = await fetch('https://api.panthabunny.co.uk/inital_state')
    const response: {[key: string]: IDevice} = await data.json()

	return {
        devices: response,
	};
}