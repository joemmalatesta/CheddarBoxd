import { PinataSDK } from "pinata";
import { PINATA_JWT } from "$env/static/private";
import { PUBLIC_GATEWAY_URL } from "$env/static/public";
import { redirect, type Actions } from "@sveltejs/kit";

const pinata = new PinataSDK({
  pinataJwt: PINATA_JWT,
  pinataGateway: PUBLIC_GATEWAY_URL,
});



export const actions = {
	default: async ({ request }) => {
		const formData = await request.formData();
		const username = formData.get('username') as string;
		const password = formData.get('password');

		// Basic validation
		if (!username || !password) {
			return {
				status: 400,
				error: 'All fields are required'
			};
		}

		try {            
            // If no, create new user group in pinata
			const group = await pinata.groups.create({
                name: username,
                isPublic: true
            });
            // Add cookie of login ID

            console.log(group)
            redirect(303, '/profile')
            return 200
		} catch (error) {
            console.log(error)
			return {
				status: 500,
				error: 'Failed to create user'
			};
		}
	}
} satisfies Actions;