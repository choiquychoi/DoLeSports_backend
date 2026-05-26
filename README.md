# 🎾 ĐỖ LÊ SPORT - Backend API

Hệ thống quản trị và xử lý dữ liệu cho hệ sinh thái **ĐỖ LÊ SPORT**, bao gồm cửa hàng thương mại điện tử và hệ thống đặt sân cầu lông chuyên nghiệp.

## 📋 Yêu cầu hệ thống (Prerequisites)
- **Node.js:** v22.x trở lên
- **Docker & Docker Compose:** (Nếu muốn chạy container hóa)
- **MongoDB:** v7.0+ (Nếu chạy cục bộ không qua Docker)

## 🚀 Công nghệ sử dụng
- **Runtime:** Node.js (v22+)
- **Framework:** Express.js (v5)
- **Database:** MongoDB (Mongoose ODM)
- **Security:** JWT, BcryptJS
- **Storage:** AWS S3 (Media Management)
- **Development:** TypeScript, tsx

## 📦 Các tính năng chính
- **Quản lý Sản phẩm:** CRUD, Slug/SKU auto-gen, Variant Management.
- **Booking Engine:** Xử lý đặt sân, tránh trùng lịch, Pricing logic linh hoạt.
- **Dashboard Stats:** API thống kê doanh thu, trạng thái đơn hàng.

## 🛠 Cấu hình Biến môi trường (.env)
Tạo file `.env` từ `.env.example` và điền các thông tin:
```bash
MONGO_URI=mongodb://mongodb:27017/dolesport
JWT_SECRET=your_jwt_secret
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

## ⚙️ Các lệnh Scripts (NPM Scripts)
- `npm run dev`: Chạy server ở chế độ development (watch mode).
- `npm run build`: Biên dịch TypeScript sang JavaScript (dist).
- `npm start`: Chạy bản build sản phẩm trong môi trường production.

---
© 2026 ĐỖ LÊ SPORT - Professional Sports Infrastructure.
