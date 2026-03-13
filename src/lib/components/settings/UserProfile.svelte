<script lang="ts">
	import clickoutside from '$lib/actions/clickoutside'
	import { sfx } from '$lib/actions/sfx'
	import { DefaultAvatar } from '$lib/modules/auth/auth.defs'
	import { authUser } from '$lib/modules/auth/auth.utls'
	import { SettingsStore } from '$lib/modules/settings/settings.svelte'
	import { reloadPage } from '$lib/modules/shared/utls'
	import { type UsersRecord } from '$lib/pocketbase/pocketbase-types'
	import { pbLogout } from '$lib/pocketbase/pocketbase-utils'
	import { X } from 'lucide-svelte'
	import { onMount } from 'svelte'
	import { fly } from 'svelte/transition'

	let user = $state<UsersRecord | null>(null)

	function close() {
		SettingsStore.currentSettingsBox = null
	}

	function logout() {
		pbLogout()
		reloadPage()
	}

	onMount(async () => {
		user = await authUser()
	})
</script>

{#if user}
	<div
		class="fixed top-1/2 left-1/2 w-sm -translate-1/2 overflow-hidden rounded-xl bg-black/50"
		in:fly
		out:fly
		use:clickoutside={close}
	>
		<div
			class="flex items-center justify-end border-b border-white/10 px-4 py-2 text-sm text-white"
		>
			<button class="trx flex cursor-pointer items-center space-x-1" onclick={close} use:sfx>
				<X class="size-4" />
				<span>close</span>
			</button>
		</div>

		<div class="flex flex-col space-y-4 p-8 text-sm text-white">
			<div class="h-12 w-12 overflow-hidden rounded-full">
				<img src={user.avatar || DefaultAvatar} alt="" class="h-full w-full object-cover" />
			</div>
			<div>
				<span>{user.name}</span>
			</div>
		</div>

		<footer class="flex items-center justify-end border-t border-white/10 px-4 py-2 text-xs">
			<button
				type="button"
				class="trx cursor-pointer rounded-lg bg-red-800 px-3 py-2 text-white"
				onclick={() => logout()}
			>
				Logout
			</button>
		</footer>
	</div>
{/if}
