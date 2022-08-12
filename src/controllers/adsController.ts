import { Request, Response, NextFunction } from 'express';

import { AdsModels } from '../models/adsModels'

const ads = new AdsModels()

// #=======================================================================================#
// #			                            create                                         #
// #=======================================================================================#
export const create = async (request: Request, response: Response, next: NextFunction) => {
    await ads.create(request)
        .then(adsData => {
            response.json({
                status: 1,
                data: {
                    id: adsData.id,
                    ads: adsData.ads,
                    views_number: adsData.views,
                    device_type: adsData.device_type,
                    ads_place: adsData.ads_place,
                    start_date: adsData.start_date,
                    end_date: adsData.end_date,
                    user_id: adsData.user_id,
                }
            })
        }).catch(error => {
            next(error)
        })
}
