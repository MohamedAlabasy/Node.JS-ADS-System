import { Request } from 'express';
import bcrypt from 'bcryptjs';

import Client from '../database';
import validateRequest from '../utilities/validateRequest';
import emailVerification from '../utilities/email/emailVerification';


export type resetPassword = {
    id: number,
    code: number,
    created_at: string,
    expire_at: string,
    user_id: number,
}


export class ResetPasswordModels {
    // #=======================================================================================#
    // #                          send User email code to rest password                        #
    // #=======================================================================================#
    async sendEmailCodeToRestPassword(request: Request) {
        validateRequest(request);
        try {
            let sqlQuery = 'SELECT * FROM users WHERE email=($1)'
            const DBConnection = await Client.connect()
            const result = await DBConnection.query(sqlQuery, [request.body.email])
            const user = result.rows[0]

            if (!user) {
                throw new Error(`Not user with this email = ${request.body.email}`)
            } else {
                // email exist then send email code
                const registerCode = Math.floor(100000 + Math.random() * 900000);
                const expireCodeTime = 3600000;
                sqlQuery = 'INSERT INTO reset_password (code,created_at, expire_at, user_id) VALUES($1, $2, $3, $4) RETURNING *'
                await DBConnection.query(sqlQuery, [registerCode, new Date(Date.now()), new Date(Date.now() + expireCodeTime), user.id])
                emailVerification(request, registerCode, true);
            }

            DBConnection.release();
            return user;
        } catch (error) {
            throw new Error(error + '');
        }
    }

    // #=======================================================================================#
    // #                                  reset User password                                  #
    // #=======================================================================================#
    async resetUserPassword(request: Request) {
        validateRequest(request);
        try {
            let sqlQuery = 'SELECT * FROM reset_password WHERE user_id=($1)'
            const DBConnection = await Client.connect()
            let result = await DBConnection.query(sqlQuery, [request.body.user])
            let date = result.rows[0]

            console.log(date);

            if (!date) {
                throw new Error(`Not send code to user with id = ${request.body.user}`)
            } else if (request.body.code != date.code) {
                throw new Error('invalid code');
            } else if (new Date() >= date.expire_at) {
                throw new Error('This code has expired');
            } else {
                const hashPassword = bcrypt.hashSync(request.body.password, 10);
                sqlQuery = 'UPDATE users SET password = ($1) WHERE id=($2)'
                await DBConnection.query(sqlQuery, [hashPassword,request.body.user]);
            }
            DBConnection.release();
        } catch (error) {
            throw new Error(error + '');
        }
    }
}