<script>
	let { data } = $props();
    import CustomDevice from '$lib/components/custom-device.svelte'
</script>


{#each Object.entries(data.devices) as device}
    <CustomDevice deviceName={device[0]} {...device[1]}/>
{/each}