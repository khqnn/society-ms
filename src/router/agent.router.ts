import express from 'express';

import { validate } from '../middleware/validate';
import { createAgentHandler, deleteAgentHandler, getAgentHandler, indexAgentHandler, updateAgentHandler } from '../controller/agent.controller';
import { createAgentParams, deleteAgentParams, getAgentParams, indexAgentParams, updateAgentParams } from '../schema/agent.schema';

const router = express.Router();


router
    .route('/:id')
    .get( validate(getAgentParams), getAgentHandler)
    .put(validate(updateAgentParams), updateAgentHandler)
    .delete( validate(deleteAgentParams), deleteAgentHandler)


router
    .route('/')
    .post( validate(createAgentParams), createAgentHandler)
    .get( validate(indexAgentParams), indexAgentHandler);




export default router;

