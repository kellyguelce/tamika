<script lang="ts">
	import type { PageProps } from './$types'
	import { pbFileUrl } from '$lib/pocketbase'

	let { data }: PageProps = $props()
</script>

<div>
	<ul>
		{#each data.backgrounds as bg}
			<li>
				<button
					class="size-32 cursor-pointer overflow-hidden rounded-lg border-3 border-transparent transition-all hover:border-white"
				>
					<img src={pbFileUrl(bg, bg.file, '500x500')} alt="" class="h-full w-full" />
				</button>
			</li>
		{/each}
	</ul>
</div>
