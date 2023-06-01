import { QueryRunner } from "typeorm"
import { Allotment, PlotType, SizeCategory } from "../entity/Allotment"
import { BaseHandler } from "../utils/handler"


export class AssignUpdatePlotParams extends BaseHandler {
    async handle(params: any) {

        const plot: Allotment = params.plot
        const new_plot = params.new_plot

        Object.assign(plot, new_plot)

        const nextHandlerResponse = await this.callNextHandler(params)
        return nextHandlerResponse
    }

}

export class GetPlot extends BaseHandler {
    async handle(params: any) {

        const plot_id = params.plot_id

        const queryRunner: QueryRunner = params.queryRunner
        const plotRepository = queryRunner.manager.getRepository(Allotment)

        const plot = await plotRepository.findOneBy({ id: plot_id })

        if (!plot) {
            return { success: false, code: 404, message: "Plot(s) not found!", data: {} }

        }

        params.plot = plot

        const nextHandlerResponse = await this.callNextHandler(params)
        nextHandlerResponse.data['allotment'] = plot
        return nextHandlerResponse
    }

}


export class ParsePlots extends BaseHandler {
    async handle(params: any) {

        const plots = params.plots
        plots.forEach((plot: any) => {
            plot.plot_type = PlotType[plot.plot_type]
            plot.size_category = SizeCategory[plot.size_category]
        })

        const nextHandlerResponse = await this.callNextHandler(params)
        return nextHandlerResponse
    }

}

export class IndexPlots extends BaseHandler {
    async handle(params: any) {

        const queryRunner: QueryRunner = params.queryRunner
        const plotRepository = queryRunner.manager.getRepository(Allotment)

        const plots = await plotRepository.find()
        if (!plots || plots.length == 0) {
            return { success: false, code: 404, message: "Plot(s) not found!", data: {} }
        }
        params.plots = plots

        const nextHandlerResponse = await this.callNextHandler(params)
        nextHandlerResponse.data['allotments'] = plots
        nextHandlerResponse.data['plot_types'] = PlotType
        nextHandlerResponse.data['size_categories'] = SizeCategory
        return nextHandlerResponse
    }

}

export class CreatePlot extends BaseHandler {
    async handle(params: any) {

        const plot: Allotment = params.plot

        const queryRunner: QueryRunner = params.queryRunner
        const plotRepository = queryRunner.manager.getRepository(Allotment)

        try {
            await plotRepository.save(plot)
        } catch (error) {
            return { success: false, code: 400, message: "Could not create a new plot", data: error }
        }

        const nextHandlerResponse = await this.callNextHandler(params)
        nextHandlerResponse.data['allotment'] = plot
        return nextHandlerResponse
    }

}

export class UpdatePlot extends BaseHandler {
    async handle(params: any) {

        const plot: Allotment = params.plot
        const plot_id = params.plot_id

        const queryRunner: QueryRunner = params.queryRunner
        const plotRepository = queryRunner.manager.getRepository(Allotment)

        try {
            await plotRepository.update({ id: plot_id }, plot)
        } catch (error) {
            return { success: false, code: 400, message: "Could not update the plot", data: error }
        }

        const nextHandlerResponse = await this.callNextHandler(params)
        return nextHandlerResponse
    }

}

export class DeletePlot extends BaseHandler {
    async handle(params: any) {


        const nextHandlerResponse = await this.callNextHandler(params)
        nextHandlerResponse.data['name'] = 'delete plot'
        return nextHandlerResponse
    }

}

