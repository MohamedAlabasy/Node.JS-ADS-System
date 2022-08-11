import { Request } from 'express';

import Client from '../database';

import validateRequest from '../utilities/validateRequest';


export type emailVerification = {
    id: number,
    code: number,
    created_at: string,
    expire_at: string,
    user_id: number,
}


export class EmailVerificationModels {
    // #=======================================================================================#
    // #			                      activate User email                                  #
    // #=======================================================================================#
    async activateUserEmail(request: Request) {
        validateRequest(request);
        try {
            let sqlQuery = 'SELECT * FROM email_verification WHERE user_id=($1)'
            const DBConnection = await Client.connect()
            const result = await DBConnection.query(sqlQuery, [request.body.user])
            const date = result.rows[0]

            console.log(date);

            if (!date) {
                throw new Error(`Not send code to user with id = ${request.body.user}`)
            } else if (request.body.code != date.code) {
                throw new Error('invalid code');
            } else if (new Date() >= date.expire_at) {
                throw new Error('This code has expired');
            } else {
                sqlQuery = 'UPDATE users SET is_verification = true WHERE id=($1)'
                await DBConnection.query(sqlQuery, [request.body.user]);
            }
            DBConnection.release();
        } catch (error) {
            throw new Error(error + '');
        }
    }
}