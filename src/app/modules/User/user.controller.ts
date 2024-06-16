import httpStatus from "http-status";
import { UserServices } from "./user.service";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";

const signUpUser = catchAsync(async (req, res) => {
  const result = await UserServices.signUpUserIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User registerd succesfully',
    data: result,
  });
});

const getAllUsers = catchAsync(async(req, res)=>{
  const result = await UserServices.getAllUsersFromDB(req.query)
  sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Users are retrive succesfully',
      data: result,
    });
})


const getSingleUser = catchAsync(async(req, res)=>{
  const {id} = req.params
  const result = await UserServices.getSingleUser(id)
  sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Users is retrive succesfully',
      data: result,
    });
})

export const UserControllers = {
  signUpUser,
  getAllUsers,
  getSingleUser,
}