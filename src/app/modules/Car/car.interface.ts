export type CarStatus = 'available' | 'unavailable';

export interface Car {
  name: string;
  description: string;
  color: string;
  isElectric: boolean;
  status: CarStatus; 
  features: string[];
  pricePerHour: number;
  isDeleted: boolean;
}