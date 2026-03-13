<script lang="ts">
	import { sfx } from '$lib/actions/sfx'
	import { SettingBox } from '$lib/modules/settings/settings.defs'
	import { SettingsStore } from '$lib/modules/settings/settings.svelte'
	import { Birdhouse, Image, Settings, User } from 'lucide-svelte'
	import { slide } from 'svelte/transition'

	let expanded = $state(false),
		settings = SettingsStore

	function expandSettings() {
		expanded = !expanded
	}

	function openSettingBox(box: SettingBox) {
		settings.currentSettingsBox = box
	}
</script>

<div class="flex flex-col space-y-2">
	<button
		use:sfx
		class="trx block cursor-pointer rounded-full p-2 text-white hover:bg-black/30"
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
				class="trx block cursor-pointer rounded-full p-2 text-white hover:bg-black/30"
				title="Background"
				use:sfx
				onclick={() => openSettingBox(SettingBox.Background)}
			>
				<Image class="size-4" />
			</button>
			<button
				class="trx block cursor-pointer rounded-full p-2 text-white hover:bg-white/10"
				use:sfx
			>
				<Birdhouse class="size-4" />
			</button>
			<button
				class="trx block cursor-pointer rounded-full p-2 text-white hover:bg-white/10"
				use:sfx
				onclick={() => openSettingBox(SettingBox.Auth)}
			>
				<User class="size-4" />
			</button>
		</div>
	{/if}
</div>
