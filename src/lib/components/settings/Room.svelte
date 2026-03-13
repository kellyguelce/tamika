<script lang="ts">
	import clickoutside from '$lib/actions/clickoutside'
	import { sfx } from '$lib/actions/sfx'
	import { authUser } from '$lib/modules/auth/auth.utls'
	import { RoomStore } from '$lib/modules/room/room.svelte'
	import { SettingsStore } from '$lib/modules/settings/settings.svelte'
	import type { UsersRecord } from '$lib/pocketbase/pocketbase-types'
	import { X } from 'lucide-svelte'
	import { onMount } from 'svelte'
	import { toast } from 'svelte-sonner'
	import { fly } from 'svelte/transition'

	let room = RoomStore,
		user = $state<UsersRecord | null>(null),
		desiredRoomId = $state('')

	function close() {
		SettingsStore.closeBox()
	}

	async function createRoom() {
		if (!user) return
		const _room = await room.create(user.id)
		if (!_room.ok) {
			toast.error('Whoops! Room creation failed', {
				description: _room?.message
			})
		}
	}

	async function joinRoom() {
		if (!user) return
		room.join(desiredRoomId, user.id)
	}

	onMount(async () => {
		user = await authUser()
	})
</script>

<div
	class="fixed top-1/2 left-1/2 w-xs -translate-1/2 overflow-hidden rounded-xl bg-black/50 text-sm text-white/80"
	in:fly
	out:fly
	use:clickoutside={close}
>
	<div class="flex items-center justify-end border-b border-white/10 px-4 py-2 text-sm">
		<button class="trx flex cursor-pointer items-center space-x-1" onclick={close} use:sfx>
			<X class="size-4" />
			<span>close</span>
		</button>
	</div>

	<div class="p-4">
		{#if !room.room}
			<button
				class="block w-full cursor-pointer rounded-lg border-2 border-dashed border-white/10 bg-white/5 py-12 transition-colors hover:bg-white/15"
				use:sfx
				onclick={createRoom}
			>
				<span>Create a room</span>
			</button>
		{:else}
			<div>
				<span>{room.room.code}</span>
			</div>
		{/if}
	</div>

	<footer class="flex items-center space-x-2 border-t border-white/10 px-4 py-2">
		{#if !room.room}
			<input
				type="text"
				class="flex-1 rounded-lg border-0 bg-white/10 text-xs outline-none focus:ring-0"
				maxlength="8"
				minlength="5"
				bind:value={desiredRoomId}
			/>
			<button class="rounded-lg bg-white px-2 py-1 text-black" onclick={joinRoom}>Join</button>
		{/if}
	</footer>
</div>
