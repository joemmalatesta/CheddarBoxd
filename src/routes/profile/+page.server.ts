import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ cookies }) => {
    const userId = cookies.get('userId');
    if (!userId) {
        throw redirect(303, '/login');
    }

    return {
        userId
    };
};
