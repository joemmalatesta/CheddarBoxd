<script>
	import { page } from '$app/stores';
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
			href="/profile"
			class="text-white hover:text-amber-600 {$page.url.pathname === '/profile' ? 'font-bold' : ''}"
		>
			Profile
		</a>
	</div>
</nav>
