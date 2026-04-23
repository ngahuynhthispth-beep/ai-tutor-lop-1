# Phase 02: Database & AI Config

Status: ⬜ Pending
Dependencies: Phase 01

## Objective
Thiết lập nơi lưu trữ dữ liệu (bài làm, sticker) và cấu hình kết nối với AI Vision.

## Tasks:
- [ ] Thiết lập cấu trúc dữ liệu (Schema) cho User, Homework và Stickers
- [ ] Cấu hình Google Gemini Vision API key
- [ ] Viết hàm helper gọi AI để nhận diện hình ảnh
- [ ] Thiết lập lưu trữ ảnh (có thể dùng Cloudinary hoặc Supabase Storage)

## Implementation Steps
1. [ ] Tạo file cấu hình API trong `src/lib/ai-config.ts`
2. [ ] Thiết lập kết nối Database (Supabase hoặc SQLite)
3. [ ] Viết script test kết nối với AI

## Files to Create/Modify
- `src/lib/gemini.ts` - Kết nối AI
- `src/lib/database.ts` - Kết nối DB
- `src/types/index.ts` - Định nghĩa kiểu dữ liệu

## Test Criteria
- [ ] Gửi được một tấm ảnh và nhận được text/json phản hồi từ AI.
- [ ] Lưu và lấy được dữ liệu mẫu từ database.

---
Next Phase: [phase-03-backend.md]
