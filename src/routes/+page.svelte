<script lang="ts">
	import { enhance } from '$app/forms';
	import TimelinePost from '../components/TimelinePost.svelte';
	import type { Post } from '../types/post';

	export let data: { posts: Post[] };
</script>

<main class="min-h-screen bg-gradient-to-b from-amber-50 to-orange-100">
	<div class="container mx-auto px-4 py-12">
		<header class=" text-center">
			<h1 class="mb-4 text-6xl font-bold text-amber-800">Cheddarboxd</h1>
			<p class="text-xl text-amber-700">Rate, review, and discover the world's finest cheeses</p>
		</header>

			{#each data.posts as post}
				<TimelinePost {post} />
			{/each}

	</div>
</main>
