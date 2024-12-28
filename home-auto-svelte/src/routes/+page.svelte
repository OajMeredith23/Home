<script lang="ts">
    import { PUBLIC_WEBSOCKET_URL } from '$env/static/public';
    import CustomDevice from '$lib/components/custom-device.svelte'
    import { io } from 'socket.io-client'
	import { onMount } from 'svelte';
    
	let { data } = $props();
    // const socket = io(PUBLIC_WEBSOCKET_URL)

    console.log("Hello")
    let handleSubmit: any;
    onMount(() => {
        // URL of your WebSocket server
        const socket = io(PUBLIC_WEBSOCKET_URL, {
            transports: ['websocket'], // Ensure WebSocket transport is used
            withCredentials: true      // Necessary for cross-origin connections if credentials are required
        });
        
    
        // Listen for connection success
        socket.on('connect', () => {
            console.log('Connected to WebSocket server');
        });
        socket.on('disconnect', () => {
            console.log('disconnect to WebSocket server');
        });
    
        // Listen for custom events
        socket.on('messageResponse', (data) => {
            console.log('Message from server:', data);
        });
    
        console.log("Emitting...")
        socket.emit('message', {data: 'hello!?????'})
        
        handleSubmit = (e: SubmitEvent & {
           currentTarget: EventTarget & HTMLFormElement;
       }) => {
           e.preventDefault()
           const data = new FormData(e.currentTarget)
           const text = data.get('text')
           console.log("Form", text)
           console.log("socket.connected",socket.connected)
           socket.emit('message', {data: text})
       }
    })

</script>

<form onsubmit={(e)=>handleSubmit(e)}>
    <input type="text" name="text">
    <button>Submit</button>
</form>

{#each Object.entries(data.devices) as device}
{#if device[1].type === 'custom'}
    <CustomDevice deviceName={device[0]} {...device[1]}/>
{/if}
{#if device[1].type === 'wled'}
    <h1>WLED</h1>
{/if}
{/each}