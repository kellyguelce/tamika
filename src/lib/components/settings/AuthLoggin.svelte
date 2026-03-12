<script lang="ts">
	import clickoutside from '$lib/actions/clickoutside'
	import { sfx } from '$lib/actions/sfx'
	import { SettingsStore } from '$lib/modules/settings/settings.svelte'
	import { X } from 'lucide-svelte'
	import { fly } from 'svelte/transition'

	let email = $state(''),
		password = $state('')

	function close() {
		SettingsStore.currentSettingsBox = null
	}

	function handleSubmit(e: SubmitEvent) {
		e.preventDefault()

		// Check that password and email are set - not necessary because of "required" and "disabled" (see form)
		if (!email.length || !password.length) return
	}
</script>

<div
	class="fixed top-1/2 left-1/2 w-sm -translate-1/2 overflow-hidden rounded-xl bg-black/50"
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

	<div class="p-8 text-white">
		<form action="#" onsubmit={handleSubmit} class="flex flex-col space-y-4">
			<label class="flex flex-col space-y-2">
				<span>Email</span>
				<input
					type="email"
					name="email"
					aria-label="Email"
					autocomplete="email"
					class="rounded-lg border-none bg-white/10 outline-none"
					bind:value={email}
					required
				/>
			</label>
			<label class="flex flex-col space-y-2">
				<span>Password</span>
				<input
					type="password"
					name="password"
					autocomplete="current-password"
					aria-label="Password"
					bind:value={password}
					class="rounded-lg border-none bg-white/10 outline-none"
					required
				/>
			</label>
			<button
				class="cursor-pointer rounded-lg bg-white/90 p-2 text-black disabled:opacity-50"
				disabled={email.length <= 0 || password.length <= 0}>Login</button
			>
		</form>
	</div>
</div>
