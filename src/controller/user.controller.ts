import { NextFunction, Request, Response } from 'express';
import { User } from '../entity/User';
import { CreateKeycloakUser, ExchangeKeycloakCodeWithToken, GetAccessToken, GetUserEmailFromKeycloakToken } from '../handler/keycloak.handler';
import {
    AssignUserAccessUpdateParams,
    AssignUserCreateParams,
    AssignUserUpdateParams,
    AuthenticatePassword,
    CreateUserToken,
    EnableUser,
    FindUsers,
    GenerateOtpAndExpiry,
    GetUser,
    GetUserByEmail,
    ParseSingleUser,
    ParseUsersList,
    SaveUser,
    TestHandler,
    UpdateUser,
    UpdateUserPassword,
    VerifyOtp
} from '../handler/user.handler';
import { generateHashFromString } from '../utils/functions';
import { createChain, TransactionManager } from '../utils/handler';


export const testHandler = async (req: Request, res: Response) => {

    const params = {}
    const results = await createChain([
        new TestHandler()
    ]).handle(params)
    res.status(results.code).json(results)
}

export const userLoginHandler = async (req: Request, res: Response) => {

    const params = { userEmail: req.body.email, password: generateHashFromString(req.body.password) }
    const results = await createChain([
        new TransactionManager(),
        new GetUserByEmail(),
        new AuthenticatePassword(),
        new CreateUserToken(),
    ]).handle(params)
    res.status(results.code).json(results)
}

export const updatePasswordWithOtp = async (req: Request, res: Response) => {

    const params = { userEmail: req.body.email, otp: req.body.otp, password: generateHashFromString(req.body.password) }
    const results = await createChain([
        new TransactionManager(),
        new GetUserByEmail(),
        new VerifyOtp(),
        new UpdateUserPassword(),
        new UpdateUser(),
        new ParseSingleUser()
    ]).handle(params)
    res.status(results.code).json(results)
}

export const verifyOtpHandler = async (req: Request, res: Response) => {

    const params = { userEmail: req.body.email, otp: req.body.otp }
    const results = await createChain([
        new TransactionManager(),
        new GetUserByEmail(),
        new VerifyOtp(),
        new ParseSingleUser(),
    ]).handle(params)
    res.status(results.code).json(results)
}

export const forgetPasswordHandler = async (req: Request, res: Response) => {

    const params = { userEmail: req.body.email }
    const results = await createChain([
        new TransactionManager(),
        new GetUserByEmail(),
        new GenerateOtpAndExpiry(),
        new UpdateUser(),
        new ParseSingleUser(),
    ]).handle(params)
    res.status(results.code).json(results)
}

export const enableUserHandler = async (req: Request, res: Response) => {

    const params = { userId: req.params.id }
    const results = await createChain([
        new TransactionManager(),
        new GetUser(),
        new EnableUser(),
        new UpdateUser(),
        new ParseSingleUser(),

    ]).handle(params)
    res.status(results.code).json(results)
}

export const loginWithCode = async (req: Request, res: Response) => {

    const code = req.body.code
    const params = { code }
    const results = await createChain([
        new ExchangeKeycloakCodeWithToken(),
        new GetUserEmailFromKeycloakToken(),
        new GetUserByEmail(),
        new CreateUserToken()

    ]).handle(params)
    res.status(results.code).json(results)
}

export const findUserHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {

    const params = {}
    const results = await createChain([
        new FindUsers(),
        new ParseUsersList()
    ]).handle(params)
    res.status(results.code).json(results)
};


export const getUserHandler = async (req: Request, res: Response, next: NextFunction) => {

    const params = { userId: req.params.id }
    const results = await createChain([
        new GetUser(),
        new ParseSingleUser(),

    ]).handle(params)
    res.status(results.code).json(results)
}

export const createUserHandler = async (req: Request, res: Response, next: NextFunction) => {

    const name = req.body.name
    const username = req.body.username
    const email = req.body.email
    const password = generateHashFromString(req.body.password)
    const password_hash = password
    const phone = req.body.phone
    const role = req.body.role
    const privileges = req.body.privileges

    const user = new User()

    const params = { user, name, email, username, password, phone, role, privileges, password_hash }
    const results = await createChain([
        new TransactionManager(),
        new AssignUserCreateParams(),
        new SaveUser(),
        new ParseSingleUser(),

        // new GetAccessToken(),
        // new CreateKeycloakUser(),
    ]).handle(params)

    if (!results.success) {
        res.status(results.code).json(results)
        return
    }
    res.status(201).json(results)
}

export const updateUserHandler = async (req: Request, res: Response, next: NextFunction) => {

    const userId = req.params.id
    const name = req.body.name
    const phone = req.body.phone

    const params = { userId, name, phone }
    const results = await createChain([
        new TransactionManager(),
        new GetUser(),
        new AssignUserUpdateParams(),
        new UpdateUser(),
        new ParseSingleUser(),

    ]).handle(params)
    res.status(results.code).json(results)

}

export const updateUserAccessHandler = async (req: Request, res: Response, next: NextFunction) => {

    const userId = req.params.id
    const role = req.body.role
    const privileges = req.body.privileges

    const params = { userId, role, privileges }
    const results = await createChain([
        new TransactionManager(),
        new GetUser(),
        new AssignUserAccessUpdateParams(),
        new UpdateUser(),
        new ParseSingleUser(),

    ]).handle(params)
    res.status(results.code).json(results)

}

export const deleteUserHandler = async (req: Request, res: Response, next: NextFunction) => {

    const params = { id: req.params.id }
    const results = await createChain([
        new TestHandler()
    ]).handle(params)
    res.status(results.code).json(results)

}
