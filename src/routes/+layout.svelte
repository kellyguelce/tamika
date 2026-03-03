<script lang="ts">
	import './layout.css'
	import favicon from '$lib/assets/favicon.svg'
	import { BackgroundStore } from '$lib/modules/background/'
	import Background from '$lib/components/Background.svelte'
	import { RadioStore } from '$lib/modules/radio/radio.svelte.js'
	import { onMount } from 'svelte'

	let { data, children } = $props()

	onMount(() => {
		RadioStore.init(data.stations)
	})
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<div class="relative">
	<div class="relative z-10">
		{@render children()}
	</div>
	<Background />
</div>
