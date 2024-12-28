import type { IDevice } from '$lib/types/devices.js';
import { PUBLIC_API_URL } from '$env/static/public';

export async function load() {

    console.log("Fetching", `${PUBLIC_API_URL}/inital_state`)
    let data = await fetch(`${PUBLIC_API_URL}/inital_state`)
    const response: {[key: string]: IDevice} = await data.json()

	return {
        devices: response,
	};
}