import { array, object, string } from 'zod';

const params = {

    params: object({
        id: string(),
    }).strict(),
};

const query = {

    query: object({
        name: string().optional(),
        email: string().optional(),
        phone: string().optional(),

    }).strict(),
}

const body = {
    body: object({
        name: string(),
        email: string(),
        username: string(),
        password: string(),
        phone: string(),
        role: string(),
        privileges: array(string())
    }).strict(),
}

const updateUserInfo = {
    body: object({
        name: string(),
        phone: string()
    }).strict()
}

const updateUserAccess = {
    body: object({
        role: string(),
        privileges: array(string())

    }).strict()
}


export const getUserParams = object({
    ...params
});
export const findUserParams = object({
    ...query
});
export const createUserParams = object({
    ...body
});
export const updateUserParams = object({
    ...updateUserInfo,
    ...params
})
export const updateUserAccessParams = object({
    ...updateUserAccess,
    ...params
})
export const deleteUserParams = object({
    ...params
})



