import { SupabaseClient } from "../utils/singleton";
import { IStorage } from "./IStorage";
const imageToBase64 = require('image-to-base64');


export class SupabaseStorage implements IStorage {
    getImageUrlByName(name: string): string {
        return process.env.SUPABASE_IMAGE_URL + '/' + process.env.SUPABASE_BUCKET + '/' + process.env.SUPABASE_IMAGE_FOLDER + '/' + name
    }

    async upload(image_name: string, image: Buffer): Promise<{ success: boolean; code: number; message: string | null; data: any; }> {

        const supabase = SupabaseClient.getInstance()

        const { data, error } = await supabase
            .storage
            .from(process.env.SUPABASE_BUCKET)
            .upload(process.env.SUPABASE_IMAGE_FOLDER + '/' + image_name, image, {
                cacheControl: '3600',
                upsert: false,
                contentType: 'image/webp'
            })

        if (error) {
            return { success: false, code: 500, message: "Could not upload image", data: error }
        }

        return { success: true, code: 200, message: "uploaded successfully", data }

    }
    async download(image_name: string): Promise<{ success: boolean; code: number; message: string | null; data: any; }> {

        const url = this.getImageUrlByName(image_name)

        const downloadPromise = () => new Promise((resolve, reject) => {
            imageToBase64(url) // Image URL
                .then(
                    (response: any) => {

                        if (response.length < 200) reject('cannot get image')
                        const base64image = response
                        resolve(base64image)
                    }
                )
                .catch(
                    (error: any) => {
                        console.log(error);

                        reject(error)
                    }
                )
        })

        let base64image
        try {
            base64image = await downloadPromise()
        } catch (error) {
            return { success: false, code: 400, data: error, message: "Could not download the image" }
        }

        return { success: true, code: 200, message: "downloaded successfully", data: { base64image } }
    }

}