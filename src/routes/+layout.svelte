<script lang="ts">
	import '../app.css';
	import Navbar from '../components/Navbar.svelte';
	let { data, children } = $props();
</script>

<svelte:head>
	<title>Cheddarboxd</title>
</svelte:head>

<Navbar username={data.username} />
{@render children()}
<div class="text-center pb-5 text-neutral-900/60 text-sm bg-orange-100">
    Created by <a href="https://joemmalatesta.com" class="underline underline-offset-2 hover:underline-offset-4 transition-all">Joe Malatesta</a>
</div>
