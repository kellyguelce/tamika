<script lang="ts">
	import clickoutside from '$lib/actions/clickoutside'
	import { playonhover } from '$lib/actions/playonhover'
	import { sfx } from '$lib/actions/sfx'
	import { BackgroundStore } from '$lib/modules/background/background.svelte'
	import { SettingsStore } from '$lib/modules/settings/settings.svelte'
	import { pocketbase } from '$lib/pocketbase/pocketbase'
	import type { BgsRecord } from '$lib/pocketbase/pocketbase-types'
	import { pbFileUrl } from '$lib/pocketbase/pocketbase-utils'
	import { Play, X } from 'lucide-svelte'
	import { onMount } from 'svelte'
	import { fly } from 'svelte/transition'

	let bgs = $state<BgsRecord[]>([]),
		bgstore = BackgroundStore

	function changeBackground(bg: BgsRecord) {
		BackgroundStore.background = bg
	}

	function close() {
		SettingsStore.closeBox()
	}

	onMount(async () => {
		bgs = await pocketbase.collection('bgs').getFullList()
	})
</script>

<div
	class="fixed top-1/2 left-1/2 h-[65vh] w-[75vw] -translate-1/2 overflow-hidden rounded-xl bg-black/50"
	in:fly
	out:fly
	use:clickoutside={close}
>
	<div class="flex items-center justify-end border-b border-white/10 px-4 py-2 text-sm text-white">
		<button class="trx flex cursor-pointer items-center space-x-1" onclick={close} use:sfx>
			<X class="size-4" />
			<span>close</span>
		</button>
	</div>
	<div class="p-4">
		<ul class="grid grid-cols-6 gap-2">
			{#each bgs as bg}
				<li
					class="relative flex h-full w-full overflow-hidden rounded-md border-2 border-transparent transition-all hover:border-white/50"
					class:border-white={bgstore.background.id == bg.id}
				>
					<button class="flex-1 cursor-pointer" onclick={() => changeBackground(bg)}>
						{#if bg.animated}
							<span class="absolute top-2 right-2 block rounded-full bg-white/75 p-1 text-xs">
								<Play class="size-2" />
							</span>
							<video
								src={pbFileUrl(bg, bg.file)}
								use:playonhover
								class="h-full w-full object-cover"
								disablepictureinpicture
							>
								<track kind="captions" />
							</video>
						{:else}
							<img src={pbFileUrl(bg, bg.file)} alt={bg.name} class="h-full w-full object-cover" />
						{/if}
					</button>
				</li>
			{/each}
		</ul>
	</div>
</div>
