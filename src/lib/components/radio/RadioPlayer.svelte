<script lang="ts">
	import type { RadioStationsRecord } from '$lib/pocketbase-types'
	import { Pause, Play } from 'lucide-svelte'
	import { fade } from 'svelte/transition'
	import SoundWave from '../ui/SoundWave.svelte'

	let { station }: { station: RadioStationsRecord | null } = $props(),
		audioElement: HTMLAudioElement | null = $state(null),
		playing = $state(false)

	function play() {
		if (!audioElement) return

		if (audioElement.paused) {
			playing = true
			return audioElement.play()
		}

		playing = false
		return audioElement.pause()
	}
</script>

<div
	class="flex w-xs items-center justify-start space-x-2 rounded-xl bg-white/5 p-3 text-white
		backdrop-blur-2xl"
>
	<button onclick={() => play()} class="size-6">
		{#if playing}
			<Pause class="size-6 fill-white/75 stroke-white/50" />
		{:else}
			<Play class="size-6 fill-white/75 stroke-white/50" />
		{/if}
	</button>

	<p class="text-sm">
		<a href={station?.homepage} target="_blank" class="hover:underline">
			{station?.name}
		</a>
	</p>

	<div class="h-8 bg-red-500">
		<SoundWave />
	</div>

	<!-- Invisible -->
	<audio bind:this={audioElement} class="hidden">
		<source src={station?.stream} />
	</audio>
</div>
