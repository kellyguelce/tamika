<script lang="ts">
	import clickoutside from '$lib/actions/clickoutside'
	import { sfx } from '$lib/actions/sfx'
	import { SettingsStore } from '$lib/modules/settings/settings.svelte'
	import { pbLoginWithPassword } from '$lib/pocketbase/pocketbase-utils'
	import { X } from 'lucide-svelte'
	import { fly } from 'svelte/transition'
	import { toast } from 'svelte-sonner'
	import { createUser } from '$lib/modules/auth/auth.actions'
	import { AuthStore } from '$lib/modules/auth/auth.svelte'
	import { pocketbase } from '$lib/pocketbase/pocketbase'
	import { SessionStorageAuthSessionItem } from '$lib/modules/auth/auth.defs'
	import { reloadPage } from '$lib/modules/shared/utls'

	let email = $state('kellyguelc@gmail.com'),
		password = $state('passooo'),
		formType = $state<'login' | 'signup'>('login')

	function close() {
		SettingsStore.currentSettingsBox = null
	}

	async function handleSubmit(e: SubmitEvent) {
		e.preventDefault()

		// Check that password and email are set - not necessary because of "required" and "disabled" (see form)
		if (!email.length || !password.length) return

		try {
			if (formType === 'login') {
				await pbLoginWithPassword(email, password)
				toast.success("Yay! You're logged in!")
			} else {
				await createUser(email, password)
				pbLoginWithPassword(email, password)
				toast.success('Account created successfully!')
			}
		} catch (error) {
			toast.error('Authentication failed')
		} finally {
			if (pocketbase.authStore.isValid && pocketbase.authStore.record !== null) {
				const userId = pocketbase.authStore.record.id
				const user = await pocketbase.collection('users').getOne(userId)
				sessionStorage.setItem(SessionStorageAuthSessionItem, JSON.stringify(user))
				reloadPage()
			}
		}
	}

	function switchFormType() {
		if (formType === 'login') return (formType = 'signup')
		formType = 'login'
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
		<form action="#" onsubmit={handleSubmit} class="flex flex-col space-y-5">
			<h2 class="mb-8 text-2xl font-bold">
				{formType === 'login' ? 'Welcome Back' : 'Create an account'}
			</h2>
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
				class="cursor-pointer rounded-lg bg-white/90 p-2 text-sm text-black disabled:opacity-50"
				disabled={email.length <= 0 || password.length <= 0}
				type="submit"
				use:sfx
			>
				{formType.toUpperCase()}
			</button>
			<button
				class="text-xs font-bold underline"
				type="reset"
				onclick={() => switchFormType()}
				use:sfx
			>
				{formType === 'login' ? 'Create an account' : 'Login'}
			</button>
		</form>
	</div>
</div>
