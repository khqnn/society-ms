import express from 'express';
import { downloadImageHandler, uploadImageHandler } from '../controller/media.controller';


const router = express.Router();

router
    .route('/upload')
    .post(uploadImageHandler)

router
    .route('/image/:image')
    .post(downloadImageHandler)


export default router;
