import { Router } from 'express';
import { body, param } from 'express-validator';

import {
    login,
    register,
    activateUserEmail,
    sendEmailCodeToRestPassword,
    resetUserPassword,
    show,
    logout
} from '../../controllers/authController'
import checkTokens from '../../utilities/checkTokens';


const auth: Router = Router()

auth.post('/login', checkEmail(), checkPassword(), login);
auth.post('/register', checkEmail(), checkPassword(), checkUserName(), register);
auth.get('/show/:id', checkTokens, checkID(), show);
auth.post('/activate', checkTokens, checkCode(), activateUserEmail);
auth.post('/checkEmail', checkTokens, checkEmail(), sendEmailCodeToRestPassword);
auth.post('/resetPassword', checkTokens, checkCode(), checkPassword(), resetUserPassword);
auth.get('/logout/:id', checkTokens, checkID(), logout);

// #=======================================================================================#
// #			                         check function                                    #
// #=======================================================================================#

function checkID() {
    return [
        param("id").exists().withMessage('you must enter user id').isInt().withMessage('invalid user id')
    ]
}
function checkCode() {
    return [
        body('code').exists().withMessage('you must enter code')
            .isInt().withMessage('code must be integer')
            .isLength({ min: 6, max: 6 }).withMessage('code must consist of 6 numbers')
    ]
}


function checkEmail() {
    return [
        body('email')
            .exists().withMessage('you must enter email')
            .isEmail().withMessage('invalid email')
    ]
}

function checkPassword() {
    return [
        body('password')
            .exists().withMessage('you must enter password')
            .isStrongPassword().withMessage('Password Must contain at least 1 characters(upper and lower),numbers,special characters')
    ]
}

function checkUserName() {
    return [
        body('first_name').exists().withMessage('you must enter first_name').isString().withMessage('invalid first_name'),
        body('last_name').exists().withMessage('you must enter last_name').isString().withMessage('invalid last_name'),
    ]
}

export default auth;