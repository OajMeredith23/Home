<script lang="ts">
    import { PUBLIC_API_URL } from '$env/static/public';
    import type { IDevice } from '$lib/types/devices.js';
	import { onMount } from 'svelte';
  
    const { deviceName, address, ...props }: { deviceName: string } & IDevice = $props();
  
    // Declare reactive state using writable store
    let loading = $state(true);
    let online = $state(false);
    
    const checkStatus = async () => {
      // Set loading to true before the fetch starts
      loading = true
      try {
        const req = await fetch(`${PUBLIC_API_URL}/status-request`, {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            address
          })
        });
  
        const res = await req.json();
        // console.log("res", res, address, res.success, res.device_response);
  
        // Update the state based on the response
        online = res?.success
        loading = false; // Set loading to false when done
      } catch (error: any) {
        console.error(`Error on ${props.name}/${address}`, error);
        online = false
        loading = false;
      }
    };
  
    // Automatically check status on component load
    onMount(() => checkStatus())
  </script>
  
  <button onclick={() => checkStatus()}>Recheck</button>
  
  {#if loading} <!-- Reactive syntax to access the store value -->
    LOADING...
  {:else}
    <h2>{deviceName}</h2>
    <p>Online: {online ? 'yes' : 'no'}</p>
    <p>{JSON.stringify(props)}</p>
  {/if}
  