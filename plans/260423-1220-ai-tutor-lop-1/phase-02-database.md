# Phase 02: Database & AI Config

Status: ✅ Complete
Dependencies: Phase 01

## Objective
Thiết lập nơi lưu trữ dữ liệu (bài làm, sticker) và cấu hình kết nối với AI Vision.

## Tasks:
- [x] Thiết lập cấu trúc dữ liệu (Schema) cho User, Homework và Stickers
- [x] Cấu hình Google Gemini Vision API key
- [x] Viết hàm helper gọi AI để nhận diện hình ảnh
- [x] Thiết lập lưu trữ ảnh (Dùng LocalStorage & Base64 cho bản MVP)

## Implementation Steps
1. [x] Tạo file cấu hình API trong `src/lib/gemini.ts`
2. [x] Thiết lập kết nối Database trong `src/lib/database.ts`
3. [x] Định nghĩa kiểu dữ liệu trong `src/types/index.ts`

## Files to Create/Modify
- `src/lib/gemini.ts` - Kết nối AI
- `src/lib/database.ts` - Kết nối DB
- `src/types/index.ts` - Định nghĩa kiểu dữ liệu

## Test Criteria
- [ ] Gửi được một tấm ảnh và nhận được text/json phản hồi từ AI.
- [ ] Lưu và lấy được dữ liệu mẫu từ database.

---
Next Phase: [phase-03-backend.md]
