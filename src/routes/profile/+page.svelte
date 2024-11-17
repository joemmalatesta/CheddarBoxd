<script lang="ts">
	export let data;
	import { enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import TimelinePost from '../../components/TimelinePost.svelte';
	import type { Post } from '../../types/post';
	let posts = data.posts.map(post => ({
		...post,
		rating: Number(post.rating)
	})) as Post[];
	let uploading = false;
	function handleUpload() {
		uploading = true;
		return async ({ update }: { update: () => Promise<void> }) => {
			await update();
			uploading = false;
		};
	}
	let profileState = 0; // 0 = profile, 1 = upload post
</script>

{#if profileState === 0}
	{data.username}
	<div
		class="flex h-20 w-20 items-center justify-center rounded-full transition-all hover:ring-2 hover:ring-amber-500 peer-checked:ring-2 peer-checked:ring-amber-600"
	>
		<img src={`profilePics/${data.profilePic}`} alt="Profile Pic Option" class="p-2" />
	</div>

	<form method="POST" action="?/logout">
		<button type="submit">Logout</button>
	</form>

	{#each posts as post}
		<div>
			<TimelinePost {post} />
		</div>
	{/each}

	<button
		class="rounded bg-amber-600 px-4 py-2 text-white hover:bg-amber-700"
		on:click={() => (profileState = 1)}
	>
		Create Post
	</button>
{:else}
	<button
		class="mb-4 rounded bg-amber-600 px-4 py-2 text-white hover:bg-amber-700"
		on:click={async () => {
			profileState = 0;
			await invalidateAll();
		}}
	>
		Back to Profile
	</button>

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
			<input type="text" id="winePairing" name="winePairing" class="w-full rounded border p-2" />
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
