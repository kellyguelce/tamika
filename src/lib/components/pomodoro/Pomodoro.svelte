<script lang="ts">
	import { sfx } from '$lib/actions/sfx'
	import { PomodoroStore } from '$lib/modules/pomodoro/pomodoro.svelte'
	import { Minus, Plus, RotateCcw, SkipForward } from 'lucide-svelte'
	import { onMount } from 'svelte'
	import { fly } from 'svelte/transition'

	let pomodoro = PomodoroStore

	function plus() {
		pomodoro.plus()
	}

	function minus() {
		pomodoro.minus()
	}

	function toggle() {
		if (pomodoro.interval !== null) return pomodoro.stop()
		pomodoro.start()
	}

	function skip() {
		pomodoro.skip()
	}

	function reset() {
		pomodoro.reset()
	}

	onMount(() => {})
</script>

<div class="flex w-xs flex-col space-y-2 text-white">
	<div class="overflow-hidden rounded-2xl bg-black/10">
		<div class="flex items-center justify-center">
			<button class="trx cursor-pointer p-4 hover:bg-black/30" onclick={() => minus()} use:sfx>
				<Minus />
			</button>
			<button
				class="trx block h-full flex-1 cursor-pointer p-4 text-center font-sans-big text-4xl hover:bg-black/30"
				onclick={() => toggle()}
				use:sfx
			>
				{pomodoro.value}
			</button>
			<button class="trx cursor-pointer p-4 hover:bg-black/30" onclick={() => plus()} use:sfx>
				<Plus />
			</button>
		</div>
	</div>

	<div class="flex items-center justify-center space-x-1 overflow-hidden px-4 text-white/75">
		<button
			class="trx flex size-6 w-6 cursor-pointer items-center justify-center rounded-xl bg-black/30 text-xs"
			in:fly
			// out:fly
			onclick={() => skip()}
			use:sfx
		>
			<SkipForward class="size-3" />
		</button>

		<button
			class="trx flex size-6 w-6 cursor-pointer items-center justify-center rounded-xl bg-black/30 text-xs"
			in:fly
			// out:fly
			use:sfx
			onclick={() => reset()}
		>
			<RotateCcw class="size-3" />
		</button>
	</div>
</div>
