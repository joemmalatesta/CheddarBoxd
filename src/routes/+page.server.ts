import { fail, json, type Actions } from "@sveltejs/kit";
import { pinata } from "$lib/server/pinata";
export const load = async () => {

    try {
        // const files = await pinata.pin.list({
        //     status: 'pinned',
        //     pageLimit: 100,
        //     metadata: {
        //         keyvalues: {
        //             type: { value: 'image', op: 'eq' }
        //         }
        //     }
        // });
        
        // const images = await Promise.all(
        //     files.rows.map(async (file: {ipfs_pin_hash: string}) => {
        //         const url = await pinata.gateways.createSignedURL({
        //             cid: file.ipfs_pin_hash,
        //             expires: 360
        //         });
        //         return {
        //             cid: file.ipfs_pin_hash,
        //             url
        //         };
        //     })
        // );
        
        // return { images };
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
