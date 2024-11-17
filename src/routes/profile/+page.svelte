<script lang="ts">
	export let data;
	import { enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import TimelinePost from '../../components/TimelinePost.svelte';
	import type { Post } from '../../types/post';
	let posts = data.posts.map((post) => ({
		...post,
		rating: Number(post.rating)
	})) as Post[];
	let uploading = false;
	function handleUpload() {
		uploading = true;
		return async ({ update }: { update: () => Promise<void> }) => {
			await update();
			uploading = false;
			profileState = 0;
			await invalidateAll();
		};
	}
	$: posts = posts;
	let profileState = 0; // 0 = profile, 1 = upload post
	$: profileState = posts.length > 0 ? 0 : 1;
</script>

<main class="min-h-screen bg-gradient-to-b from-amber-50 to-orange-100">
	<div class="container mx-auto px-4 py-8">
		<div class="mx-auto flex max-w-xl items-center justify-between">
			<button 
				on:click={() => (profileState = 0)} 
				class="w-1/3 py-2 text-amber-900 font-semibold hover:underline rounded-lg transition-colors {profileState == 0 ? 'underline' : ''}  underline-offset-4"
			>
				Your Posts
			</button>
			<button 
				on:click={() => (profileState = 1)} 
				class="w-1/3 py-2 text-amber-900 font-semibold hover:underline rounded-lg transition-colors {profileState == 1 ? 'underline' : ''}  underline-offset-4"
			>
				New Post
			</button>
			<form class="w-1/3" method="POST" action="?/logout">
				<button 
					type="submit"
					class="w-full py-2 text-amber-900 font-semibold hover:underline rounded-lg transition-colors  underline-offset-4"
				>
					Logout
				</button>
			</form>
		</div>
		{#if profileState === 0}
			{#each posts as post}
				<div>
					<TimelinePost {post} />
				</div>
			{/each}
		{:else}
			<form
				method="POST"
				enctype="multipart/form-data"
				action="?/uploadPost"
				class="mx-auto mt-8 flex max-w-lg flex-col gap-4"
				use:enhance={handleUpload}
			>
				<div>
					<label for="image" class="block">Image</label>
					<input
						type="file"
						id="image"
						name="image"
						accept=".jpg, .jpeg, .png, .webp"
						required
						class="w-full rounded border p-2"
					/>
				</div>

				<div>
					<label for="cheeseType" class="block">Cheese Type</label>
					<input
						type="text"
						id="cheeseType"
						name="cheeseType"
						required
						class="w-full rounded border p-2"
					/>
				</div>

				<div>
					<label for="title" class="block">Title</label>
					<input type="text" id="title" name="title" required class="w-full rounded border p-2" />
				</div>

				<div>
					<label for="rating" class="block">Rating (1-5)</label>
					<input
						type="number"
						id="rating"
						name="rating"
						min="1"
						max="5"
						required
						class="w-full rounded border p-2"
					/>
				</div>

				<div>
					<label for="winePairing" class="block">Wine Pairing (Optional)</label>
					<input
						type="text"
						id="winePairing"
						name="winePairing"
						class="w-full rounded border p-2"
					/>
				</div>

				<div>
					<label for="comment" class="block">Comment (Optional)</label>
					<textarea id="comment" name="comment" class="w-full rounded border p-2"></textarea>
				</div>

				<button type="submit" class="rounded bg-amber-600 px-4 py-2 text-white hover:bg-amber-700">
					{uploading ? 'Creating...' : 'Create Post'}
				</button>
			</form>
		{/if}
	</div>
</main>
