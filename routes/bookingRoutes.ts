import express, { Request, Response } from 'express';
import Booking from '../models/Booking.js';
import { sendBookingNotification, sendBookingCustomerThankYou } from '../config/mail.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// @desc    Get all bookings (Admin can get all, public needs date)
// @route   GET /api/bookings
router.get('/', async (req: Request, res: Response) => {
  const { date } = req.query;
  
  try {
    let query = {};
    if (date) {
      query = { date: date as string };
    }
    
    const bookings = await Booking.find(query).sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Update booking status
// @route   PUT /api/bookings/:id
router.put('/:id', protect, async (req: Request, res: Response) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: 'Không tìm thấy đơn đặt sân.' });
    }

    // Kiểm tra nếu trạng thái chuyển từ bất kỳ gì sang 'Confirmed'
    const isConfirming = req.body.bookingStatus === 'Confirmed' && booking.bookingStatus !== 'Confirmed';

    const updatedBooking = await Booking.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    // CHỈ gửi mail cảm ơn cho khách khi Admin xác nhận thành công
    if (isConfirming && updatedBooking?.customer.email) {
      sendBookingCustomerThankYou(updatedBooking).catch(err => console.error('Customer thank you mail error:', err));
    }

    res.json(updatedBooking);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Delete a booking
// @route   DELETE /api/bookings/:id
router.delete('/:id', protect, async (req: Request, res: Response) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: 'Không tìm thấy đơn đặt sân.' });
    }

    await Booking.findByIdAndDelete(req.params.id);
    res.json({ message: 'Đã xóa đơn đặt sân thành công.' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Create a new booking
// @route   POST /api/bookings
router.post('/', async (req: Request, res: Response) => {
  const { customer, date, items, totalAmount, notes } = req.body;

  if (!customer || !customer.name || !customer.phone || !date || !items || items.length === 0) {
    return res.status(400).json({ message: 'Missing required booking information' });
  }

  try {
    const orderNumber = `BK-${Date.now()}`;
    const booking = new Booking({
      orderNumber,
      customer,
      date,
      items,
      totalAmount,
      notes,
      paymentStatus: 'Pending',
      bookingStatus: 'Waiting'
    });

    const savedBooking = await booking.save();
    
    // CHỈ gửi mail cho Admin báo có đơn mới chờ duyệt
    sendBookingNotification(savedBooking).catch(err => console.error('Admin notification error:', err));

    res.status(201).json(savedBooking);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
