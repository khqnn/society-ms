import { randomUUID } from 'crypto';
import { NextFunction, Request, Response } from 'express';
import { StorageFactory } from '../services/StorageFactory';


export const uploadImageHandler = async (req: Request, res: Response) => {

    const image_name = randomUUID() + ".webp"
    const base64image = req.body.base64image

    const decodedImage = Buffer.from(base64image, 'base64');


    const storageClient = (new StorageFactory()).init(process.env.STORAGE_SERVICE || 'supabase')
    const uploadResults = await storageClient.upload(image_name, decodedImage)
    if (!uploadResults.success) {
        res.status(uploadResults.code).json(uploadResults)
        return;
    }

    uploadResults.data['image_name'] = image_name
    uploadResults.data['image_url'] = storageClient.getImageUrlByName(image_name)


    res.json(uploadResults)

}

export const downloadImageHandler = async (req: Request, res: Response) => {
    const image_name = req.params.image

    const storageClient = (new StorageFactory()).init(process.env.STORAGE_SERVICE || 'supabase')
    const uploadResults = await storageClient.download(image_name)
    if (!uploadResults.success) {
        res.status(uploadResults.code).json(uploadResults)
        return;
    }

    const base64image = uploadResults.data.base64image
    const img = Buffer.from(base64image, 'base64');



    res.writeHead(200, {
        'Content-Type': 'image/webp',
        'Content-Length': img.length
    });
    res.end(img);

}