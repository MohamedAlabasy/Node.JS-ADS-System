import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Request } from 'express';

import Client from '../database';

import validateRequest from '../utilities/validateRequest';


export type users = {
    id: number,
    email: string,
    first_name: string,
    last_name: string,
    password: string,
    is_verification: boolean,
    is_owner: boolean,
    token: string
}


export class UserModels {
    // #=======================================================================================#
    // #			                            register                                       #
    // #=======================================================================================#
    async register(request: Request): Promise<users> {
        validateRequest(request);
        try {
            const hashPassword = bcrypt.hashSync(request.body.password, 10);
            const sqlQuery = 'INSERT INTO users (email,first_name, last_name, password,is_owner,is_verification,token) VALUES($1, $2, $3, $4, $5, FALSE, null) RETURNING *'
            const DBConnection = await Client.connect()
            const result = await DBConnection.query(sqlQuery, [request.body.email.toLocaleLowerCase(), request.body.first_name, request.body.last_name, hashPassword, request.body.is_owner || 'FALSE'])
            const user = result.rows[0]
            DBConnection.release()
            return user
        } catch (error) {
            throw new Error(`Couldn't add ${request.body.first_name} ${request.body.last_name} because Error = ${error}`)
        }
    }

    // #=======================================================================================#
    // #			                            login                                          #
    // #=======================================================================================#
    async login(request: Request): Promise<users> {
        validateRequest(request);
        try {
            let sqlQuery = 'SELECT * FROM users WHERE email=($1)'
            const DBConnection = await Client.connect()
            const result = await DBConnection.query(sqlQuery, [request.body.email.toLocaleLowerCase()])
            let user = result.rows[0]

            if (!user) {
                throw new Error(`No user with this email = ${request.body.email}`)
            }

            let IsValidPassword = bcrypt.compareSync(request.body.password, user.password);
            if (!IsValidPassword) {
                throw new Error(`invalid password`)
            } else {
                // to add token to router
                user.token = jwt.sign({ id: user._id, email: user.email }, process.env.ACCESS_TOKEN_SECRET as string, {
                    expiresIn: 86400 //for 24 hour
                });

                sqlQuery = 'UPDATE users SET token = ($1) WHERE id=($2)'
                await DBConnection.query(sqlQuery, [user.token, user.id]);
            }
            DBConnection.release();
            return user;
        } catch (error) {
            throw new Error(`Couldn't add ${request.body.first_name} ${request.body.last_name}} because Error: ${error}`)
        }
    }
    // #=======================================================================================#
    // #			                       get User by id                                      #
    // #=======================================================================================#
    async show(request: Request): Promise<users> {
        validateRequest(request);
        try {
            let sqlQuery = 'SELECT * FROM users WHERE id=($1)'
            const DBConnection = await Client.connect()
            const result = await DBConnection.query(sqlQuery, [request.params.id])
            const user = result.rows[0]
            DBConnection.release();

            if (!user) {
                throw new Error(`No user with this id = ${request.params.id}`)
            }

            return user;
        } catch (error) {
            throw new Error(error + '')
        }
    }

    // #=======================================================================================#
    // #			                               logout                                      #
    // #=======================================================================================#
    async logout(request: Request) {
        validateRequest(request);
        try {
            let sqlQuery = 'SELECT * FROM users WHERE id=($1)'
            const DBConnection = await Client.connect()
            let result = await DBConnection.query(sqlQuery, [request.params.id])
            let user = result.rows[0]
            if (!user) {
                throw new Error(`No user with this id = ${request.params.id}`)
            } else {
                sqlQuery = 'UPDATE users SET token = null WHERE id=($1)'
                await DBConnection.query(sqlQuery, [request.params.id]);
            }
            DBConnection.release();
        } catch (error) {
            throw new Error(error + '');
        }
    }
}