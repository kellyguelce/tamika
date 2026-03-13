<script lang="ts">
	import { fly } from 'svelte/transition'

	interface Props {
		message: string
		type: 'error' | 'success' | 'info'
		href?: string
	}

	let { message, href, type }: Props = $props()
</script>

<div
	class="lef-0 fixed top-0 z-100 w-screen p-2 text-sm text-white opacity-90"
	class:bg-red-500={type === 'error'}
	in:fly
>
	{message}
</div>
