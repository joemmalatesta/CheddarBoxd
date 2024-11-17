<script lang="ts">
    import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
  
    async function handleSubmit(event: any) {
        return async ({ result }: { result: any }) => {
            if (result.status == 200) {
                goto('/profile', { invalidateAll: true });
            }
        };
    }
  </script>

<main class="min-h-screen bg-gradient-to-b pt-6 from-amber-50 to-orange-100">
  <div class="w-full max-w-md mx-auto p-6">
    <div class="text-center mb-8">
      <h1 class="text-2xl font-bold text-amber-800">Login to Cheddarboxd</h1>
      <p class="text-gray-600">Please login or <a href="/signup" class="text-amber-600 hover:underline">create an account</a></p>
    </div>

    <form method="POST" class="space-y-4" use:enhance={handleSubmit}>
      <div>
        <label for="username" class="block text-sm font-medium text-gray-700">Username</label>
        <input
          type="username"
          id="username"
          name="username"
          required
          class="p-2 w-full bg-transparent border-b-2 border-amber-500/40 focus:border-amber-500 focus:outline-none"
        />
      </div>

      <div>
        <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          required
          class="p-2 bg-transparent w-full border-b-2 border-amber-500/40 focus:border-amber-500 focus:outline-none"
        />
      </div>

      <div class="flex gap-4">
        <button
          type="submit"
          name="action"
          value="login"
          class="flex-1  bg-amber-600 text-white py-2 px-4 rounded-md hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
        >
          Login
        </button>
      </div>
    </form>
  </div>
</main> 