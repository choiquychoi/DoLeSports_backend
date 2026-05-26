# 🎾 ĐỖ LÊ SPORT - Backend API

Hệ thống quản trị và xử lý dữ liệu cho hệ sinh thái ĐỖ LÊ SPORT, bao gồm cửa hàng thương mại điện tử và hệ thống đặt sân cầu lông / tennis chuyên nghiệp.

---

## 📋 Yêu cầu hệ thống (Prerequisites)
*   **Node.js:** v22.x trở lên
*   **MongoDB:** v7.0+ (Nếu chạy cục bộ không qua Docker)
*   **Docker & Docker Compose:** (Nếu muốn chạy container hóa)

---

## 🚀 Công nghệ sử dụng
*   **Runtime:** Node.js (v22+)
*   **Framework:** Express.js (v5)
*   **Database:** MongoDB (Mongoose ODM)
*   **Security:** JWT, BcryptJS
*   **Storage:** AWS S3 (Media Management)
*   **Development:** TypeScript, tsx

---

## 📦 Các tính năng chính
*   **Quản lý Sản phẩm:** CRUD, Tự động tạo Slug/SKU, Quản lý biến thể (Variant Management).
*   **Booking Engine:** Xử lý đặt sân thời gian thực, thuật toán chống trùng lịch, Logic tính giá linh hoạt theo khung giờ.
*   **Dashboard Stats:** API tổng hợp số liệu, thống kê doanh thu và trạng thái đơn hàng.

---

## 🛠 Cấu hình Biến môi trường (.env)
Tạo file `.env` từ `.env.example` và điền các thông tin cấu hình:
```env
PORT=5005
MONGO_URI=mongodb://localhost:27017/dolesport
JWT_SECRET=your_jwt_secret_key

# Cấu hình Mail OTP/Notification
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# Cấu hình Storage (Nếu dùng AWS S3)
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
AWS_BUCKET_NAME=your_bucket_name
```

---

## ⚙️ Các lệnh Scripts (NPM Scripts)

* `npm run dev`: Chạy server ở chế độ development với Hot Reload (watch mode).
* `npm run build`: Biên dịch toàn bộ source code TypeScript sang JavaScript (`/dist`).
* `npm start`: Khởi chạy bản build production sau khi đã biên dịch.

© 2026 ĐỖ LÊ SPORT - Professional Sports Infrastructure.
