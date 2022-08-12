import { Router } from 'express';
import { body, param } from 'express-validator';

import { create } from '../../controllers/adsController'
import checkTokens from '../../utilities/checkTokens';


const ads: Router = Router()

// ads.get('/all', checkTokens.getAllAds)
ads.route('')
    .post(checkTokens, create)
// .get(checkID(), checkTokens,)
// .put((), checkTokens,)
// .delete((), checkTokens,)



// #=======================================================================================#
// #			                         check function                                    #
// #=======================================================================================#

function checkID() {
    return [
        body("id").exists().withMessage('you must enter user id').isInt().withMessage('invalid user id')
    ]
}

export default ads;