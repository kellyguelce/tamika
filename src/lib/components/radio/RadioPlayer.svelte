<script lang="ts">
	import { Play } from 'lucide-svelte'

	function play() {}
</script>

<div>
	<button>
		<Play class="fill-white stroke-white" />
	</button>
	<audio autoplay muted>
		<source src="https://usa9.fastcast4u.com/proxy/jamz?mp=/1" />
	</audio>
</div>
