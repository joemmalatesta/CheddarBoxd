<script lang="ts">
	import '../app.css';
	import Navbar from '../components/Navbar.svelte';
	let { children } = $props();
</script>

<svelte:head>
	<title>Cheddarboxd</title>
</svelte:head>

<Navbar />
{@render children()}
