import { PinataSDK } from "pinata";
import { PINATA_JWT } from "$env/static/private";
import { PUBLIC_GATEWAY_URL } from "$env/static/public";
import { redirect, type Actions } from "@sveltejs/kit";
import bcrypt from 'bcrypt';

const pinata = new PinataSDK({
	pinataJwt: PINATA_JWT,
	pinataGateway: PUBLIC_GATEWAY_URL,
});

export const actions = {
	default: async ({ request, cookies }) => {
		console.log('creating new user')
		const formData = await request.formData();
		const username = formData.get('username') as string;
		const password = formData.get('password') as string;
		const profilePic = formData.get('profilePic') as string;

		// Basic validation
		if (!username || !password || !profilePic) {
			return {
				status: 400,
				error: 'All fields are required'
			};
		}

		try {            
			// Hash the password
			const saltRounds = 10;
			const hashedPassword = await bcrypt.hash(password, saltRounds);

			// Create user data object
			const userData = {
				username,
				password: hashedPassword,
				profilePic
			};

			// Create new user group
			const group = await pinata.groups.create({
				name: username,
				isPublic: true
			});

			// Upload user data as JSON
			const upload = await pinata.upload.json(userData)
				.group(group.id)
				.addMetadata({
					name: "userData",
					keyvalues: {
						type: 'user_data'
					}
				});

			// Set user cookie
			cookies.set('username', username, { path: '/' });
            cookies.set('group', group.id, { path: '/' });
            
            return {
                user: {
                    username: userData.username,
                    profilePic: userData.profilePic
                }
            };
		} catch (error) {
			console.log('Error creating user:', error);
			return {
				status: 500,
				error: 'Failed to create user'
			};
		}
	}
} satisfies Actions;