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
// #=======================================================================================#
// #			                        get ADS by id                                      #
// #=======================================================================================#
export const getAdsByID = async (request: Request, response: Response, next: NextFunction) => {
    await ads.getAdsByID(request)
        .then(adsData => {
            if (adsData.msg) {
                response.json({
                    status: 1,
                    data: {
                        id: adsData.id,
                        msg: adsData.msg
                    }
                })
            } else {
                response.json({
                    status: 1,
                    data: {
                        id: adsData.id,
                        ads: adsData.ads,
                        ads_type: adsData.ads.split('.').pop() === ('png' || 'png' || 'jpeg') ? 'image' : 'video',
                        views_number: adsData.views,
                        device_type: adsData.device_type,
                        ads_place: adsData.ads_place,
                        start_date: adsData.start_date,
                        end_date: adsData.end_date,
                        user_id: adsData.user_id,
                    }
                })
            }
        }).catch(error => {
            next(error)
        })
}

// #=======================================================================================#
// #			                          get All ADS                                      #
// #=======================================================================================#
export const getAllADS = async (request: Request, response: Response, next: NextFunction) => {
    await ads.getAllADS(request)
        .then(adsData => {
            response.json({
                status: 1,
                count: adsData.length,
                data: adsData.map((ads) => {
                    return (ads.msg) ? {
                        id: ads.id,
                        msg: ads.msg
                    } : {
                        id: ads.id,
                        ads: ads.ads,
                        ads_type: ads.ads.split('.').pop() === ('png' || 'jpg' || 'jpeg') ? 'image' : 'video',
                        views_number: ads.views,
                        device_type: ads.device_type,
                        ads_place: ads.ads_place,
                        start_date: ads.start_date,
                        end_date: ads.end_date,
                        user_id: ads.user_id,
                    }
                })
            })
        }).catch(error => {
            next(error)
        })
}

// #=======================================================================================#
// #			                           ADS search                                      #
// #=======================================================================================#
export const adsSearch = async (request: Request, response: Response, next: NextFunction) => {
    await ads.adsSearch(request)
        .then(adsData => {
            response.json({
                status: 1,
                count: adsData.length,
                data: adsData.map((ads) => {
                    return (ads.msg) ? {
                        id: ads.id,
                        msg: ads.msg
                    } : {
                        id: ads.id,
                        ads: ads.ads,
                        ads_type: ads.ads.split('.').pop() === ('png' || 'jpg' || 'jpeg') ? 'image' : 'video',
                        views_number: ads.views,
                        device_type: ads.device_type,
                        ads_place: ads.ads_place,
                        start_date: ads.start_date,
                        end_date: ads.end_date,
                        user_id: ads.user_id,
                    }
                })
            })
        }).catch(error => {
            next(error)
        })
}
