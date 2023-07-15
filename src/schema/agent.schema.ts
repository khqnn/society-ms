import { array, boolean, number, object, string } from 'zod';


export const getAgentParams = object({
    params: object({
        id: string(),
    }).strict(),
})

export const indexAgentParams = object({
    query: object({
        agent_cnic: string().optional(),

    }).strict(),
})

export const createAgentParams = object({
    body: object({
        agent_phone: string(),
        agent_name: string(),
        agent_cnic: string().optional(),


    }).strict(),
})

export const updateAgentParams = object({
    body: object({
        agent_name: string(),
        agent_cnic: string(),

    }).strict(),
    params: object({
        id: string(),
    }).strict(),
})

export const deleteAgentParams = object({
    params: object({
        id: string(),
    }).strict(),
})


