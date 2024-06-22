
import QueryBuilder from "../../builder/querybuilder";
import { Car } from "./car.interface";
import { CarModel } from "./car.model";
import { BookingModel } from "../Booking/booking.model";
import { calculateTotalCost } from "./car.util";



const createCarsIntoDB = async(payload: Car)=>{
    const result = await CarModel.create(payload)
    return result
}

const getAllCarsFromDB = async (query: Record<string, unknown>) => {
    const CarSearchableFields = ['name'];
    const carsQuery = new QueryBuilder(
      CarModel.find(),
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

const getSingleCar = async(id: string) =>{
    const result = await CarModel.findById(id)
    return result
}

const updateCarIntoDB = async(id: string, payload: Partial<Car>)=>{
  const result = await CarModel.findByIdAndUpdate(id, payload, {new: true})
  return result
}

const deleteCarIntoDB = async(id: string) =>{
  const result = await CarModel.findByIdAndUpdate(id, {isDeleted: true}, {new: true})
  return result
}


const returnCarService = async (bookingId: string, endTime: string) => {
  
      
      const booking = await BookingModel.findById(bookingId).populate('carId').populate('userId');

      if (!booking) {
          throw new Error('Booking not found');
      }
      calculateTotalCost

      const car = await CarModel.findByIdAndUpdate(
          booking.carId,
          { status: 'available' },
          { new: true }
      );

      if (!car) {
          throw new Error('Car not found');
      }

     
      const totalCost = calculateTotalCost(booking.startTime, endTime, car.pricePerHour);


      const updatedBooking = await BookingModel.findByIdAndUpdate(
          bookingId,
          { endTime, totalCost },
          { new: true, runValidators: true }
      ).populate('carId').populate('userId');

      if (!updatedBooking) {
          throw new Error('Failed to update booking');
      }

      return updatedBooking;
 
};




export const CarsServices = {
    createCarsIntoDB,
    getAllCarsFromDB,
    getSingleCar,
    updateCarIntoDB,
    deleteCarIntoDB,
    returnCarService
}