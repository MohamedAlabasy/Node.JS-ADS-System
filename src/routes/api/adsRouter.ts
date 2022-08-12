import { request, Router } from 'express';
import { body, param, check } from 'express-validator';

import { create, getAdsByID, getAllADS } from '../../controllers/adsController'
import checkTokens from '../../utilities/checkTokens';


const ads: Router = Router()

ads.post('', checkTokens, checkADSData(), create)
ads.get('/:id', checkTokens, checkID(), getAdsByID)
ads.get('', checkTokens, getAllADS)



// #=======================================================================================#
// #			                         check function                                    #
// #=======================================================================================#
function checkID() {
    return [
        param("id").exists().withMessage('you must enter ADS id').isInt().withMessage('invalid ADS id')
    ]
}
function checkADSData() {
    return [
        // check("ads").exists().withMessage('you must enter ADS').isString().withMessage('invalid ADS')
        //     .custom((ads) => {
        //         return ads.slice(ads.lastIndexOf('.') + 1) === ('png' || 'png' || 'jpeg' || 'mkv' || 'mp4')
        //     }).withMessage('ADS extensions must be one of png or png or jpeg for images and one of mkv or mp4 for video'),

        body('device_type').exists().withMessage('you must enter device_type').isIn(['mobile', 'desktop', 'both']).withMessage('device_type must be one of mobile or desktop or both'),

        body('ads_place').exists().withMessage('you must enter ads_place').isIn(['popup', 'above-footer', 'under-services']).withMessage('ads_place must be one of popup or above-footer or under-services'),

        body('start_date').exists().withMessage('you must enter start_date').isDate({ format: 'YYYY-MM-DD' }).withMessage('invalid start_date you must enter it in form of YYYY-MM-DD'),

        body('end_date').exists().withMessage('you must enter end_date').isDate({ format: 'YYYY-MM-DD' }).withMessage('invalid end_date you must enter it in form of YYYY-MM-DD'),

        body('user_id').exists().withMessage('you must enter user_id').isInt().withMessage('invalid user_id')
    ]
}

export default ads;