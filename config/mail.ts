import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

export const sendOrderNotification = async (order: any) => {
  // Tạo transporter ngay trong hàm để đảm bảo biến môi trường đã được nạp đầy đủ
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      // Xóa bỏ TẤT CẢ khoảng trắng (ở đầu, ở cuối và ở giữa các ký tự)
      pass: process.env.EMAIL_PASS?.replace(/\s/g, ''),
    },
  });

  const adminEmail = process.env.ADMIN_EMAIL || process.env.EMAIL_USER;
  console.log(`DEBUG: Đang gửi mail từ ${process.env.EMAIL_USER} (PASS LENGTH: ${process.env.EMAIL_PASS?.replace(/\s/g, '').length})`);
  
  // 1. Email cho Chủ quán (Admin)
  const adminMailOptions = {
    from: `"FOX SPORTS System" <${process.env.EMAIL_USER}>`,
    to: adminEmail,
    subject: `🔔 ĐƠN HÀNG MỚI: #${order.orderNumber}`,
    html: `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #1a1a1a; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 12px; overflow: hidden;">
        <div style="background-color: #FF5F00; padding: 30px 20px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 28px; letter-spacing: 2px;">FOX SPORTS</h1>
          <p style="color: rgba(255,255,255,0.8); margin: 5px 0 0 0; text-transform: uppercase; font-size: 12px; letter-spacing: 1px;">Thông báo hệ thống</p>
        </div>
        
        <div style="padding: 30px;">
          <h2 style="color: #FF5F00; margin-top: 0;">Có đơn hàng mới!</h2>
          <p>Chào Admin, hệ thống vừa ghi nhận một đơn hàng mới từ khách hàng <b>${order.customer.name}</b>.</p>
          
          <div style="background-color: #f8f9fa; border-left: 4px solid #FF5F00; padding: 20px; margin: 20px 0; border-radius: 4px;">
            <p style="margin: 0 0 10px 0;"><strong>Mã đơn hàng:</strong> <span style="color: #FF5F00;">#${order.orderNumber}</span></p>
            <p style="margin: 0 0 10px 0;"><strong>Tổng thanh toán:</strong> <span style="font-size: 18px; font-weight: bold; color: #d32f2f;">${order.totalAmount.toLocaleString()}₫</span></p>
            <p style="margin: 0;"><strong>Phương thức:</strong> ${order.paymentMethod === 'Bank Transfer' ? 'Chuyển khoản' : 'COD'}</p>
          </div>

          <h3 style="border-bottom: 1px solid #eee; padding-bottom: 10px;">Khách hàng</h3>
          <p style="margin: 5px 0;">📞 ${order.customer.phone}</p>
          <p style="margin: 5px 0;">📍 ${order.customer.address}, ${order.customer.district}, ${order.customer.province}</p>
          
          <div style="text-align: center; margin-top: 30px;">
            <a href="${process.env.ADMIN_URL || 'http://localhost:5175/admin/orders'}" 
               style="background-color: #1a1a1a; color: white; padding: 14px 28px; text-decoration: none; font-weight: bold; border-radius: 8px; display: inline-block;">
               XỬ LÝ ĐƠN HÀNG NGAY
            </a>
          </div>
        </div>
        
        <div style="background-color: #f1f1f1; padding: 20px; font-size: 12px; color: #666; text-align: center;">
          <p>© 2026 FOX SPORTS. All rights reserved.</p>
        </div>
      </div>
    `,
  };

  // 2. Email xác nhận cho Khách hàng
  const customerMailOptions = {
    from: `"FOX SPORTS" <${process.env.EMAIL_USER}>`,
    to: order.customer.email || order.customer.email, // Nếu có email khách
    subject: `Cảm ơn bạn đã đặt hàng tại FOX SPORTS (#${order.orderNumber})`,
    html: `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #1a1a1a; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 12px; overflow: hidden;">
        <div style="background-color: #1a1a1a; padding: 30px 20px; text-align: center;">
          <h1 style="color: #FF5F00; margin: 0; font-size: 28px; letter-spacing: 2px;">FOX SPORTS</h1>
        </div>
        
        <div style="padding: 30px;">
          <h2 style="margin-top: 0;">Cảm ơn bạn, ${order.customer.name}!</h2>
          <p>Đơn hàng <b>#${order.orderNumber}</b> của bạn đã được tiếp nhận và đang chờ xử lý.</p>
          
          <div style="border: 1px solid #eee; border-radius: 8px; padding: 20px; margin: 20px 0;">
            <h3 style="margin-top: 0; font-size: 16px;">Tóm tắt đơn hàng:</h3>
            ${order.items.map((item: any) => `
              <div style="display: flex; justify-content: space-between; margin-bottom: 10px; font-size: 14px;">
                <span>${item.name} x ${item.quantity}</span>
                <span>${(item.price * item.quantity).toLocaleString()}₫</span>
              </div>
            `).join('')}
            <div style="border-top: 1px solid #eee; margin-top: 10px; pt: 10px; font-weight: bold; display: flex; justify-content: space-between;">
              <span>Tổng cộng:</span>
              <span style="color: #FF5F00;">${order.totalAmount.toLocaleString()}₫</span>
            </div>
          </div>

          <p>Chúng tôi sẽ sớm liên hệ với bạn qua số điện thoại <b>${order.customer.phone}</b> để xác nhận giao hàng.</p>
        </div>
        
        <div style="background-color: #FF5F00; padding: 20px; color: white; text-align: center; font-size: 14px;">
          <p style="margin: 0;">Mọi thắc mắc vui lòng liên hệ: 0363.528.196</p>
        </div>
      </div>
    `,
  };

  try {
    // Gửi cho Admin
    await transporter.sendMail(adminMailOptions);
    // Gửi cho Khách (nếu họ có để lại email)
    if (order.customer.email) {
      await transporter.sendMail(customerMailOptions);
    }
    return { success: true };
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};
