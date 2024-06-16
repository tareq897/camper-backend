import { Query, Schema, model } from 'mongoose';
import { Car } from './car.interface';

const carSchema = new Schema<Car>({
    name: { type: String, required: true },
    description: { type: String, required: true },
    color: { type: String, required: true },
    isElectric: { type: Boolean, required: true },
    status: { type: String, enum: ['available', 'unavailable'], default: 'available' },
    features: { type: [String], required: true },
    pricePerHour: { type: Number, required: true },
    isDeleted: { type: Boolean, default: false }
},
{
    timestamps: true,
},
);

// Middleware to exclude deleted cars
carSchema.pre<Query<Car, Car>>('find', function(next) {
    this.where({ isDeleted: { $ne: true } });
    next();
});

carSchema.pre<Query<Car, Car>>('findOne', function(next) {
    this.where({ isDeleted: { $ne: true } });
    next();
})

export const CarModel = model<Car>('Car', carSchema);

