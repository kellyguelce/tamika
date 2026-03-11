<script lang="ts">
	import { Pause, Play } from 'lucide-svelte'
	import { fade, slide } from 'svelte/transition'
	import SoundWave from '../ui/SoundWave.svelte'
	import RadioStations from './RadioStations.svelte'
	import RadioStore from '$lib/modules/radio/radio.svelte'
	import { sfx } from '$lib/actions/sfx'
	import clickoutside from '$lib/actions/clickoutside'

	let expanded = $state(false),
		station = $derived(RadioStore.station),
		// stations = $derived(RadioStore.stations),
		voidStation = {
			name: 'Nothing playing'
		}

	function play() {
		if (RadioStore.isPlaying) return RadioStore.pause()
		return RadioStore.play()
	}

	function toggleRadioPlayerExpansion() {
		expanded = !expanded
	}
</script>

<div
	class="trx relative flex w-xs items-center justify-start space-x-2 rounded-xl
		bg-black/35 p-3 text-white"
	use:clickoutside={() => (expanded = false)}
>
	<button onclick={() => play()} class="size-6" use:sfx>
		{#if RadioStore.isPlaying}
			<Pause class="size-5 fill-white/75 stroke-white/50" />
		{:else}
			<Play class="size-5 fill-white/75 stroke-white/50" />
		{/if}
	</button>

	<p class="line-clamp-1 flex-1 text-sm">
		<button onclick={() => toggleRadioPlayerExpansion()} class="cursor-pointer" use:sfx>
			{station?.name || voidStation.name}
		</button>
	</p>

	{#if RadioStore.isPlaying}
		<div class="absolute top-1/2 right-2 z-100 ml-auto w-12 -translate-y-1/2" in:fade out:fade>
			<SoundWave />
		</div>
	{/if}

	<!-- Box to show stations -->
	{#if expanded}
		<div
			class="absolute right-0 bottom-full left-0 mb-2 h-96 w-full overflow-hidden rounded-xl
				bg-black/30"
			in:slide
			out:slide
		>
			<RadioStations />
		</div>
	{/if}

	<!-- Invisible audio element -->
	<audio bind:this={RadioStore.element} class="hidden">
		<source src={station?.stream} />
	</audio>
</div>
