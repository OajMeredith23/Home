<script lang="ts">
    import type { IDevice } from '$lib/types/devices.js';

    const {deviceName, address, ...props}: {
        deviceName: string
    } & IDevice = $props()

    let loading = $state(true);
    let online = $state(false);
    
    const checkStatus = async () => {
        console.log("checking...")
        loading = true
        try {
            const req = await fetch(`https://api.panthabunny.co.uk/status-request`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                  },
                body: JSON.stringify({
                    address
                })
            })
            const res = await req.json()
            console.log("res", res, address, res.success, res.device_response)
            online = res.success 
            loading = false
            return true
        } catch (error: any) {
            console.error("Status error", error)
            online = false;
            loading = false;
            return false
        }
    }

    checkStatus()
</script>
 
<button onclick={() => checkStatus()}>Recheck</button>
{#if loading}
 LOADING...

 {:else}

    <h2 class="">{deviceName}</h2>
    <p>Online: {online ? 'yes' : 'no'}</p>
    <p>
        {JSON.stringify(props)}
    </p>

{/if}
