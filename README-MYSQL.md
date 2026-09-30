# Gia Sư Check-in — MySQL Edition

## Đã thay đổi
- Frontend không phụ thuộc dịch vụ database/auth bên thứ ba.
- Frontend React/Vite gọi REST API.
- Backend Node.js + Express.
- MySQL lưu users, students, classes, attendance, notifications và refresh_tokens.
- Password hash bằng bcrypt.
- Access token dùng JWT.
- Refresh token được lưu dưới dạng SHA-256 hash.
- GPS check-in/check-out gửi latitude, longitude và accuracy về backend.

## Chạy local

### 1. MySQL
Tạo database:
```bash
mysql -u root -p < database/schema.sql
```

### 2. Backend
```bash
cd backend
cp .env.example .env
npm install
npm run dev
```

Backend mặc định: `http://localhost:3001`

### 3. Frontend
Tại thư mục gốc:
```bash
cp .env.example .env
npm install
npm run dev
```

Frontend mặc định: `http://localhost:5173/Check_inGS/`

## Deploy miễn phí
GitHub Pages chỉ chạy frontend tĩnh. Backend Node.js và MySQL phải chạy trên một máy chủ/hosting có hỗ trợ backend + MySQL hoặc free tier tương ứng. Không đặt MYSQL_PASSWORD hoặc JWT_SECRET vào frontend/GitHub Pages.

## API
- POST `/api/auth/register`
- POST `/api/auth/login`
- POST `/api/auth/logout`
- GET `/api/auth/me`
- POST `/api/attendance/check-in`
- POST `/api/attendance/check-out`
- GET `/api/attendance/today`
- GET `/api/attendance/history`
- GET `/api/notifications`
- GET `/api/health`
