import { Schema, model } from 'mongoose';
import { Booking } from './booking.interface';


const bookingSchema = new Schema<Booking>({
  date: { type: Date, required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  carId: { type: Schema.Types.ObjectId, ref: 'Car', required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, default: null },
  totalCost: { type: Number, default: 0 },
}, {
  timestamps: true
});

export const BookingModel = model<Booking>('Booking', bookingSchema);

