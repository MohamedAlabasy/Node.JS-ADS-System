import { Request, Response, NextFunction } from 'express';

import { UserModels } from '../models/userModels'
import { EmailVerificationModels } from '../models/emailVerificationModels'

const newUser = new UserModels()
const emailVerification = new EmailVerificationModels()
// #=======================================================================================#
// #			                            Register                                       #
// #=======================================================================================#
export const register = async (request: Request, response: Response, next: NextFunction) => {
    await newUser.register(request)
        .then(userData => {
            response.json({
                status: 1,
                data: {
                    id: userData.id,
                    email: userData.email,
                    first_name: userData.first_name,
                    last_name: userData.last_name,
                    is_verification: userData.is_verification,
                    msg: `The code has been sent to your email 👉 ${userData.email}`
                }
            })
        }).catch(error => {
            next(error)
        })
}

// #=======================================================================================#
// #			                            login                                          #
// #=======================================================================================#
export const login = async (request: Request, response: Response, next: NextFunction) => {
    await newUser.login(request)
        .then(userData => {
            response.json({
                status: 1,
                token: userData.token,
                data: {
                    id: userData.id,
                    email: userData.email,
                    first_name: userData.first_name,
                    last_name: userData.last_name,
                    is_verification: userData.is_verification
                }
            })
        }).catch(error => {
            next(error)
        })
}

// #=======================================================================================#
// #			                      activate User email                                  #
// #=======================================================================================#
export const activateUserEmail = async (request: Request, response: Response, next: NextFunction) => {
    await emailVerification.activateUserEmail(request)
        .then(_ => {
            response.json({
                status: 1,
                data: {
                    status: 1,
                    data: 'email activate successful',
                }
            })
        }).catch(error => {
            next(error)
        })
}
// #=======================================================================================#
// #			                       get User by id                                      #
// #=======================================================================================#
export const show = async (request: Request, response: Response, next: NextFunction) => {
    await newUser.show(request)
        .then(userData => {
            response.json({
                status: 1,
                token: userData.token,
                data: {
                    id: userData.id,
                    email: userData.email,
                    first_name: userData.first_name,
                    last_name: userData.last_name,
                    is_verification: userData.is_verification
                }
            })
        }).catch(error => {
            next(error)
        })
}

// #=======================================================================================#
// #			                            logout                                         #
// #=======================================================================================#
export const logout = async (request: Request, response: Response, next: NextFunction) => {
    await newUser.logout(request)
        .then(_ => {
            response.json({
                status: 1,
                data: 'logout successful'
            })
        }).catch(error => {
            next(error)
        })
}



