import httpStatus from "http-status";
import { Signin } from "./auth.interface";
import { UserModel } from "../User/user.model";
import AppError from "../../errors/appError";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import config from "../../config";

const signInUser = async (payload: Signin) => {
    const isUserExists = await UserModel.findOne({ email: payload.email }).select('+password');
    
    if (!isUserExists) {
        throw new AppError(httpStatus.NOT_FOUND, "This user is not found");
    }

    const isPasswordMatch = await bcrypt.compare(payload.password, isUserExists.password);
    
    if (!isPasswordMatch) {
        throw new AppError(httpStatus.UNAUTHORIZED, "Incorrect password");
    }

    const jwtPayload = {
        email: isUserExists.email,
        role: isUserExists.role,
    };

    const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
        expiresIn: config.jwt_access_expires_in,
        });

    const refreshToken = jwt.sign(jwtPayload, config.jwt_refresh_secret as string,
            {
              expiresIn: config.jwt_refresh_expires_in,
            }
    );

    const result = await UserModel.findById(isUserExists._id).select('-password');

    return {result, accessToken, refreshToken};
}

export const AuthServices = {
    signInUser
};