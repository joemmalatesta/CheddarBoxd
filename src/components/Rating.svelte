<script lang="ts">
  export let rating: number;

  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const emptyStars = 5 - Math.ceil(rating);
</script>

<div class="flex gap-0.5">
  {#each Array(fullStars) as _}
    <img src="full-star.svg" alt="full star" class="w-10">
  {/each}

  {#if hasHalfStar}
    <img src="half-star.svg" alt="Half star" class="w-10">
  {/if}

  <!-- {#each Array(emptyStars) as _}
    <img src="empty-star.svg" alt="Empty Star" class="w-10">
  {/each} -->
</div>
