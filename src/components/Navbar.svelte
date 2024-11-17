<script lang="ts">
	import { page } from '$app/stores';
	export let username: string | undefined = undefined;
</script>

<nav class="w-full bg-amber-800/60 p-4">
	<div class="container mx-auto sm:px-8 px-4 flex max-w-xl items-center justify-between">
		<a
			href="/"
			class="text-white text-xl {$page.url.pathname === '/' ? 'font-bold' : ''}"
		>
			Cheddarboxd
		</a>
		<a
			href={username ? "/profile" : "/login"}
			class="text-white text-xl  {$page.url.pathname === (username ? '/profile' : '/login') ? 'font-bold' : ''}"
		>
			{username || 'Login'}
		</a>
	</div>
</nav>
