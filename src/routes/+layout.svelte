<script lang="ts">
	import './layout.css'
	import favicon from '$lib/assets/favicon.svg'
	import Background from '$lib/components/Background.svelte'
	import { onMount } from 'svelte'
	import { pocketbase } from '$lib/pocketbase.js'
	import StationStore from '$lib/modules/station/station.svelte'
	import RadioStore from '$lib/modules/radio/radio.svelte.js'
	import { SharedStore } from '$lib/modules/shared/shared.svelte.js'

	let { data, children } = $props()

	onMount(() => {
		/**
		 * Load shared store
		 */
		// SharedStore.init()

		/**
		 * Load the stations into global states
		 */
		RadioStore.setStation(StationStore.load(data.stations).randomStation())

		// Subscribe to changes in any record in the collection
		pocketbase.collection('radio_stations').subscribe(
			'*',
			function (e) {
				if (e.action === 'update') {
				}
			},
			{}
		)

		return () => {
			pocketbase.collection('radio_stations').unsubscribe()
		}
	})
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<div class="relative">
	<div class="relative z-10">
		{@render children()}
	</div>
	<Background />
</div>
