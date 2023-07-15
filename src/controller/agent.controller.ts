import { Agent } from "../entity/Agent"
import { AssignUpdateAgentParams, CreateAgent, DeleteAgent, GetAgent, IndexAgent, UpdateAgent } from "../handler/agent.handler"
import { createChain, TransactionManager } from "../utils/handler"
import { Request, Response } from "express"

export const indexAgentHandler = async (req: Request, res: Response) => {

    const params = {}
    const results = await createChain([
        new TransactionManager(),
        new IndexAgent(),
    ]).handle(params)
    res.status(results.code).json(results)
}

export const getAgentHandler = async (req: Request, res: Response) => {

    const params = { agent_id: req.params.id }
    const results = await createChain([
        new TransactionManager(),
        new GetAgent(),
    ]).handle(params)
    res.status(results.code).json(results)
}

export const createAgentHandler = async (req: Request, res: Response) => {

    const agent = new Agent()
    Object.assign(agent, req.body)

    const params = { agent }
    const results = await createChain([
        new TransactionManager(),
        new CreateAgent(),
    ]).handle(params)
    res.status(results.code).json(results)
}

export const updateAgentHandler = async (req: Request, res: Response) => {

    const new_agent = req.body.agent
    const agent_id = req.params.id

    const params = { new_agent, agent_id }

    const results = await createChain([
        new TransactionManager(),
        new GetAgent(),
        new AssignUpdateAgentParams(),
        new UpdateAgent(),
    ]).handle(params)
    res.status(results.code).json(results)
}

export const deleteAgentHandler = async (req: Request, res: Response) => {

    const params = {agent_id: req.params.id}
    const results = await createChain([
        new TransactionManager(),
        new DeleteAgent(),
    ]).handle(params)
    res.status(results.code).json(results)
}