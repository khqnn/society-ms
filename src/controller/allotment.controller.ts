import { createChain, TransactionManager } from "../utils/handler"
import { Request, Response } from "express"
import { AssignUpdateAgentParams, AssignUpdateAllotteeParams, AssignUpdateCostingParams, AssignUpdatePlotParams, CreatePlot, DeletePlot, GetPlot, IndexPlots, ParsePlots, UpdatePlot } from "../handler/allotment.handler"
import { Allotment } from "../entity/Allotment"

export const updateAgentDetails = async (req: Request, res: Response) => {
    const agent_details = req.body
    const plot_id = req.params.id

    const params = { plot_id, agent_details }
    const results = await createChain([
        new TransactionManager(),
        new GetPlot(),
        new AssignUpdateAgentParams(),
        new UpdatePlot()
    ]).handle(params)
    res.status(results.code).json(results)
}

export const updateCostingDetails = async (req: Request, res: Response) => {
    const costing_details = req.body
    const plot_id = req.params.id

    const params = { plot_id, costing_details }
    const results = await createChain([
        new TransactionManager(),
        new GetPlot(),
        new AssignUpdateCostingParams(),
        new UpdatePlot()
    ]).handle(params)
    res.status(results.code).json(results)
}

export const updateAllotteeDetails = async (req: Request, res: Response) => {
    const allottee_details = req.body
    const plot_id = req.params.id

    const params = { plot_id, allottee_details }
    const results = await createChain([
        new TransactionManager(),
        new GetPlot(),
        new AssignUpdateAllotteeParams(),
        new UpdatePlot()
    ]).handle(params)
    res.status(results.code).json(results)
}

export const indexPlotsHandler = async (req: Request, res: Response) => {

    const params = {}
    const results = await createChain([
        new TransactionManager(),
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

export const deletePlotHandler = async (req: Request, res: Response) => {

    const params = {}
    const results = await createChain([
        new DeletePlot()
    ]).handle(params)
    res.status(results.code).json(results)
}