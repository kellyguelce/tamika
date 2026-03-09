<script lang="ts">
	import { page } from '$app/state'

	let { children } = $props()

	interface MenuItem {
		label: string
		href: string
	}

	const menuItems: MenuItem[] = [
		{
			label: 'General',
			href: '/settings/general'
		},
		{
			label: 'Background',
			href: '/settings/backgrounds'
		}
	]

	function isCurrentPage(item: MenuItem) {
		if (page.url.pathname == item.href) return true
		return false
	}
</script>

<main class="flex h-screen w-screen items-center justify-center overflow-hidden">
	<div class="flex h-[75vh] w-4/5 rounded-lg bg-black/50 text-sm text-white/90">
		<!-- Sidebar with menu items -->
		<div class="w-1/5 bg-black/50">
			<ul class="flex flex-col">
				<li class=" p-3 font-semibold text-white/50 select-none">Settings</li>
				{#each menuItems as item (item.label)}
					<li>
						<a
							href={item.href}
							class="block p-3 transition-all hover:bg-black/30"
							class:bg-black={isCurrentPage(item)}
						>
							{item.label}
						</a>
					</li>
				{/each}
			</ul>
		</div>

		<!-- Menu content -->
		<div class="p-4">
			{@render children()}
		</div>
	</div>
</main>
