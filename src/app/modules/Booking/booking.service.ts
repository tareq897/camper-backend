import httpStatus from "http-status";
import { Booking } from "./booking.interface";
import { CarModel } from "../Car/car.model";
import { BookingModel } from "./booking.model";
import QueryBuilder from "../../builder/querybuilder";
import { UserModel } from "../User/user.model";
import AppError from "../../errors/appError";


const createBookingIntoDB = async(payload: Booking)=>{

    const { carId } = payload;

    // Check if the car is available
    const car = await CarModel.findOne({ _id: carId, status: 'available' });
    if (!car) {
      throw new Error('Car is not available for booking');
    }

    const result = await BookingModel.create(payload)
    await CarModel.updateOne({ _id: carId }, { status: 'unavailable' });
    return result
}


const getAllBookingsFromDB = async(query: Record<string, unknown>) =>{
    const BookingSearchableFields = ['carId', 'date']
    const bookingQuery = new QueryBuilder(BookingModel.find().populate('userId').populate('carId'), query).search(BookingSearchableFields).filter().sort().paginate().fields();

    const result = await bookingQuery.modelQuery
    return result
}

// const getASingleBookingsFromDB =  async(id: string) =>{
//     const result = await Booking.findById(id)
//     return result
// }

const getMyBookingsFromDB = async (email: string) => {
    try {
  
      const users = await UserModel.find({ email });
      if (!users || users.length === 0) {
        console.error('User not found');
        throw new AppError(httpStatus.NOT_FOUND, 'User not found');
      }
  
      const user = users[0];
  
      const userId = user._id;
  
      const bookings = await BookingModel.find({ userId })
      .populate('userId')
      .populate('carId')
  
      if (!bookings || bookings.length === 0) {
        console.error('No bookings found');
        throw new AppError(httpStatus.NOT_FOUND, 'No bookings found');
      }
  
      return bookings;
    } catch (error) {
      console.error('Error fetching bookings:', error);
      throw error;
    }
  };
  
  

export const BookingServices = {
    createBookingIntoDB,
    getAllBookingsFromDB,
    // getASingleBookingsFromDB,
    getMyBookingsFromDB
}