# Gia Sư Check-in

## 1. Giới thiệu

Ứng dụng quản lý check-in / check-out cho gia sư, tích hợp Supabase, GPS, PWA và GitHub Pages.

## 2. Công nghệ

- React + Vite
- Supabase Auth + PostgreSQL + RLS
- Leaflet + OpenStreetMap
- PWA
- GitHub Pages

## 3. Cấu trúc project

```text
src/
public/
supabase/
.github/
```

## 4. Cài đặt

```bash
npm install
```

## 5. Chạy local

```bash
npm run dev
```

## 6. Cấu hình Supabase

Tạo file `.env` từ `.env.example` và điền:

```bash
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
```

## 7. Chạy SQL migration

Sử dụng Supabase SQL editor hoặc CLI để import migration từ `supabase/migrations`.

## 8. Build

```bash
npm run build
```

## 9. Deploy GitHub Pages

GitHub Actions sẽ build và deploy khi push code lên branch chính.

## 10. PWA

Manifest và service worker được cấu hình trong `vite.config.js` và `public`.

## 11. GPS

GPS được lấy bằng `navigator.geolocation` với `enableHighAccuracy: true`.

## 12. Security

- Tất cả logic quyền phải nằm trong Supabase RLS.
- Không lưu password hoặc dữ liệu nhạy cảm trong localStorage.
- Không dùng service role key trên frontend.

## 13. Test checklist

- Tutor login
- Parent login
- Check-in
- Check-out
- GPS accuracy
- Realtime
- History
- Logout

## 14. Liên hệ

Dự án đang trong giai đoạn phát triển thực tế theo chuẩn Supabase + PWA + GitHub Pages.
