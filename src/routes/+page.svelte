<script lang="ts">
	import DateTime from '$lib/components/DateTime.svelte'
	import Pomodoro from '$lib/components/pomodoro/Pomodoro.svelte'
	import RadioPlayer from '$lib/components/radio/RadioPlayer.svelte'
	import AuthForm from '$lib/components/settings/AuthForm.svelte'
	import BackgroundSettings from '$lib/components/settings/BackgroundSettings.svelte'
	import Room from '$lib/components/settings/Room.svelte'
	import SettingMenuFloating from '$lib/components/settings/SettingMenuFloating.svelte'
	import UserProfile from '$lib/components/settings/UserProfile.svelte'
	import { SettingBox } from '$lib/modules/settings/settings.defs'
	import { SettingsStore } from '$lib/modules/settings/settings.svelte'
	import { pocketbase } from '$lib/pocketbase/pocketbase'

	const settings = SettingsStore
</script>

<main class="relative grid">
	<div class="fixed top-8 right-[4vw]">
		<SettingMenuFloating />
	</div>
	<div class="fixed top-8 left-[4vw]">
		<Pomodoro />
	</div>
</main>
<footer class="lef-0 fixed right-0 bottom-0 z-20 grid w-screen grid-cols-2 px-[4vw] py-8">
	<div class="flex">
		<RadioPlayer />
	</div>
	<div class="flex justify-end">
		<DateTime />
	</div>
</footer>

{#if settings.currentSettingsBox == SettingBox.Background}
	<BackgroundSettings />
{:else if settings.currentSettingsBox == SettingBox.Auth}
	{#if pocketbase.authStore.isValid}
		<UserProfile />
	{:else}
		<AuthForm />
	{/if}
{:else if settings.currentSettingsBox == SettingBox.Room}
	<Room />
{/if}
