<script lang="ts">
	import '../app.css';
	import FabNavigation from '$lib/components/fab-navigation.svelte';
	let { children } = $props();
</script>

{@render children()}

<FabNavigation/>
