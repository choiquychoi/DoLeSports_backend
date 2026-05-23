import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// Tạo transporter dùng chung
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS?.replace(/\s/g, ''),
  },
});

const adminEmail = process.env.ADMIN_EMAIL || process.env.EMAIL_USER;

// 1. THÔNG BÁO CHO ADMIN KHI CÓ ĐƠN ĐẶT SÂN MỚI (CHƯA XÁC NHẬN)
export const sendBookingNotification = async (booking: any) => {
  const adminMailOptions = {
    from: `"ĐỖ LÊ SPORT System" <${process.env.EMAIL_USER}>`,
    to: adminEmail,
    subject: `🎾 CÓ LỊCH ĐẶT SÂN MỚI (CHỜ DUYỆT): #${booking.orderNumber}`,
    html: `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #1a1a1a; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 12px; overflow: hidden;">
        <div style="background-color: #f57c00; padding: 30px 20px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 28px; letter-spacing: 2px;">ĐỖ LÊ SPORT</h1>
          <p style="color: rgba(255,255,255,0.8); margin: 5px 0 0 0; text-transform: uppercase; font-size: 12px; letter-spacing: 1px;">Thông báo chờ duyệt</p>
        </div>
        
        <div style="padding: 30px;">
          <h2 style="color: #f57c00; margin-top: 0;">Khách đang chờ bạn xác nhận!</h2>
          <p>Chào Admin, hệ thống vừa ghi nhận một yêu cầu đặt sân từ <b>${booking.customer.name}</b>. <b>Lưu ý: Sân vẫn đang mở cho người khác cho đến khi bạn bấm Xác nhận.</b></p>
          
          <div style="background-color: #f8f9fa; border-left: 4px solid #f57c00; padding: 20px; margin: 20px 0; border-radius: 4px;">
            <p style="margin: 0 0 10px 0;"><strong>Mã đặt sân:</strong> <span style="color: #f57c00;">#${booking.orderNumber}</span></p>
            <p style="margin: 0 0 10px 0;"><strong>Ngày chơi:</strong> ${booking.date}</p>
            <p style="margin: 0;"><strong>Tổng tiền dự kiến:</strong> <span style="font-size: 18px; font-weight: bold;">${booking.totalAmount.toLocaleString()}₫</span></p>
          </div>

          <h3 style="border-bottom: 1px solid #eee; padding-bottom: 10px;">Khách hàng</h3>
          <p style="margin: 5px 0;">📞 <b>SĐT: ${booking.customer.phone}</b></p>
          <p style="margin: 5px 0;">📧 Email: ${booking.customer.email || 'Không có'}</p>
          
          <div style="text-align: center; margin-top: 30px;">
            <a href="${process.env.ADMIN_URL || 'http://localhost:5175/admin/bookings'}" 
               style="background-color: #1a1a1a; color: white; padding: 14px 28px; text-decoration: none; font-weight: bold; border-radius: 8px; display: inline-block;">
               VÀO XÁC NHẬN NGAY
            </a>
          </div>
        </div>
      </div>
    `,
  };

  try {
    await transporter.sendMail(adminMailOptions);
    return { success: true };
  } catch (error) {
    console.error('Error sending admin notification:', error);
    throw error;
  }
};

// 2. GỬI MAIL CẢM ƠN CHO KHÁCH KHI ADMIN ĐÃ XÁC NHẬN (CONFIRMED)
export const sendBookingCustomerThankYou = async (booking: any) => {
  const customerMailOptions = {
    from: `"ĐỖ LÊ SPORT" <${process.env.EMAIL_USER}>`,
    to: booking.customer.email,
    subject: `✅ CHÍNH THỨC XÁC NHẬN: LỊCH ĐẶT SÂN #${booking.orderNumber}`,
    html: `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #1a1a1a; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 12px; overflow: hidden;">
        <div style="background-color: #1a1a1a; padding: 30px 20px; text-align: center;">
          <h1 style="color: #FF5F00; margin: 0; font-size: 28px; letter-spacing: 2px;">ĐỖ LÊ SPORT</h1>
        </div>
        
        <div style="padding: 30px;">
          <h2 style="margin-top: 0;">Chào ${booking.customer.name},</h2>
          <p>Lịch đặt sân của bạn tại <b>ĐỖ LÊ SPORT</b> đã chính thức được **XÁC NHẬN** và khóa chỗ thành công!</p>
          
          <div style="background-color: #e8f5e9; border-left: 4px solid #2e7d32; padding: 20px; margin: 20px 0; border-radius: 4px;">
            <p style="margin: 0 0 10px 0;"><strong>Mã đơn:</strong> <span style="color: #2e7d32; font-weight: bold;">#${booking.orderNumber}</span></p>
            <p style="margin: 0 0 10px 0;"><strong>Ngày chơi:</strong> ${booking.date}</p>
            <p style="margin: 0;"><strong>Trạng thái:</strong> <span style="color: #2e7d32; font-weight: bold;">ĐÃ KHÓA SÂN</span></p>
          </div>

          <h3 style="border-bottom: 1px solid #eee; padding-bottom: 10px;">Chi tiết lịch trình</h3>
          ${booking.items.map((item: any) => `
            <p style="margin: 5px 0;">🏟️ <b>Sân ${item.courtId}</b>: ${item.startTime} - ${item.endTime}</p>
          `).join('')}

          <p style="margin-top: 30px;">Cảm ơn bạn đã lựa chọn Đỗ Lê Sport. Hẹn gặp bạn tại sân!</p>
        </div>
        
        <div style="background-color: #FF5F00; padding: 20px; color: white; text-align: center; font-size: 14px;">
          <p style="margin: 0;">Mọi thắc mắc vui lòng liên hệ hotline: 0363.528.196</p>
        </div>
      </div>
    `,
  };

  try {
    await transporter.sendMail(customerMailOptions);
    console.log(`✅ Đã gửi mail xác nhận & cảm ơn đến khách hàng: ${booking.customer.email}`);
    return { success: true };
  } catch (error) {
    console.error('Error sending customer thank you email:', error);
    throw error;
  }
};

// ... keep existing sendOrderNotification ...
export const sendOrderNotification = async (order: any) => {
  // ... existing code ...
};
