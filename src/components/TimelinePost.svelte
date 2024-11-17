<script lang="ts">
  import Rating from './Rating.svelte';
  import type { Post } from '../types/post';

  export let post: Post;  
</script>

<div class="max-w-xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
  <!-- Image -->
  <div class="w-full aspect-square">
    <img 
      src={post.imageUrl} 
      alt={post.title}
      class="w-full h-full object-cover"
    />
  </div>

  <!-- Content -->
  <div class="p-4 space-y-3">
    <!-- Type and Title -->
    <div>
      <span class="text-sm text-gray-500 uppercase tracking-wider">{post.cheeseType}</span>
      <h2 class="text-xl font-semibold">{post.title}</h2>
    </div>

    <!-- Rating -->
    <div class="flex items-center">
      <Rating rating={post.rating} />
    </div>

    <!-- Wine Pairing -->
    <div class="flex items-center gap-2">
      <img src="wine.svg" alt="Wine pairing" class="w-6 h-6" />
      <span class="text-gray-700">{post.winePairing}</span>
    </div>

    <p>{post.comment}</p>
  </div>
</div>
