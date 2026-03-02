<script>
	import DateTime from '$lib/components/DateTime.svelte'
	import RadioPlayer from '$lib/components/radio/RadioPlayer.svelte'
</script>

<main class="relative grid"></main>
<footer class="lef-0 fixed right-0 bottom-0 z-20 w-screen px-[5vw] py-12">
	<div>
		<RadioPlayer />
		<DateTime />
	</div>
</footer>
