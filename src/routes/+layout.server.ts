import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ cookies }) => {
    const username = cookies.get('username');   
    const group = cookies.get('group');
    return {
        username,
        group
    };
};
