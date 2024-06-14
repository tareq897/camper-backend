
import QueryBuilder from "../../builder/querybuilder";
import { Tuser } from "./user.interface";
import {  UserModel } from "./user.model";


const signUpUserIntoDB = async ( payload: Tuser) => {
  const result = await UserModel.create(payload)
  return result
};

const getAllUsersFromDB = async (query: Record<string, unknown>) => {
  const CarSearchableFields = ['name'];
  const carsQuery = new QueryBuilder(
    UserModel.find(),
    query,
  )
    .search(CarSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await carsQuery.modelQuery;
  return result;
};

const getSingleUser = async(id: string) =>{
  const result = await UserModel.findById(id)
  return result
}

export const UserServices = {
  signUpUserIntoDB,
  getAllUsersFromDB,
  getSingleUser
};