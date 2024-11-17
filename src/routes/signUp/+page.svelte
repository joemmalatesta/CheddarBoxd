<script lang="ts">
	import { enhance } from '$app/forms';
</script>

<div class="min-h-screen bg-amber-50 flex items-center justify-center">
	<div class="bg-white p-8 rounded-lg shadow-md w-96">
		<h1 class="text-3xl font-bold text-amber-600 text-center mb-6">Join Cheddarboxd</h1>
		<p class="text-gray-600 text-center mb-8">Start your cheese journey today</p>

		<form method="POST" use:enhance class="space-y-6">
			<div>
				<label for="username" class="block text-sm font-medium text-gray-700 mb-1">
					Username
				</label>
				<input
					type="text"
					id="username"
					name="username"
					class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
					required
				/>
			</div>

			<div>
				<label for="password" class="block text-sm font-medium text-gray-700 mb-1">
					Password
				</label>
				<input
					type="password"
					id="password"
					name="password"
					class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
					required
				/>
			</div>

			<button
				type="submit"
				class="w-full bg-amber-600 text-white py-2 px-4 rounded-md hover:bg-amber-700 transition-colors"
			>
				Sign Up
			</button>
		</form>

		<p class="mt-4 text-center text-sm text-gray-600">
			Already have an account?
			<a href="/login" class="text-amber-600 hover:text-amber-700">Log in</a>
		</p>
	</div>
</div>
