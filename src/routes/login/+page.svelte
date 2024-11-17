<script lang="ts">
    import { enhance } from '$app/forms';
    import type { ActionData } from './$types';
  
    export let form: ActionData;
    let uploading = false;
  
    function handleUpload() {
      uploading = true;
        return async ({ update }: { update: () => Promise<void> }) => {
          await update();
          uploading = false;
        };
    }
  </script>

  <div class="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
    <div class="text-center mb-8">
      <h1 class="text-2xl font-bold text-gray-800">Welcome to Cheddarboxd</h1>
      <p class="text-gray-600">Please login or create an account</p>
    </div>

    <form method="POST" class="space-y-4">
      <div>
        <label for="username" class="block text-sm font-medium text-gray-700">Username</label>
        <input
          type="username"
          id="username"
          name="username"
          required
          class="p-2 w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
        />
      </div>

      <div>
        <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          required
          class="p-2 w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
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
          Login
        </button>
        <button
          type="submit"
          name="action"
          value="signup"
          class="flex-1 bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
        >
          Sign Up
        </button>
      </div>
    </form>
  </div>
  
  <main class="w-full min-h-screen m-auto flex flex-col justify-center items-center">
    <form method="POST" enctype="multipart/form-data" use:enhance={handleUpload}>
      <input type="file" id="file" name="fileToUpload" accept=".jpg, .jpeg, .png, .webp" />
      <button disabled={uploading} type="submit">
        {uploading ? 'Uploading...' : 'Upload'}
      </button>
    </form>
    {#if form && form.status === 200}
      <img src={form.url} alt={form.filename} />
    {/if}
  </main>
  
  