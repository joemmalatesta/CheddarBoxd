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
