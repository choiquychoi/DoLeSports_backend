import mongoose, { Schema, Document } from 'mongoose';

export interface IBooking extends Document {
  orderNumber: string;
  customer: { name: string; phone: string; email?: string; };
  date: string;
  items: Array<{
    courtId: number;
    startTime: string;
    endTime: string;
    price: number;
  }>;
  totalAmount: number;
  paymentStatus: 'Pending' | 'Paid' | 'Partial';
  bookingStatus: 'Waiting' | 'Confirmed' | 'Cancelled';
  notes?: string;
}

const bookingSchema = new Schema({
  orderNumber: { type: String, required: true, unique: true },
  customer: {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: String
  },
  date: { type: String, required: true },
  items: [{
    courtId: { type: Number, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    price: { type: Number, required: true }
  }],
  totalAmount: { type: Number, required: true },
  paymentStatus: { type: String, enum: ['Pending', 'Paid', 'Partial'], default: 'Pending' },
  bookingStatus: { type: String, enum: ['Waiting', 'Confirmed', 'Cancelled'], default: 'Waiting' },
  notes: String
}, { timestamps: true });

export default mongoose.model<IBooking>('Booking', bookingSchema);
