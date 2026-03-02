<script lang="ts">
	import './layout.css'
	import favicon from '$lib/assets/favicon.svg'
	import { BackgroundStore } from '$lib/modules/background/'
	import Background from '$lib/components/Background.svelte'

	let { children } = $props()

	const backgroundUrl = BackgroundStore.url
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<div class="relative">
	<div class="relative z-10">
		{@render children()}
	</div>
	<Background />
</div>
