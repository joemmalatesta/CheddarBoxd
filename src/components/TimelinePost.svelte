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

<div class="max-w-lg mx-auto bg-white rounded-lg shadow-md overflow-hidden my-5">
  <!-- User Info -->
  {#if post.postedByImg && post.postedBy}
  <div class="p-4 flex items-center justify-between">
    <a href={`/${post.postedBy}`} class="flex items-center gap-3">
      <div class="w-10 h-10 rounded-full flex items-center justify-center">

        <img 
        src={`profilePics/${post.postedByImg}`} 
        alt={post.postedBy}
        class="object-cover p-1.5 flex items-center justify-center"
        />
      </div>
      <span class="font-medium">{post.postedBy}</span>
    </a>
      <span class="text-sm text-gray-500">{getTimeAgo(new Date(post.postedAt))}</span>
    </div>
  {/if}

  <!-- Image -->
  <div class="w-full aspect-square max-h-[400px]">
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
