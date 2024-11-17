import { fail, json, type Actions } from "@sveltejs/kit";
import { pinata } from "$lib/server/pinata";
export const load = async () => {
    try {
        // Fetch all posts across all groups
        const postsData = await pinata.files.list().name('post');
  
        // Transform posts data to include gateway URLs and metadata
        const posts = await Promise.all(postsData.files.map(async post => {
            const url = await pinata.gateways.createSignedURL({
                cid: post.cid,
                expires: 20000
            });
            


            return {
                imageUrl: url,
                title: post.keyvalues.title,
                cheeseType: post.keyvalues.cheeseType,
                rating: post.keyvalues.rating,
                winePairing: post.keyvalues.winePairing,
                comment: post.keyvalues.comment,
                postedAt: post.created_at,
                postedBy: post.keyvalues.postedBy,
                postedByImg: post.keyvalues.postedByImg
            };
        }));

        return {
            posts
        };
    } catch (error) {
        console.error('Error fetching images:', error);
        return {
            images: []
        };
    }
}

export const actions: Actions = {
  default: async ({ request }) => {
    try {
      const formData = await request.formData();
      const uploadedFile = (formData?.get('fileToUpload') as File);

      if (!uploadedFile.name || uploadedFile.size === 0) {
        return fail(400, {
          error: true,
          message: "You must provide a file to upload"
        })
      }

      const upload = await pinata.upload.file(uploadedFile);
      const url = await pinata.gateways.createSignedURL({
        cid: upload.cid,
        expires: 360
      });
      return { url, filename: uploadedFile.name, status: 200 };
    } catch (error) {
      console.log(error);
      return json(
        { error: "Internal Server Error" },
        { status: 500 }
      );
    }
  }
}
