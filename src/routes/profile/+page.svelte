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
			await location.reload();
		};
	}
	$: posts = posts;
	let profileState = 0; // 0 = profile, 1 = upload post
	$: profileState = posts.length > 0 ? 0 : 1;
</script>

<main class="min-h-screen bg-gradient-to-b from-amber-50 to-orange-100">
	<div class="container mx-auto px-6 py-5">
		<div class="mx-auto flex max-w-xl px-8 items-center justify-between">
			<div class="flex gap-5">
				<button 
				on:click={() => (profileState = 0)} 
				class=" py-2 text-amber-900 font-semibold hover:underline rounded-lg transition-colors {profileState == 0 ? 'underline' : ''}  underline-offset-4"
			>
				Your Posts
			</button>
			<button 
				on:click={() => (profileState = 1)} 
				class=" py-2 text-amber-900 font-semibold hover:underline rounded-lg transition-colors {profileState == 1 ? 'underline' : ''}  underline-offset-4"
			>
					New Post
				</button>
			</div>
			<form class="" method="POST" action="?/logout">
				<button 
					type="submit"
					class="flex gap-2 hover:underline underline-offset-4 py-2 text-amber-900 font-semibold rounded-lg transition-colors  underline-offset-4"
				>
					<p>Logout</p>
					<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#78350f" viewBox="0 0 256 256"><path d="M120,216a8,8,0,0,1-8,8H48a8,8,0,0,1-8-8V40a8,8,0,0,1,8-8h64a8,8,0,0,1,0,16H56V208h56A8,8,0,0,1,120,216Zm109.66-93.66-40-40a8,8,0,0,0-11.32,11.32L204.69,120H112a8,8,0,0,0,0,16h92.69l-26.35,26.34a8,8,0,0,0,11.32,11.32l40-40A8,8,0,0,0,229.66,122.34Z"></path></svg>
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
						step="0.5"
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
