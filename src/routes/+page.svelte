<script lang="ts">
	import DateTime from '$lib/components/DateTime.svelte'
	import Pomodoro from '$lib/components/pomodoro/Pomodoro.svelte'
	import RadioPlayer from '$lib/components/radio/RadioPlayer.svelte'
	import SettingMenuFloating from '$lib/components/settings/SettingMenuFloating.svelte'
	import type { PageProps } from './$types'
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
