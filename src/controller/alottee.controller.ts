import { createChain, TransactionManager } from "../utils/handler"
import { Request, Response } from "express"
import { CreateAlottee, DeleteAlottee, GetAlottee, IndexAlottee, UpdateAlottee } from "../handler/alottee.handler"

export const indexAlotteeHandler = async (req: Request, res: Response) => {

    const params = {}
    const results = await createChain([
        new TransactionManager(),
        new IndexAlottee(),
    ]).handle(params)
    res.status(results.code).json(results)
}

export const getAlotteeHandler = async (req: Request, res: Response) => {

    const params = {}
    const results = await createChain([
        new TransactionManager(),
        new GetAlottee(),
    ]).handle(params)
    res.status(results.code).json(results)
}

export const createAlotteeHandler = async (req: Request, res: Response) => {

    const params = {}
    const results = await createChain([
        new TransactionManager(),
        new CreateAlottee(),
    ]).handle(params)
    res.status(results.code).json(results)
}

export const updateAlotteeHandler = async (req: Request, res: Response) => {

    const params = {}
    const results = await createChain([
        new TransactionManager(),
        new UpdateAlottee(),
    ]).handle(params)
    res.status(results.code).json(results)
}

export const deleteAlotteeHandler = async (req: Request, res: Response) => {

    const params = {}
    const results = await createChain([
        new TransactionManager(),
        new DeleteAlottee(),
    ]).handle(params)
    res.status(results.code).json(results)
}