import { createChain, TransactionManager } from "../utils/handler"
import { Request, Response } from "express"
import { AssignAgentToPlot,  AssignUpdatePlotParams, CreatePlot, DeletePlot, GetPlot, IndexPlots, ParsePlots, PrepareQueryFilter, UpdatePlot } from "../handler/allotment.handler"
import { Allotment } from "../entity/Allotment"
import { GetAgent } from "../handler/agent.handler"

export const indexPlotsHandler = async (req: Request, res: Response) => {

    const params = req.query
    const results = await createChain([
        new TransactionManager(),
        new PrepareQueryFilter(),
        new IndexPlots(),
        new ParsePlots()
    ]).handle(params)
    res.status(results.code).json(results)
}

export const getPlotHandler = async (req: Request, res: Response) => {

    const params = { plot_id: req.params.id }
    const results = await createChain([
        new TransactionManager(),
        new GetPlot()
    ]).handle(params)
    res.status(results.code).json(results)
}

export const createPlotHandler = async (req: Request, res: Response) => {

    const plot = new Allotment()
    Object.assign(plot, req.body)

    // plot.plot_type = Number(PlotType[plot.plot_type])
    // plot.size_category = Number(SizeCategory[plot.size_category])


    const params = { plot }
    const results = await createChain([
        new TransactionManager(),
        new CreatePlot()
    ]).handle(params)

    if (!results.success) {
        res.status(results.code).json(results)
        return
    }
    res.status(201).json(results)
}

export const updatePlotHandler = async (req: Request, res: Response) => {

    const new_plot = req.body
    const plot_id = req.params.id

    const params = { plot_id, new_plot }
    const results = await createChain([
        new TransactionManager(),
        new GetPlot(),
        new AssignUpdatePlotParams(),
        new UpdatePlot()
    ]).handle(params)
    res.status(results.code).json(results)
}

export const updatePlotAgentHandler = async (req: Request, res: Response) => {

    const agent_id = req.params.agent_id
    const plot_id = req.params.allotment_id

    const params = { plot_id, agent_id }
    const results = await createChain([
        new TransactionManager(),
        new GetPlot(),
        new GetAgent(),
        new AssignAgentToPlot(),
        new UpdatePlot()
    ]).handle(params)
    res.status(results.code).json(results)
}

export const deletePlotHandler = async (req: Request, res: Response) => {

    const params = {}
    const results = await createChain([
        new DeletePlot()
    ]).handle(params)
    res.status(results.code).json(results)
}