<script lang="ts">
	export let data;
	import { enhance } from '$app/forms';
	import TimelinePost from '../../components/TimelinePost.svelte';
	import type { Post } from '../../types/post';
	let posts = data.posts.map((post) => ({
		...post,
		rating: Number(post.rating)
	})) as Post[];
	import { page } from '$app/stores';
	const username = $page.params.profile;


</script>

<main class="min-h-screen bg-gradient-to-b from-amber-50 to-orange-100">
	<div class="container mx-auto px-4 py-8">
		<div class="mx-auto flex max-w-xl items-center justify-center">
			<h2 class="text-2xl font-bold text-amber-800 text-center">{username[0].toUpperCase() + username.slice(1)}'s profile</h2>
		</div>
			{#each posts as post}
				<div>
					<TimelinePost {post} />
				</div>
			{/each}
	</div>
</main>
