import { randomUUID } from "crypto";
import { QueryRunner } from "typeorm";
import { AppDataSource } from "../data-source";
import { User } from "../entity/User";
import { BaseHandler } from "../utils/handler";
const jwt = require('jsonwebtoken')


export class TestHandler extends BaseHandler {
    async handle(params: any) {


        const nextHandlerResponse = await this.callNextHandler(params)
        return nextHandlerResponse
    }

}

export class ParseUsersList extends BaseHandler {
    async handle(params: any) {

        const users: User[] = params.users

        users.forEach((user: User) => {

            delete user.password
            delete user.otp
            delete user.otp_expiry
            delete user.secrete
        })


        const nextHandlerResponse = await this.callNextHandler(params)
        return nextHandlerResponse
    }

}

export class ParseSingleUser extends BaseHandler {
    async handle(params: any) {

        const user: User = params.user

        delete user.password
        delete user.otp
        delete user.otp_expiry
        delete user.secrete

        const nextHandlerResponse = await this.callNextHandler(params)
        return nextHandlerResponse
    }

}


export class AuthenticatePassword extends BaseHandler {
    async handle(params: any) {

        const user: User = params.user
        const password = params.password


        if (!user.password || user.password != password) {
            return { success: false, code: 401, message: "User is not authenticated", data: {} }
        }

        const nextHandlerResponse = await this.callNextHandler(params)
        return nextHandlerResponse
    }

}

export class UpdateUserPassword extends BaseHandler {
    async handle(params: any) {

        const user: User = params.user
        const password = params.password
        user.password = password
        user.secrete = randomUUID()

        const nextHandlerResponse = await this.callNextHandler(params)
        return nextHandlerResponse
    }

}

export class VerifyOtp extends BaseHandler {
    async handle(params: any) {

        const user: User = params.user
        const otp = params.otp


        if (!user.otp_expiry || user.otp != otp || new Date(String(user.otp_expiry)) < new Date()) {
            return { success: false, code: 401, message: "OTP is not valid", data: {} }
        }

        const nextHandlerResponse = await this.callNextHandler(params)
        return nextHandlerResponse
    }

}

export class GenerateOtpAndExpiry extends BaseHandler {
    async handle(params: any) {

        const user: User = params.user

        const otp = '1234'
        const otp_expiry = '2023-08-01'

        user.otp = otp
        user.otp_expiry = otp_expiry

        const nextHandlerResponse = await this.callNextHandler(params)
        return nextHandlerResponse
    }

}

export class EnableUser extends BaseHandler {
    async handle(params: any) {

        const user: User = params.user
        user.enabled = true

        const nextHandlerResponse = await this.callNextHandler(params)
        return nextHandlerResponse
    }

}

export class CreateUserToken extends BaseHandler {
    async handle(params: any) {

        const user: User = params.user
        const payload = {
            sub: user.id,
            role: user.role,
            privileges: user.privileges
        }

        const token = jwt.sign(payload, process.env.SECRETE, { expiresIn: Number(process.env.TOKEN_EXPIRY) })
        params.token = token

        const nextHandlerResponse = await this.callNextHandler(params)
        nextHandlerResponse.data['token'] = token
        return nextHandlerResponse
    }

}

export class AssignUserAccessUpdateParams extends BaseHandler {
    async handle(params: any) {

        const user: User = params.user
        user.role = params.role
        user.privileges = params.privileges

        params.user = user

        const nextHandlerResponse = await this.callNextHandler(params)
        return nextHandlerResponse
    }

}

export class AssignUserCreateParams extends BaseHandler {
    async handle(params: any) {

        const user: User = params.user
        user.name = params.name
        user.phone = params.phone
        user.email = params.email
        user.username = params.username
        user.role = params.role
        user.privileges = params.privileges
        user.password = params.password_hash
        user.secrete = randomUUID()

        params.user = user

        const nextHandlerResponse = await this.callNextHandler(params)
        return nextHandlerResponse
    }

}

export class AssignUserUpdateParams extends BaseHandler {
    async handle(params: any) {

        const user: User = params.user
        user.name = params.name
        user.phone = params.phone

        params.user = user

        const nextHandlerResponse = await this.callNextHandler(params)
        return nextHandlerResponse
    }

}

export class GetUserByEmail extends BaseHandler {
    async handle(params: any) {

        const userRepository = AppDataSource.getRepository(User)
        const userEmail = params.userEmail

        const user = await userRepository.findOneBy({ email: userEmail })


        if (!user) {
            return { success: false, code: 404, message: "User not found", data: {} }
        }

        params.user = user

        const nextHandlerResponse = await this.callNextHandler(params)
        nextHandlerResponse.data['user'] = user
        return nextHandlerResponse
    }

}

export class GetUser extends BaseHandler {
    async handle(params: any) {

        const userRepository = AppDataSource.getRepository(User)
        const userId = params.userId

        const user = await userRepository.findOneBy({ id: userId })

        if (!user) {
            return { success: false, code: 404, message: "User not found", data: {} }
        }

        params.user = user

        const nextHandlerResponse = await this.callNextHandler(params)
        nextHandlerResponse.data['user'] = user
        return nextHandlerResponse
    }

}


export class FindUsers extends BaseHandler {
    async handle(params: any): Promise<{ success: boolean; code: number; data: any; message: string | null; }> {

        const userRepository = AppDataSource.getRepository(User)
        const users = await userRepository.find()

        if (!users || users.length == 0) {
            return { success: false, code: 404, message: 'User not found', data: [] }
        }

        params.users = users
        const nextHandlerResponse = await this.callNextHandler(params)
        nextHandlerResponse.data['users'] = users
        return nextHandlerResponse
    }

}

export class SaveUser extends BaseHandler {
    async handle(params: any) {

        const queryRunner: QueryRunner = params.queryRunner

        const userRepository = queryRunner.manager.getRepository(User)
        const user: User = params.user



        try {
            await userRepository.save(user)
        } catch (error) {
            return { success: false, code: 400, message: String(error), data: {} }
        }

        params.user = user

        const nextHandlerResponse = await this.callNextHandler(params)
        nextHandlerResponse.data['user'] = user
        return nextHandlerResponse
    }

}



export class UpdateUser extends BaseHandler {
    async handle(params: any) {

        const queryRunner: QueryRunner = params.queryRunner


        const userRepository = queryRunner.manager.getRepository(User)
        const user: User = params.user

        try {
            if (user.id)
                await userRepository.update({ id: user.id }, user)

        } catch (error) {
            return { success: false, code: 400, message: String(error), data: {} }
        }

        const nextHandlerResponse = await this.callNextHandler(params)
        return nextHandlerResponse
    }

}

