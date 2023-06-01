import { AppDataSource } from "../data-source"

export abstract class BaseHandler {
    nextHandler?: BaseHandler

    async callNextHandler(params: any): Promise<{ success: boolean, code: number, data: any, message: string | null }> {

        if (this.nextHandler) {
            return await this.nextHandler.handle(params)
        }
        return { success: true, code: 200, data: {}, message: "" }
    }

    abstract handle(params: any): Promise<{ success: boolean, code: number, data: any, message: string | null }>
}


export class TransactionManager extends BaseHandler {
    async handle(params: any) {

        const queryRunner = AppDataSource.createQueryRunner()
        await queryRunner.connect()
        await queryRunner.startTransaction()


        params.queryRunner = queryRunner
        const nextHandlerResponse = await this.callNextHandler(params)

        if (!nextHandlerResponse.success) {
            queryRunner.rollbackTransaction()

        }
        else {
            queryRunner.commitTransaction()
        }

        return nextHandlerResponse
    }

}

export const createChain = (handlers: BaseHandler[]) => {
    const n = handlers.length
    for (let i = 1; i < n; i++) {
        handlers[i - 1].nextHandler = handlers[i]
    }

    return handlers[0]
}