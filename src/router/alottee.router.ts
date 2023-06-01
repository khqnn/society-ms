import express from 'express';
import { deleteAlotteeHandler, getAlotteeHandler, indexAlotteeHandler, updateAlotteeHandler } from '../controller/alottee.controller';

import { validate } from '../middleware/validate';
import { createAlotteeParams, deleteAlotteeParams, getAlotteeParams, indexAlotteeParams, updateAlotteeParams } from '../schema/alottee.schema';

const router = express.Router();

// router.use(deserializeUser, requireUser);

router
    .route('/:id')
    .get(validate(getAlotteeParams), getAlotteeHandler)
    .put(validate(updateAlotteeParams), updateAlotteeHandler)
    .delete(validate(deleteAlotteeParams), deleteAlotteeHandler)


router
    .route('/')
    .post(validate(createAlotteeParams), deleteAlotteeHandler)
    .get(validate(indexAlotteeParams), indexAlotteeHandler);




export default router;

