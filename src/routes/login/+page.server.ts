import { fail, json, redirect, type Actions } from "@sveltejs/kit";
import { pinata } from "$lib/server/pinata";

import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ cookies }) => {
    cookies.delete('username', { path: '/' });
    cookies.delete('group', { path: '/' });
};


export const actions: Actions = {
  default: async ({ request }) => {
    try {
      const formData = await request.formData();
      const username = formData.get('username') as string;
      const password = formData.get('password') as string;
     
      const userFiles = await pinata.files.list()
        .metadata({
          type: 'user_data',
          username: username
        });

        return {
          status: 200,
          user: userFiles
        };
    }
    catch (error) {
      console.log(error);
      return fail(500, {
        error: true,
        message: "Internal Server Error"
      })
    }
  }
}
