<script lang="ts">
	import { PomodoroStore } from '$lib/modules/pomodoro'
	import { Minus, Plus } from 'lucide-svelte'
	import { onMount } from 'svelte'

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

	onMount(() => {})
</script>

<div
	class="fixed top-8 left-[4vw] flex w-xs flex-col space-y-2 text-white opacity-50 transition-opacity hover:opacity-100"
>
	<div class="overflow-hidden rounded-2xl bg-black/30">
		<div class="flex items-center justify-center">
			<button class="p-4 hover:bg-black/30" onclick={() => minus()}>
				<Minus />
			</button>
			<button class="flex-1 cursor-pointer text-center text-xl font-black" onclick={() => toggle()}>
				{pomodoro.value}
			</button>
			<button class="p-4 hover:bg-black/30" onclick={() => plus()}>
				<Plus />
			</button>
		</div>
	</div>

	<div class="flex items-center justify-center space-x-2 overflow-hidden text-white/75">
		<button class="flex-1 rounded-lg bg-black/30 px-3 py-1 text-xs">Short Break</button>
		<button class="flex-1 rounded-lg bg-black/30 px-3 py-1 text-xs">Long Break</button>
	</div>
</div>
