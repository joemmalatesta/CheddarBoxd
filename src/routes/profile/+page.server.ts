import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { PinataSDK } from "pinata";
import { PINATA_JWT } from "$env/static/private";
import { PUBLIC_GATEWAY_URL } from "$env/static/public";
import type { Post } from '../../types/post';

interface User {
    username: string;
    profilePic: string;
}

const pinata = new PinataSDK({
    pinataJwt: PINATA_JWT,
    pinataGateway: PUBLIC_GATEWAY_URL,
});

export const load: PageServerLoad = async ({ cookies }) => {
    const username = cookies.get('username');
    const group = cookies.get('group');
    if (!username || !group) {
        throw redirect(303, '/login');
    }

    try {
        // Fetch user data from Pinata using metadata
        const userDataFile = await pinata.files.list().group(group).name('userData');
        const userData = await pinata.gateways.get(userDataFile.files[0].cid);
        const user = userData.data as unknown as User;
        if (!user) {
            throw redirect(303, '/login');
        }

        // Fetch all posts from the group
        const postsData = await pinata.files.list().group(group).name('post');
        
        // Transform posts data to include gateway URLs and metadata
        const posts = await Promise.all(postsData.files.map(async post => {
            const imageUrl = await pinata.gateways.createSignedURL({
                cid: post.cid,
                expires: 20000,
                gateway: PUBLIC_GATEWAY_URL
            });

            return {
                imageUrl,
                title: post.keyvalues.title,
                cheeseType: post.keyvalues.cheeseType,
                rating: post.keyvalues.rating,
                winePairing: post.keyvalues.winePairing,
                comment: post.keyvalues.comment,
            };
        }));

        console.log(posts);
       
        return {
            username: user.username,
            profilePic: user.profilePic,
            posts
        };
    } catch (error) {
        console.error('Error fetching user data:', error);
        throw redirect(303, '/login');
    }
};


import { fail, type Actions } from '@sveltejs/kit';

export const actions = {
    uploadPost: async ({ request, cookies }) => {
        const group = cookies.get('group');
        if (!group) {
            console.log("No group");
            throw redirect(303, '/login');
        }
        const data = await request.formData();
        const uploadedFile = (data?.get('image') as File);
        const title = data.get('title') as string;
        const cheeseType = data.get('cheeseType') as string;
        const rating = data.get('rating') as string;
        const winePairing = data.get('winePairing') as string;
        const comment = data.get('comment') as string;
        
        if (!uploadedFile.name || uploadedFile.size === 0) {
            console.log("No file");
            return fail(400, {
              error: true,
              message: "You must provide a file to upload"
            })
        }


        try {

            const upload = await pinata.upload.file(uploadedFile).group(group).addMetadata({
                name: 'post',
                keyvalues: {
                    title, cheeseType, rating, winePairing, comment
                }
            });
            console.log(upload);

            
            return {
                status: 200,
                message: "Post uploaded"
            };
        } catch (error) {
            console.error('Error uploading post:', error);
            return fail(500, {
                error: true,
                message: "Failed to upload post"
            });
        }
    },
	logout: async ({ cookies }) => {
		try {
			cookies.delete('username', { path: '/' });
			cookies.delete('group', { path: '/' });
			throw redirect(303, '/login');
		} catch (error) {
			console.error('Error logging out:', error);
			return fail(500, {
				error: true,
				message: "Failed to logout"
			});
		}
	}
} satisfies Actions;
