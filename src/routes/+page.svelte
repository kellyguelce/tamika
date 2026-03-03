<script lang="ts">
	import DateTime from '$lib/components/DateTime.svelte'
	import RadioPlayer from '$lib/components/radio/RadioPlayer.svelte'
	import { RadioStore } from '$lib/modules/radio'
	import { onMount } from 'svelte'

	let station = $derived(RadioStore.station)
</script>

<main class="relative grid"></main>
<footer class="lef-0 fixed right-0 bottom-0 z-20 grid w-screen grid-cols-2 px-[4vw] py-8">
	<div class="flex">
		<RadioPlayer {station} />
	</div>
	<div class="flex justify-end">
		<DateTime />
	</div>
</footer>
