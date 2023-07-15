import { QueryRunner } from "typeorm"
import { BaseHandler } from "../utils/handler"
import { Agent } from "../entity/Agent"

export class IndexAgent extends BaseHandler {
    async handle(params: any) {

        const queryRunner: QueryRunner = params.queryRunner
        const agentRespository = queryRunner.manager.getRepository(Agent)

        const agents = await agentRespository.find()
        if (!agents || agents.length == 0) {
            return { success: false, code: 404, message: "agents not found", data: {} }
        }
        params.agents = agents

        const nextHandlerResponse = await this.callNextHandler(params)
        nextHandlerResponse.data['agents'] = agents
        return nextHandlerResponse
    }

}

export class GetAgent extends BaseHandler {
    async handle(params: any) {

        const agent_id = params.agent_id
        const queryRunner: QueryRunner = params.queryRunner
        const agentRespository = queryRunner.manager.getRepository(Agent)

        const agent = await agentRespository.findOneBy({ id: agent_id })
        if (!agent) {
            return { success: false, code: 404, message: "agent not found", data: {} }
        }

        params.agent = agent

        const nextHandlerResponse = await this.callNextHandler(params)
        nextHandlerResponse.data['agent'] = agent
        return nextHandlerResponse
    }

}

export class CreateAgent extends BaseHandler {
    async handle(params: any) {

        const agent: Agent = params.agent

        const queryRunner: QueryRunner = params.queryRunner
        const agentRespository = queryRunner.manager.getRepository(Agent)

        try {
            await agentRespository.save(agent)
        } catch (error) {
            return { success: false, code: 500, message: 'Could not create agent', data: String(error) }
        }


        const nextHandlerResponse = await this.callNextHandler(params)
        return nextHandlerResponse
    }

}

export class AssignUpdateAgentParams extends BaseHandler {
    async handle(params: any) {

        const agent: Agent = params.agent
        const new_agent = params.new_agent

        Object.assign(agent, new_agent)

        const nextHandlerResponse = await this.callNextHandler(params)
        return nextHandlerResponse
    }

}

export class UpdateAgent extends BaseHandler {
    async handle(params: any) {
        const agent: Agent = params.agent

        const agent_id = params.agent_id
        const queryRunner: QueryRunner = params.queryRunner
        const agentRespository = queryRunner.manager.getRepository(Agent)

        try {
            await agentRespository.update({ id: agent_id }, agent)
        } catch (error) {
            return { success: false, code: 500, message: 'Could not update agent', data: String(error) }
        }


        const nextHandlerResponse = await this.callNextHandler(params)
        return nextHandlerResponse
    }

}

export class DeleteAgent extends BaseHandler {
    async handle(params: any) {

        const agent_id = params.agent_id

        const queryRunner: QueryRunner = params.queryRunner
        const agentRespository = queryRunner.manager.getRepository(Agent)

        try {
            await agentRespository.delete({id: agent_id})
        } catch (error) {
            return { success: false, code: 500, message: 'Could not create agent', data: String(error) }
        }

        const nextHandlerResponse = await this.callNextHandler(params)
        return nextHandlerResponse
    }

}