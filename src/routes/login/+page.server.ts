import { fail, json, redirect, type Actions } from "@sveltejs/kit";
import { pinata } from "$lib/server/pinata";
import bcrypt from 'bcrypt';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ cookies }) => {
    cookies.delete('username', { path: '/', sameSite: 'lax' });
    cookies.delete('group', { path: '/', sameSite: 'lax' });
};

interface User {
  username: string;
  password: string;
}


export const actions: Actions = {
  default: async ({ request, cookies }) => {
    try {
      const formData = await request.formData();
      const username = formData.get('username') as string;
      const password = formData.get('password') as string;

     
      const groupResponse = await pinata.groups.list().name(username);
      const group = groupResponse.groups.find(g => g.name.toLowerCase() === username.toLowerCase())?.id;
        if (!group) {
          console.log("Group not found");
            return fail(400, {
                error: true,
                message: "User not found"
            })
        }

        const userDataFile = await pinata.files.list().group(group).name('userData');
        const userData = await pinata.gateways.get(userDataFile.files[0].cid);
        const user = userData.data as unknown as User;
        if (!user) {
            console.log("User not found");
            return fail(400, {
                error: true,
                message: "User not found"
            })
        }
        // Check if password matches the hashed password stored in user data
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return fail(400, {
                error: true,
                message: "Invalid password"
            });
        }
        cookies.set('username', username, { path: '/', sameSite: 'lax' });
        cookies.set('group', group, { path: '/', sameSite: 'lax' });
        return {
          status: 200,
          user: user
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
