import { date, object, string } from 'zod';

const params = {

    params: object({
        id: string(),
    }).strict(),
};

const query = {
    query: object({
        full_name: string().optional(),
        guardian_name: string().optional(),
        gender: string().optional(),
        city: string().optional(),
        email: string().optional(),
        phone: string().optional(),

    }).strict(),
}

const body = {
    body: object({
        photo: string().optional(),
        cnic_front: string().optional(),
        cnic_back: string().optional(),
        member_share: string().optional(),
        full_name: string(),
        guardian_name: string(),
        date_of_birth: date(),
        relationship_type: string(),
        gender: string(),
        address: string(),
        city: string(),
        email: string(),
        phone: string(),

    }).strict(),
}


export const getAlotteeParams = object({
    ...params
});
export const indexAlotteeParams = object({
    ...query
});
export const createAlotteeParams = object({
    ...body
});
export const updateAlotteeParams = object({
    ...body,
    ...params
})
export const deleteAlotteeParams = object({
    ...params
})


