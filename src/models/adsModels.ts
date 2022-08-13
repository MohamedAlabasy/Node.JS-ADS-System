import { Request } from 'express';
import { createClient } from 'redis';

const redisClient = createClient();
redisClient.connect();


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
    user_id: number,
    msg: string,
}

export class AdsModels {
    // #=======================================================================================#
    // #			                            create                                         #
    // #=======================================================================================#
    async create(request: Request): Promise<ads> {
        validateRequest(request);
        try {
            const start_date = new Date(request.body.start_date)
            const end_date = new Date(request.body.end_date)
            
            if (!['mp4', 'png', 'jpg', 'jpeg', 'mkv', 'mp4'].includes(request.file?.filename.split('.').pop() + '')) {
                throw new Error('ads extensions must be one of png or jpg or jpeg for images and one of mkv or mp4 for video')
            }
            if (end_date <= start_date) {
                throw new Error('The ADS end_date must be greater than the ADS start_date')
            }

            let sqlQuery = 'SELECT * FROM users WHERE id=($1)'
            const DBConnection = await Client.connect()
            let result = await DBConnection.query(sqlQuery, [request.body.user_id])
            let ads = result.rows[0]

            if (!ads) {
                throw new Error('No user with this id')
            }
            if (!ads.is_owner) {
                throw new Error('Only the owner can add ads')
            }


            sqlQuery = 'INSERT INTO ads (ads, device_type, ads_place,start_date,end_date,user_id) VALUES($1, $2, $3, $4, $5, $6) RETURNING *'
            result = await DBConnection.query(sqlQuery, [request.file?.filename, request.body.device_type, request.body.ads_place, request.body.start_date, request.body.end_date, request.body.user_id])
            ads = result.rows[0]


            DBConnection.release()
            return ads
        } catch (error) {
            throw new Error(error + '')
        }
    }
    // #=======================================================================================#
    // #			                        get ADS by id                                      #
    // #=======================================================================================#
    async getAdsByID(request: Request): Promise<ads> {
        validateRequest(request);
        try {
            let sqlQuery = 'SELECT * FROM ads WHERE id=($1)'
            const DBConnection = await Client.connect()
            const result = await DBConnection.query(sqlQuery, [request.params.id])
            let ads = result.rows[0]

            if (!ads) {
                throw new Error(`No ADS with this id = ${request.params.id}`)
            } else if (new Date() >= ads.end_date) {
                ads.msg = 'this ADS is expire date'
                return ads;
            } else {
                sqlQuery = 'UPDATE ads SET views = ($1) WHERE id=($2)'
                await DBConnection.query(sqlQuery, [ads.views + 1, ads.id]);
                ads.views = ads.views + 1;
            }

            DBConnection.release()
            return ads
        } catch (error) {
            throw new Error(error + '')
        }
    }
    // #=======================================================================================#
    // #			                          get All ADS                                      #
    // #=======================================================================================#
    async getAllADS(request: Request): Promise<ads[]> {
        validateRequest(request);
        try {
            let sqlQuery = 'SELECT * FROM ads'
            const DBConnection = await Client.connect()
            const result = await DBConnection.query(sqlQuery)
            const ads = result.rows;


            if (!ads) {
                throw new Error('No ADS to show')
            } else {
                ads.map(async singleADS => {
                    if (new Date() >= singleADS.end_date) {
                        singleADS.msg = 'this ADS is expire date'
                    } else {
                        sqlQuery = 'UPDATE ads SET views = ($1) WHERE id=($2)'
                        await DBConnection.query(sqlQuery, [singleADS.views + 1, singleADS.id]);
                        singleADS.views = singleADS.views + 1;
                    }
                })
            }

            DBConnection.release()
            return ads
        } catch (error) {
            throw new Error(error + '')
        }
    }
    // #=======================================================================================#
    // #			                           ADS search                                      #
    // #=======================================================================================#
    async adsSearch(request: Request): Promise<any[]> {
        validateRequest(request);
        try {
            let result;
            let sqlQuery;
            const DBConnection = await Client.connect()


            const redisValue = await redisClient.get(Object.values(request.body).sort().join(','))
            if (redisValue) {
                return JSON.parse(redisValue);
            }


            if (Object.keys(request.body).length > 0) {
                let condition = '';
                let operator = '=';

                // search mechanism
                for (let index = 0; index < Object.keys(request.body).length; index++) {
                    operator = '=';
                    if (Object.keys(request.body)[index] == 'start_date') {
                        operator = '>=';
                    } else if (Object.keys(request.body)[index] == 'end_date') {
                        operator = '<=';
                    }
                    condition += `${index == 0 ? '' : 'and'} ${Object.keys(request.body)[index]}${operator}($${index + 1}) `
                }

                sqlQuery = `SELECT * FROM ads WHERE ${condition}`
                result = await DBConnection.query(sqlQuery, Object.values(request.body))
            } else {
                sqlQuery = `SELECT * FROM ads`
                result = await DBConnection.query(sqlQuery);
            }

            const ads = result.rows;

            if (!ads) {
                throw new Error('No ADS to show')
            } else {
                ads.map(async singleADS => {
                    if (new Date() >= singleADS.end_date) {
                        singleADS.msg = 'this ADS is expire date'
                    } else {
                        sqlQuery = 'UPDATE ads SET views = ($1) WHERE id=($2)'
                        await DBConnection.query(sqlQuery, [singleADS.views + 1, singleADS.id]);
                        singleADS.views = singleADS.views + 1;
                    }
                })
            }

            await redisClient.setEx(Object.values(request.body).sort().join(','), 3600, JSON.stringify(ads));

            // await redisClient.disconnect();
            DBConnection.release()
            return ads
        } catch (error) {
            throw new Error(error + '')
        }
    }
}
