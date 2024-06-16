import { Types } from 'mongoose';

export type Booking = {
  date: Date;
  userId: Types.ObjectId; 
  carId: Types.ObjectId; 
  startTime: string; 
  endTime: string | null;
  totalCost: number; 
}