<script lang="ts">
	import { page } from '$app/stores';
	export let username: string | undefined = undefined;
</script>

<nav class="w-full bg-amber-600/60 p-4">
	<div class="mx-auto flex w-2/5 items-center justify-between">
		<a
			href="/"
			class="text-white hover:text-amber-600 {$page.url.pathname === '/' ? 'font-bold' : ''}"
		>
			Cheddarboxd
		</a>
		<a
			href={username ? "/profile" : "/login"}
			class="text-white hover:text-amber-600 {$page.url.pathname === (username ? '/profile' : '/login') ? 'font-bold' : ''}"
		>
			{username || 'Login'}
		</a>
	</div>
</nav>
