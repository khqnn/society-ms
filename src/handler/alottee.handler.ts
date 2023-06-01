import { QueryRunner } from "typeorm"
import { Alottee } from "../entity/Alottee"
import { BaseHandler } from "../utils/handler"

export class IndexAlottee extends BaseHandler {
    async handle(params: any) {

        const queryRunner: QueryRunner = params.queryRunner
        const alotteeRespository = queryRunner.manager.getRepository(Alottee)

        const alottees = await alotteeRespository.find()
        if (!alottees || alottees.length == 0) {
            return { success: false, code: 404, message: "Alottees not found", data: {} }
        }
        params.alottees = alottees

        const nextHandlerResponse = await this.callNextHandler(params)
        nextHandlerResponse.data['alottees'] = alottees
        return nextHandlerResponse
    }

}

export class GetAlottee extends BaseHandler {
    async handle(params: any) {

        const alottee_id = params.alottee_id
        const queryRunner: QueryRunner = params.queryRunner
        const alotteeRespository = queryRunner.manager.getRepository(Alottee)

        const alottee = await alotteeRespository.findOneBy({ id: alottee_id })
        if (!alottee) {
            return { success: false, code: 404, message: "Alottee not found", data: {} }
        }

        params.alottee = alottee

        const nextHandlerResponse = await this.callNextHandler(params)
        nextHandlerResponse.data['alottee'] = alottee
        return nextHandlerResponse
    }

}

export class CreateAlottee extends BaseHandler {
    async handle(params: any) {

        const alottee: Alottee = params.alottee

        const queryRunner: QueryRunner = params.queryRunner
        const alotteeRespository = queryRunner.manager.getRepository(Alottee)

        try {
            await alotteeRespository.save(alottee)
        } catch (error) {
            return { success: false, code: 500, message: 'Could not create alottee', data: String(error) }
        }


        const nextHandlerResponse = await this.callNextHandler(params)
        return nextHandlerResponse
    }

}

export class UpdateAlottee extends BaseHandler {
    async handle(params: any) {
        const alottee: Alottee = params.alottee

        const alottee_id = params.alottee_id
        const queryRunner: QueryRunner = params.queryRunner
        const alotteeRespository = queryRunner.manager.getRepository(Alottee)

        try {
            await alotteeRespository.update({ id: alottee_id }, alottee)
        } catch (error) {
            return { success: false, code: 500, message: 'Could not update alottee', data: String(error) }
        }


        const nextHandlerResponse = await this.callNextHandler(params)
        return nextHandlerResponse
    }

}

export class DeleteAlottee extends BaseHandler {
    async handle(params: any) {


        const nextHandlerResponse = await this.callNextHandler(params)
        return nextHandlerResponse
    }

}