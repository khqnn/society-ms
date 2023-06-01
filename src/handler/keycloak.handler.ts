import { BaseHandler } from "../utils/handler"
const axios = require('axios');
const qs = require('qs')
const jwt = require('jsonwebtoken')

export class GetUserEmailFromKeycloakToken extends BaseHandler {
    async handle(params: any) {

        const access_token = params.access_token
        const decoded = jwt.decode(access_token, { complete: true })
        const payload = decoded.payload
        const email = payload.email

        params.userEmail = email

        const nextHandlerResponse = await this.callNextHandler(params)
        return nextHandlerResponse
    }

}

export class GetAccessToken extends BaseHandler {
    async handle(params: any) {


        const data = qs.stringify({
            'grant_type': 'client_credentials',
            'client_secret': process.env.KEYCLOAK_CLIENT_SECRETE,
            'client_id': process.env.KEYCLOAK_CLIENT_ID
        });

        const config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: process.env.KEYCLOAK_TOKEN_URL,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: data
        };

        let responseData
        try {
            const response = await axios.request(config)
            responseData = response.data

        } catch (error) {
            return { success: false, code: 400, message: String(error), data: {} }

        }

        const access_token = responseData.access_token
        params.access_token = access_token

        const nextHandlerResponse = await this.callNextHandler(params)
        return nextHandlerResponse
    }



}

export class CreateKeycloakUser extends BaseHandler {
    async handle(params: any) {

        let data = JSON.stringify({
            "username": params.username,
            "email": params.email,
            "emailVerified": true,
            "enabled": true,
            "firstName": "",
            "lastName": "",
            "credentials": [
                {
                    "type": "password",
                    "value": params.password,
                    "temporary": false
                }
            ]
        });

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: process.env.KEYCLOAK_USERS_URL,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + params.access_token
            },
            data: data
        };


        try {
            await axios.request(config)
        } catch (error) {
            return { success: false, code: 601, message: "Could not create keycloak user", data: error }
        }



        const nextHandlerResponse = await this.callNextHandler(params)
        return nextHandlerResponse
    }

}

export class ExchangeKeycloakCodeWithToken extends BaseHandler {
    async handle(params: any) {



        const data = qs.stringify({
            'code': params.code,
            'grant_type': 'authorization_code',
            'client_id': process.env.KEYCLOAK_CLIENT_ID,
            'redirect_uri': process.env.KEYCLOAK_REDIRECT_URL,
            'client_secret': process.env.KEYCLOAK_CLIENT_SECRETE,
        });

        const config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: process.env.KEYCLOAK_TOKEN_URL,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: data
        };

        let responseData
        try {
            const response = await axios.request(config)
            responseData = response.data

        } catch (error) {
            return { success: false, code: 400, message: String(error), data: {} }
        }

        const access_token = responseData.access_token
        params.access_token = access_token

        const nextHandlerResponse = await this.callNextHandler(params)
        return nextHandlerResponse
    }

}