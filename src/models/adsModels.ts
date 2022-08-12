import { Request } from 'express';

import Client from '../database';

import validateRequest from '../utilities/validateRequest';

export type ads = {
    id: number,
    ads: string,
    views: number,
    device_type: string,
    ads_place: string,
    start_date: string,
    end_date: string,
    user_id: number
}

export class AdsModels {
    // #=======================================================================================#
    // #			                            create                                         #
    // #=======================================================================================#
    async create(request: Request): Promise<ads> {
        validateRequest(request);
        try {
            let sqlQuery = 'INSERT INTO ads (ads, device_type, ads_place,start_date,end_date,user_id) VALUES($1, $2, $3, $4, $5, $6) RETURNING *'
            const DBConnection = await Client.connect()
            const result = await DBConnection.query(sqlQuery, [request.body.ads])
            const user = result.rows[0]

            DBConnection.release()
            return user
        } catch (error) {
            throw new Error(error + '')
        }
    }

}
