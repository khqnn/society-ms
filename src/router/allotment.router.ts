import express from 'express';
import { createPlotHandler, deletePlotHandler, getPlotHandler, indexPlotsHandler, updatePlotAgentHandler, updatePlotHandler } from '../controller/allotment.controller';

import { validate } from '../middleware/validate';
import { createPlotParams, deletePlotParams, getPlotParams, indexPlotParams, updateAllotteeParams, updateCostingParams, updatePlotParams } from '../schema/allotment.schema';

const router = express.Router();

// router.use(deserializeUser, requireUser);

router
    .route('/:id')
    .get(validate(getPlotParams), getPlotHandler)
    .put(validate(updatePlotParams), updatePlotHandler)
    .delete(validate(deletePlotParams), deletePlotHandler)

router.put('/:id/details', validate(updatePlotParams), updatePlotHandler)
router.put('/:id/allottee', validate(updateAllotteeParams), updatePlotHandler)
router.put('/:id/costing', validate(updateCostingParams), updatePlotHandler)
// router.put('/:id/agent', updatePlotHandler)
router.put('/:allotment_id/agent/:agent_id', updatePlotAgentHandler)


router
    .route('/')
    .post(validate(createPlotParams), createPlotHandler)
    .get(validate(indexPlotParams), indexPlotsHandler);




export default router;

