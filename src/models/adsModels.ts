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

}
