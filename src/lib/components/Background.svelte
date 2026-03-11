<script>
	import { BackgroundStore } from '$lib/modules/background/background.svelte'
	import { fade } from 'svelte/transition'
</script>

<div class="fixed inset-0 z-0 h-screen w-screen">
	{#if BackgroundStore.background.animated}
		<video
			src={BackgroundStore.backgroundUrl}
			class="h-full w-full object-cover"
			autoplay
			// out:fade
			// in:fade
			disablepictureinpicture
			disableremoteplayback
		>
			<track kind="captions" />
		</video>
	{:else}
		<img
			in:fade
			src={BackgroundStore.backgroundUrl}
			alt={BackgroundStore.background.name}
			class="h-full w-full object-cover"
		/>
	{/if}
</div>
