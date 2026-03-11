<script>
	import { sfx } from '$lib/actions/sfx'
	import { BoomBox, Image, Settings } from 'lucide-svelte'
	import { slide } from 'svelte/transition'

	let expanded = $state(false)

	function expandSettings() {
		expanded = !expanded
	}
</script>

<div class="flex flex-col space-y-2">
	<button
		use:sfx
		class="trx block cursor-pointer rounded-full p-2 text-white hover:bg-white/10"
		onclick={() => expandSettings()}
	>
		<Settings class="size-4" />
	</button>
	{#if expanded}
		<div
			class="w-8 rounded-full border border-white/10 shadow-xl shadow-white/10"
			in:slide
			out:slide
		>
			<button
				class="trx block cursor-pointer rounded-full p-2 text-white hover:bg-white/10"
				title="Background"
			>
				<Image class="size-4" />
			</button>
			<button class="trx block cursor-pointer rounded-full p-2 text-white hover:bg-white/10">
				<BoomBox class="size-4" />
			</button>
		</div>
	{/if}
</div>
