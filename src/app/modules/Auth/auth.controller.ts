import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AuthServices } from "./auth.service";
import config from "../../config";


const signIn = catchAsync(async(req, res)=>{
    const {result, accessToken, refreshToken} = await AuthServices.signInUser(req.body)

    res.cookie('refreshToken', refreshToken, {
        secure: config.NODE_ENV === 'production',
        httpOnly: true
    })


    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'User is login successfully',
        data: {result, accessToken}
    })
})

export const AuthController = {
    signIn
}