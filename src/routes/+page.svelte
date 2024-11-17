<script lang="ts">
	import { enhance } from '$app/forms';
	import TimelinePost from '../components/TimelinePost.svelte';
	import type { Post } from '../types/post';
	import Rating from '../components/Rating.svelte';

	const examplePost: Post = {
		imageUrl: '',
		cheeseType: 'sigma',
		winePairing: 'Cabernet',
		rating: 3.5,
		title: 'Cheese from the cheese shop type shit'
	};
</script>

<main class="min-h-screen bg-gradient-to-b from-amber-50 to-orange-100">
	<div class="container mx-auto px-4 py-16">
		<header class="mb-16 text-center">
			<h1 class="mb-4 text-6xl font-bold text-amber-800">Cheddarboxd</h1>
			<p class="text-xl text-amber-700">Rate, review, and discover the world's finest cheeses</p>
		</header>

		<TimelinePost post={examplePost} />

		<div class="grid items-center gap-12 md:grid-cols-2">
			<div class="space-y-6">
				<h2 class="text-4xl font-bold text-amber-800">Track Your Cheese Journey</h2>
				<p class="text-lg text-amber-700">
					Join a community of cheese enthusiasts. Rate your favorite cheeses, discover new
					varieties, and share your tasting notes with fellow cheese lovers.
				</p>
				<div class="space-x-4">
					<a
						href="/login"
						class="inline-block rounded-lg bg-amber-600 px-6 py-3 text-white transition hover:bg-amber-700"
					>
						Get Started
					</a>
					<a
						href="/browse"
						class="inline-block rounded-lg border-2 border-amber-600 px-6 py-3 text-amber-600 transition hover:bg-amber-50"
					>
						Browse Cheeses
					</a>
				</div>
			</div>

			<div class="grid grid-cols-2 gap-4">
				<div class="transform rounded-lg bg-white p-4 shadow-lg transition hover:scale-105">
					<h3 class="font-bold text-amber-800">Aged Cheddar</h3>
					<div class="mt-2 flex items-center">
						<span class="text-amber-500">★★★★★</span>
						<span class="ml-2 text-sm text-gray-600">4.8/5</span>
					</div>
				</div>
				<div class="transform rounded-lg bg-white p-4 shadow-lg transition hover:scale-105">
					<h3 class="font-bold text-amber-800">Brie</h3>
					<div class="mt-2 flex items-center">
						<span class="text-amber-500">★★★★☆</span>
						<span class="ml-2 text-sm text-gray-600">4.2/5</span>
					</div>
				</div>
				<div class="transform rounded-lg bg-white p-4 shadow-lg transition hover:scale-105">
					<h3 class="font-bold text-amber-800">Gouda</h3>
					<div class="mt-2 flex items-center">
						<Rating rating={3.5} />
						<span class="ml-2 text-sm text-gray-600">3.5/5</span>
					</div>
				</div>
				<div class="transform rounded-lg bg-white p-4 shadow-lg transition hover:scale-105">
					<h3 class="font-bold text-amber-800">Blue Cheese</h3>
					<div class="mt-2 flex items-center">
						<span class="text-amber-500">★★★★☆</span>
						<span class="ml-2 text-sm text-gray-600">4.3/5</span>
					</div>
				</div>
			</div>
		</div>

		<section class="mt-24 text-center">
			<h2 class="mb-8 text-3xl font-bold text-amber-800">Why Cheddarboxd?</h2>
			<div class="grid gap-8 md:grid-cols-3">
				<div class="rounded-lg bg-white p-6 shadow-lg">
					<h3 class="mb-3 text-xl font-bold text-amber-700">Track Your Tastings</h3>
					<p class="text-amber-600">Keep a personal diary of every cheese you try and rate them</p>
				</div>
				<div class="rounded-lg bg-white p-6 shadow-lg">
					<h3 class="mb-3 text-xl font-bold text-amber-700">Discover New Cheeses</h3>
					<p class="text-amber-600">
						Get personalized recommendations based on your taste preferences
					</p>
				</div>
				<div class="rounded-lg bg-white p-6 shadow-lg">
					<h3 class="mb-3 text-xl font-bold text-amber-700">Join the Community</h3>
					<p class="text-amber-600">
						Connect with other cheese enthusiasts and share your experiences
					</p>
				</div>
			</div>
		</section>
	</div>
</main>
