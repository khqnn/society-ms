import express from 'express';
import {
    createUserHandler,
    deleteUserHandler,
    enableUserHandler,
    findUserHandler,
    forgetPasswordHandler,
    getUserHandler,
    loginWithCode,
    testHandler,
    updatePasswordWithOtp,
    updateUserAccessHandler,
    updateUserHandler,
    userLoginHandler,
    verifyOtpHandler,

} from '../controller/user.controller';
import { validate } from '../middleware/validate';
import {
    getUserParams,
    findUserParams,
    createUserParams,
    updateUserParams,
    updateUserAccessParams
} from '../schema/user.schema';

const router = express.Router();

// router.use(deserializeUser, requireUser);

router
    .route('/test')
    .post(testHandler)

router
    .route('/keycloak-login')
    .post(loginWithCode)

router
    .route('/user-login')
    .post(userLoginHandler)

router
    .route('/forget-password')
    .post(forgetPasswordHandler)


router
    .route('/verify-otp')
    .post(verifyOtpHandler)

router
    .route('/update-password-otp')
    .post(updatePasswordWithOtp)

router
    .route('/:id')
    .get(validate(getUserParams), getUserHandler)
    .put(validate(updateUserParams), updateUserHandler)
// .delete(validate(deleteUserParams), deleteUserHandler)


router
    .route('/:id/enable')
    .put(validate(getUserParams), enableUserHandler)

router
    .route('/:id/access')
    .put(validate(updateUserAccessParams), updateUserAccessHandler)



router
    .route('/')
    .post(validate(createUserParams), createUserHandler)
    .get(validate(findUserParams), findUserHandler);




export default router;

