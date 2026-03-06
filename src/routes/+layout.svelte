<script lang="ts">
	import './layout.css'
	import favicon from '$lib/assets/favicon.svg'
	import Background from '$lib/components/Background.svelte'
	import { onMount } from 'svelte'
	import { pocketbase } from '$lib/pocketbase.js'
	import StationStore from '$lib/modules/station/station.svelte'
	import RadioStore from '$lib/modules/radio/radio.svelte.js'
	import BannerMessage from '$lib/components/BannerMessage.svelte'

	let { data, children } = $props()

	onMount(() => {
		/**
		 * Load the stations into global states
		 */
		RadioStore.setStation(StationStore.load(data.stations).randomStation())

		// Subscribe to changes in any record in the collection
		// pocketbase.collection('radio_stations').subscribe(
		// 	'*',
		// 	function (e) {
		// 		if (e.action === 'update') {
		// 		}
		// 	},
		// 	{}
		// )

		// return () => {
		// 	pocketbase.collection('radio_stations').unsubscribe()
		// }
	})
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

{#if data.stations.length <= 0}
	<BannerMessage type="error" message="Unexpected Error: Unable to retrieve radio stations" />
{/if}
<div class="relative">
	<div class="relative z-10">
		{@render children()}
	</div>
	<Background />
</div>
