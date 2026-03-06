<script lang="ts">
	import RadioStore from '$lib/modules/radio/radio.svelte'
	import { pocketbase } from '$lib/pocketbase'
	import type { RadioStationsRecord } from '$lib/pocketbase-types'
	import { Heart } from 'lucide-svelte'

	let { station }: { station: RadioStationsRecord } = $props(),
		logo = () => pocketbase.files.getURL(station, station.logo),
		isCurrentlyPlaying = $derived(RadioStore.station == station),
		isFavourite = $state(false)

	function playStation() {
		RadioStore.play(station)
	}

	function toggleFavourite(e: Event) {
		e.preventDefault()
		isFavourite = !isFavourite
	}
</script>

<div class="flex items-center justify-between bg-transparent text-sm hover:bg-black/20">
	<div class="flex flex-1 cursor-pointer items-center">
		<button onclick={() => playStation()} class="flex flex-1 items-center space-x-2 p-3">
			<div class="h-6 min-h-6 w-6 min-w-6 overflow-hidden rounded-lg">
				<img src={logo()} alt="" class="h-full w-full object-cover" />
			</div>
			<div>
				<span class:text-cyan-500={isCurrentlyPlaying}>{station.name}</span>
			</div>
		</button>
		<div class="ml-auto opacity-50 transition-opacity hover:opacity-100">
			<a role="button" href="/#" onclick={toggleFavourite} class="relative z-40 block px-3">
				{#if isFavourite}
					<Heart class="size-4 fill-white" />
				{:else}
					<Heart class="size-4" />
				{/if}
			</a>
		</div>
	</div>
</div>
