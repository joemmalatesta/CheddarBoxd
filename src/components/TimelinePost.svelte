<script lang="ts">
	import Rating from './Rating.svelte';
	import type { Post } from '../types/post';

	export let post: Post;

	// Add function to format the timestamp
	function getTimeAgo(date: Date): string {
		const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);

		const intervals = {
			year: 31536000,
			month: 2592000,
			week: 604800,
			day: 86400,
			hour: 3600,
			minute: 60
		};

		for (const [unit, secondsInUnit] of Object.entries(intervals)) {
			const interval = Math.floor(seconds / secondsInUnit);
			if (interval >= 1) {
				return interval === 1 ? `1 ${unit} ago` : `${interval} ${unit}s ago`;
			}
		}

		return 'just now';
	}
</script>

<div class="mx-auto my-5 max-w-lg overflow-hidden rounded-lg bg-white shadow-md">
	<!-- User Info -->
	{#if post.postedByImg && post.postedBy}
		<div class="flex items-center justify-between p-4">
			<a href={`/${post.postedBy}`} class="flex items-center gap-3">
				<div class="flex h-10 w-10 items-center justify-center rounded-full">
					<img
						src={`profilePics/${post.postedByImg}`}
						alt={post.postedBy}
						class="flex items-center justify-center object-cover p-1.5"
					/>
				</div>
				<span class="font-medium">{post.postedBy}</span>
			</a>
			<span class="text-sm text-gray-500">{getTimeAgo(new Date(post.postedAt))}</span>
		</div>
	{/if}

	<!-- Image -->
	<div class="aspect-square max-h-[400px] w-full">
		<img src={post.imageUrl} alt={post.title} class="h-full w-full object-cover" />
	</div>

	<!-- Content -->
	<div class="space-y-3 p-4">
		<!-- Type and Title -->
		<div>
			<span class="text-sm uppercase tracking-wider text-gray-500">{post.cheeseType}</span>
			<h2 class="text-xl font-semibold">{post.title}</h2>
		</div>

		<!-- Rating -->
		<div class="flex items-center">
			<Rating rating={post.rating} />
		</div>

		<!-- Wine Pairing -->
		{#if post.winePairing}
			<div class="flex items-center gap-2">
				<img src="wine.svg" alt="Wine pairing" class="h-6 w-6" />
				<span class="text-gray-700">{post.winePairing}</span>
			</div>
		{/if}

		<p>{post.comment}</p>
	</div>
</div>
