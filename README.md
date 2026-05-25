# 🎾 ĐỖ LÊ SPORT - Backend API

Hệ thống quản trị và xử lý dữ liệu cho hệ sinh thái **ĐỖ LÊ SPORT**, bao gồm cửa hàng thương mại điện tử và hệ thống đặt sân cầu lông chuyên nghiệp.

## 🚀 Công nghệ sử dụng
- **Runtime:** Node.js (v22+)
- **Framework:** Express.js (v5)
- **Database:** MongoDB (Mongoose ODM)
- **Security:** JSON Web Token (JWT), BcryptJS
- **Storage:** AWS S3 (Cloud Storage cho hình ảnh)
- **Notifications:** Nodemailer (Gmail SMTP)
- **Development:** TypeScript, tsx

## 📦 Các tính năng chính
- **Quản lý Sản phẩm:** CRUD sản phẩm, tự động tạo Slug/SKU, quản lý biến thể (Size/Color/Stock).
- **Hệ thống Đặt sân:** Xử lý logic đặt lịch theo khung giờ, kiểm tra xung đột lịch, tính giá linh hoạt (giờ vàng/cuối tuần).
- **Quản lý Đơn hàng:** Xử lý giỏ hàng, đặt hàng, tra cứu mã vận đơn.
- **Admin Dashboard:** Cung cấp API thống kê doanh thu, biểu đồ tăng trưởng và quản lý nội dung (Tin tức, Banner).
- **Media Proxy:** Tích hợp S3 để upload và quản lý hình ảnh sản phẩm bảo mật.

## 🛠 Cài đặt & Chạy thử

### 1. Chạy với Docker (Khuyên dùng)
Nếu bạn dùng Docker Compose ở thư mục gốc:
```bash
docker-compose up -d backend
```

### 2. Chạy thủ công (Manual)
1. Cài đặt dependencies:
   ```bash
   npm install
   ```
2. Cấu hình file `.env` (Dựa trên `.env.example` ở gốc).
3. Chạy ở chế độ Development:
   ```bash
   npm run dev
   ```
4. Build sản phẩm:
   ```bash
   npm run build
   ```

## 📂 Cấu trúc thư mục
- `/config`: Cấu hình Database, Mail, S3.
- `/middleware`: Xử lý phân quyền (AuthMiddleware).
- `/models`: Định nghĩa Schema Mongoose (Product, Booking, Order, v.v.).
- `/routes`: Luồng API cho từng module.
- `server.ts`: Điểm khởi đầu của ứng dụng.

## 🔒 Bảo mật
- Mọi API Admin đều được bảo vệ bởi middleware `protect`.
- Thông tin nhạy cảm không được lưu trong code mà sử dụng biến môi trường.

---
© 2026 ĐỖ LÊ SPORT - Professional Sports Infrastructure.
