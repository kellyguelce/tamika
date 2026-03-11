<script lang="ts">
	import type { RadioStationsRecord } from '$lib/pocketbase/pocketbase-types'
	import RadioStationRow from './RadioStationRow.svelte'
	import { slide } from 'svelte/transition'
	import StationStore from '$lib/modules/station/station.svelte'

	let stations = $derived(StationStore.stations),
		search = $state(''),
		displayedStations = $state<RadioStationsRecord[]>([])

	$effect(() => {
		displayedStations = stations.filter((s) => s.name.includes(search))
	})
</script>

<div class="flex flex-col">
	<div>
		<input
			type="text"
			class="textsm w-full rounded-t-xl border-0 bg-black/20 p-2"
			placeholder="Search station..."
			bind:value={search}
		/>
	</div>

	<ul>
		{#each displayedStations as station (station.id)}
			<li class="border-white/10 not-last:border-b" in:slide out:slide>
				<RadioStationRow {station} />
			</li>
		{/each}
	</ul>
</div>
