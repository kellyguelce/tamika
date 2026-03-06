<script lang="ts">
	interface Props {
		message: string
		type: 'error' | 'success' | 'info'
		href?: string
	}

	let { message, href, type }: Props = $props()
</script>

<div
	class="lef-0 fixed top-0 z-100 w-screen p-2 text-sm text-white"
	class:bg-red-500={type === 'error'}
>
	{message}
</div>
