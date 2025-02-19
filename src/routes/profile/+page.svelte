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
	let imagePreview: string | null = null;

	function handleUpload() {
		uploading = true;
		return async ({ update }: { update: () => Promise<void> }) => {
			await update();
			uploading = false;
			profileState = 0;
			await location.reload();
		};
	}

	function handleImageChange(event: Event) {
		const input = event.target as HTMLInputElement;
		if (input.files && input.files[0]) {
			const reader = new FileReader();
			reader.onload = (e) => {
				imagePreview = e.target?.result as string;
			};
			reader.readAsDataURL(input.files[0]);
		}
	}

	$: posts = posts;
	let profileState = 0; // 0 = profile, 1 = upload post
	$: profileState = posts.length > 0 ? 0 : 1;
</script>

<main class="min-h-screen bg-gradient-to-b from-amber-50 to-orange-100">
	<div class="container mx-auto px-4 sm:px-6 py-5">
		<div class="mx-auto flex max-w-xl sm:px-8 items-center justify-between">
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
					class="flex gap-2 hover:underline  py-2 text-amber-900 font-semibold rounded-lg transition-colors  underline-offset-4"
				>
					<p>Logout</p>
					<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#78350f" viewBox="0 0 256 256"><path d="M120,216a8,8,0,0,1-8,8H48a8,8,0,0,1-8-8V40a8,8,0,0,1,8-8h64a8,8,0,0,1,0,16H56V208h56A8,8,0,0,1,120,216Zm109.66-93.66-40-40a8,8,0,0,0-11.32,11.32L204.69,120H112a8,8,0,0,0,0,16h92.69l-26.35,26.34a8,8,0,0,0,11.32,11.32l40-40A8,8,0,0,0,229.66,122.34Z"></path></svg>
				</button>
			</form>
		</div>
		{#if profileState === 0}
			{#if posts.length === 0}
				<p class="text-center text-sm text-gray-500">No posts yet. Create one!</p>
			{:else}
				{#each posts as post}
					<div>
					<TimelinePost {post} />
				</div>
				{/each}
			{/if}
		{:else}
			<form
				method="POST"
				enctype="multipart/form-data"
				action="?/uploadPost"
				class="mx-auto mt-8 flex max-w-lg flex-col gap-6"
				use:enhance={handleUpload}
			>
				<div>
					<label for="image" class="block text-sm font-medium text-gray-700">Image</label>
					<div class="relative w-full h-32">
						<input
							type="file"
							id="image"
							name="image"
							accept=".jpg, .jpeg, .png, .webp"
							required
							on:change={handleImageChange}
							class="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
						/>
						<div class="absolute inset-0 flex items-center justify-center border-2 border-dashed border-amber-500/40 rounded-lg hover:border-amber-500 transition-colors overflow-hidden">
							{#if imagePreview}
								<img src={imagePreview} alt="Preview" class="object-cover w-full h-full" />
							{:else}
								<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#78350f" viewBox="0 0 256 256">
									<path d="M224,128a8,8,0,0,1-8,8H136v80a8,8,0,0,1-16,0V136H40a8,8,0,0,1,0-16h80V40a8,8,0,0,1,16,0v80h80A8,8,0,0,1,224,128Z"></path>
								</svg>
							{/if}
						</div>
					</div>
				</div>

				<div>
					<label for="cheeseType" class="block text-sm font-medium text-gray-700">Cheese Type</label>
					<input
						type="text"
						id="cheeseType"
						name="cheeseType"
						required
						class="p-2 w-full bg-transparent border-b-2 border-amber-500/40 focus:border-amber-500 focus:outline-none"
					/>
				</div>

				<div>
					<label for="title" class="block text-sm font-medium text-gray-700">Title</label>
					<input type="text" id="title" name="title" required           class="p-2 w-full bg-transparent border-b-2 border-amber-500/40 focus:border-amber-500 focus:outline-none"
					/>
				</div>

				<div>
					<label for="rating" class="block text-sm font-medium text-gray-700">Rating (1-5)</label>
					<input
						type="number"
						id="rating"
						name="rating"
						min=".5"
						max="5"
						step="0.5"
						required
						inputmode="decimal"
						class="p-2 w-full bg-transparent border-b-2 border-amber-500/40 focus:border-amber-500 focus:outline-none"
					/>
				</div>

				<div>
					<label for="winePairing" class="block text-sm font-medium text-gray-700">Wine Pairing (Optional)</label>
					<input
						type="text"
						id="winePairing"
						name="winePairing"
						class="p-2 w-full bg-transparent border-b-2 border-amber-500/40 focus:border-amber-500 focus:outline-none"
					/>
				</div>

				<div>
					<label for="comment" class="block text-sm font-medium text-gray-700">Caption (Optional)</label>
					<textarea id="comment" name="comment" class="p-2 w-full bg-transparent border-b-2 border-amber-500/40 focus:border-amber-500 focus:outline-none"></textarea>
				</div>

				<button type="submit" class="rounded bg-amber-600 px-4 py-2 text-white hover:bg-amber-700">
					{uploading ? 'Creating...' : 'Create Post'}
				</button>
			</form>
		{/if}
	</div>
</main>
