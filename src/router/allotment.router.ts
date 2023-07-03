import express from 'express';
import { createPlotHandler, deletePlotHandler, getPlotHandler, indexPlotsHandler, updateAgentDetails, updateAllotteeDetails, updateCostingDetails, updatePlotHandler } from '../controller/allotment.controller';

import { validate } from '../middleware/validate';
import { createPlotParams, deletePlotParams, getPlotParams, indexPlotParams, updatePlotParams } from '../schema/allotment.schema';

const router = express.Router();

// router.use(deserializeUser, requireUser);

router
    .route('/:id')
    .get(validate(getPlotParams), getPlotHandler)
    .put(validate(updatePlotParams), updatePlotHandler)
    .delete(validate(deletePlotParams), deletePlotHandler)

router.put('/:id/details', validate(updatePlotParams), updatePlotHandler)
router.put('/:id/allottee', updateAllotteeDetails)
router.put('/:id/costing', updateCostingDetails)
router.put('/:id/agent', updateAgentDetails)


router
    .route('/')
    .post(validate(createPlotParams), createPlotHandler)
    .get(validate(indexPlotParams), indexPlotsHandler);




export default router;

