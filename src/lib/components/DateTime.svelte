<script lang="ts">
	let { timezone = 'America/Toronto' } = $props()

	let hours = $state('00')
	let minutes = $state('00')
	let seconds = $state('00')

	$effect(() => {
		const updateTime = () => {
			const now = new Date()

			const formatter = new Intl.DateTimeFormat('en-US', {
				timeZone: timezone,
				hour: '2-digit',
				minute: '2-digit',
				second: '2-digit',
				hour12: false
			})

			const parts = formatter.formatToParts(now)
			hours = parts.find((p) => p.type === 'hour')?.value || '00'
			minutes = parts.find((p) => p.type === 'minute')?.value || '00'
			seconds = parts.find((p) => p.type === 'second')?.value || '00'
		}

		// Run once immediately so UI doesn't show '00' for the first second
		updateTime()

		// Update every second
		const interval = setInterval(updateTime, 1000)

		// Cleanup the interval when the component is destroyed
		return () => clearInterval(interval)
	})
</script>

<div class="text-2xl font-black text-white opacity-50 transition-opacity hover:opacity-100">
	<span>{hours}</span>:<span>{minutes}</span>:<span>{seconds}</span>
</div>
