<script lang="ts">
    export let form;
	import { enhance } from '$app/forms';
    import { goto } from '$app/navigation';
    // TODO: add more options
    const profilePics: string[] = ["1.svg", "2.svg", "3.svg"];
    let selectedPic: string = "1.svg";

    async function handleSubmit(event: any) {
        return async ({ result }: { result: any }) => {
            if (result.status == 200) {
                await goto('/profile', { invalidateAll: true });
            }
        };
    }
</script>

<main class="min-h-screen bg-gradient-to-b pt-10 from-amber-50 to-orange-100">
<div class="w-full max-w-md mx-auto p-6">
    <div class="text-center mb-8">
      <h1 class="text-2xl font-bold text-gray-800">Come get your cheese on</h1>
    </div>

    <form method="POST" class="space-y-4" use:enhance={handleSubmit}>
    <p class="text-sm font-medium text-gray-600">Profile Picture</p>
    <div class="flex gap-4 items-center">
        {#each profilePics as pic}
            <label class="cursor-pointer">
                <input 
                    type="radio" 
                    name="profilePic" 
                    value={pic}
                    class="hidden peer"
                    bind:group={selectedPic}
                    required
                />
                <div class="w-20 h-20 rounded-full hover:ring-2 hover:ring-amber-500/40 transition-all peer-checked:ring-2 peer-checked:ring-amber-600/40 flex items-center justify-center">
                    <img 
                        src={`profilePics/${pic}`} 
                        alt="Profile Pic Option" 
                        class="p-2"
                    />
                </div>
            </label>
        {/each}
    </div>
      <div>
        <label for="username" class="block text-sm font-medium text-gray-600">Username</label>
        <input
          type="username"
          id="username"
          name="username"
          required
          class="p-2 w-full bg-transparent border-b-2 border-amber-500/40 focus:border-amber-500 focus:outline-none"
        />
      </div>

      <div>
        <label for="password" class="block text-sm font-medium text-gray-600">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          required
          class="p-2 w-full bg-transparent border-b-2 border-amber-500/40 focus:border-amber-500 focus:outline-none"
        />
      </div>

      {#if form?.error}
        <p class="text-red-500 text-sm">{form.error}</p>
      {/if}

      <div class="flex gap-4">
        <button
          type="submit"
          name="action"
          value="login"
          class="flex-1 bg-amber-600 text-white py-2 px-4 rounded-md hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
        >
          Sign Up
        </button>
      </div>
    </form>
  </div>
</main>