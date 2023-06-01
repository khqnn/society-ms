import express from 'express';
import { createPlotHandler, deletePlotHandler, getPlotHandler, indexPlotsHandler, updatePlotHandler } from '../controller/allotment.controller';

import { validate } from '../middleware/validate';
import { createPlotParams, deletePlotParams, getPlotParams, indexPlotParams, updatePlotParams } from '../schema/allotment.schema';

const router = express.Router();

// router.use(deserializeUser, requireUser);

router
    .route('/:id')
    .get(validate(getPlotParams), getPlotHandler)
    .put(validate(updatePlotParams), updatePlotHandler)
    .delete(validate(deletePlotParams), deletePlotHandler)


router
    .route('/')
    .post(validate(createPlotParams), createPlotHandler)
    .get(validate(indexPlotParams), indexPlotsHandler);




export default router;

