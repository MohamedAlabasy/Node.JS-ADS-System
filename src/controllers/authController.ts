import { Request, Response, NextFunction } from 'express';
import { UserModels } from '../models/userModels'


const newUser = new UserModels()
// #=======================================================================================#
// #			                            Register                                       #
// #=======================================================================================#
export const create = async (request: Request, response: Response, next: NextFunction) => {
    await newUser.create(request)
        .then(userData => {
            response.json({
                status: 1,
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
