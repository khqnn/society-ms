import { QueryRunner } from "typeorm"
import { Allotment, PlotType, SizeCategory } from "../entity/Allotment"
import { BaseHandler } from "../utils/handler"
import { Agent } from "../entity/Agent"

const parseAllotment = (plot: any) => {
    const allotment = {
        id: plot.id,
        number_of_owners: plot.number_of_owners,
        block: plot.block,
        details: {
            "note_number": plot.note_number,
            "plot_number": plot.plot_number,
            "block": plot.block,
            "kanal": plot.kanal,
            "marla": plot.marla,
            "square_yard": plot.square_yard,
            "corner": plot.corner,
            "completion_certificate": plot.completion_certificate,
            "court_case": plot.court_case,
            "plot_type": plot.plot_type,
            "size_category": plot.size_category,
            "attachment": plot.attachment,
        },
        allotee: {
            "member_share": plot.member_share,
            "full_name": plot.full_name,
            "cnic_no": plot.cnic_no,
            "relationship_type": plot.relationship_type,
            "guardian_name": plot.guardian_name,
            "date_of_birth": plot.date_of_birth,
            "gender": plot.gender,
            "address": plot.address,
            "city": plot.city,
            "email": plot.email,
            "phone_no": plot.phone_no,
            "photo": plot.photo,
            "cnic_front": plot.cnic_front,
            "cnic_back": plot.cnic_back,
        },
        costing: {
            "rate_per_marla": plot.rate_per_marla,
            "development_charges": plot.development_charges,
            "special_adjustment": plot.special_adjustment,
            "rebait_amount": plot.rebait_amount,
            "dealer_commision": plot.dealer_commision,
            "installments": plot.installments,
        },
        agent: {
            "agent_name": plot.agent?.agent_name,
            "agent_cnic": plot.agent?.agent_cnic,
            "agent_phone": plot.agent?.agent_phone,
        }

    }

    return allotment
}


export class AssignUpdatePlotParams extends BaseHandler {
    async handle(params: any) {

        const plot: Allotment = params.plot
        const new_plot = params.new_plot

        Object.assign(plot, new_plot)

        const nextHandlerResponse = await this.callNextHandler(params)
        return nextHandlerResponse
    }

}

export class AssignAgentToPlot extends BaseHandler {
    async handle(params: any) {

        const plot: Allotment = params.plot
        const agent: Agent = params.agent

        plot.agent = agent

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
        nextHandlerResponse.data['allotment'] = parseAllotment(plot)
        return nextHandlerResponse
    }

}


export class ParsePlots extends BaseHandler {
    async handle(params: any) {

        const plots = params.plots
        const allotments: any[] = []

        for (let plot of plots) {
            allotments.push(parseAllotment(plot))
        }

        // plots.forEach((plot: any) => {
        //     plot.plot_type = PlotType[plot.plot_type]
        //     plot.size_category = SizeCategory[plot.size_category]
        // })

        const nextHandlerResponse = await this.callNextHandler(params)
        nextHandlerResponse.data['allotments'] = allotments
        return nextHandlerResponse
    }

}

export class PrepareQueryFilter extends BaseHandler {
    async handle(params: any) {

        const where: any = {}

        const block = params.block
        if(params.block){
            where.block = block
        }



        params.where = where

        
        const nextHandlerResponse = await this.callNextHandler(params)
        return nextHandlerResponse
    }

}

export class IndexPlots extends BaseHandler {
    async handle(params: any) {

        const queryRunner: QueryRunner = params.queryRunner
        const plotRepository = queryRunner.manager.getRepository(Allotment)

        const where: any = params.where

        const plots = await plotRepository.find({
            where,
            relations: {agent: true}
        })
        
        if (!plots || plots.length == 0) {
            return { success: false, code: 404, message: "Plot(s) not found!", data: {} }
        }
        params.plots = plots

        const nextHandlerResponse = await this.callNextHandler(params)
        // nextHandlerResponse.data['allotments'] = plots
        // nextHandlerResponse.data['plot_types'] = PlotType
        // nextHandlerResponse.data['size_categories'] = SizeCategory
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

