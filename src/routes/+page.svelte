<script lang="ts">
	import DateTime from '$lib/components/DateTime.svelte'
	import RadioPlayer from '$lib/components/radio/RadioPlayer.svelte'
	import type { PageProps } from './$types'
</script>

<main class="relative grid"></main>
<footer class="lef-0 fixed right-0 bottom-0 z-20 grid w-screen grid-cols-2 px-[4vw] py-8">
	<div class="flex">
		<RadioPlayer />
	</div>
	<div class="flex justify-end">
		<DateTime />
	</div>
</footer>
