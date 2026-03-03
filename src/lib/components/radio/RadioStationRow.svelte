<script lang="ts">
	import RadioStore from '$lib/modules/radio/radio.svelte'
	import { pocketbase } from '$lib/pocketbase'
	import type { RadioStationsRecord } from '$lib/pocketbase-types'

	let { station }: { station: RadioStationsRecord } = $props(),
		logo = () => pocketbase.files.getURL(station, station.logo)

	function playStation() {
		RadioStore.play(station)
	}
</script>

<div class="flex items-center justify-between bg-transparent p-3 text-sm hover:bg-black/50">
	<button class="flex cursor-pointer items-center gap-x-2" onclick={() => playStation()}>
		<div class="h-6 min-h-6 w-6 min-w-6 overflow-hidden rounded-lg">
			<img src={logo()} alt="" class="h-full w-full object-cover" />
		</div>
		<div>
			<span>{station.name}</span>
		</div>
	</button>
</div>
