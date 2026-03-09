<script lang="ts">
	import { sfx } from '$lib/actions/sfx'
	import { PomodoroStore } from '$lib/modules/pomodoro'
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

	function shortBreak() {
		pomodoro.break(5 * 60)
	}

	function skipBreak() {
		pomodoro.skipBreak()
	}

	function reset() {
		pomodoro.reset()
	}

	onMount(() => {})
</script>

<div class="fixed top-8 left-[4vw] flex w-xs flex-col space-y-2 text-white">
	<div class="overflow-hidden rounded-2xl bg-black/10">
		<div class="flex items-center justify-center">
			<button class="trx p-4 hover:bg-black/30" onclick={() => minus()} use:sfx>
				<Minus />
			</button>
			<button
				class="trx flex-1 cursor-pointer text-center text-xl font-black"
				onclick={() => toggle()}
			>
				{pomodoro.value}
			</button>
			<button class="trx p-4 hover:bg-black/30" onclick={() => plus()} use:sfx>
				<Plus />
			</button>
		</div>
	</div>

	<div class="flex items-center justify-center space-x-1 overflow-hidden px-4 text-white/75">
		{#if pomodoro.interval && !pomodoro.isCurrentlyOnBreak}
			<button
				class="trx flex h-6 flex-1 items-center justify-center rounded-xl bg-black/30 text-xs"
				in:fly
				// out:fly
				onclick={() => shortBreak()}
				use:sfx
			>
				Skip to Break
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
		{/if}
		{#if pomodoro.isCurrentlyOnBreak}
			<button
				class="trx flex size-6 w-6 cursor-pointer items-center justify-center rounded-xl bg-black/30 text-xs"
				in:fly
				// out:fly
				use:sfx
				onclick={() => skipBreak()}
			>
				<SkipForward class="size-3" />
			</button>
		{/if}
	</div>
</div>
