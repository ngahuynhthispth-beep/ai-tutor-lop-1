# Phase 05: Voice & Rewards

Status: ⬜ Pending
Dependencies: Phase 04

## Objective
Thêm tính năng âm thanh và hệ thống khen thưởng để tăng động lực cho bé.

## Tasks:
- [ ] Tích hợp Text-to-Speech để đọc lời nhận xét của AI
- [ ] Xây dựng kho Sticker (Sử dụng ảnh hoạt hình)
- [ ] Hiển thị thông báo chúc mừng & tặng Sticker khi bé hoàn thành bài
- [ ] Lưu bộ sưu tập Sticker vào Database

## Implementation Steps
1. [ ] Cài đặt hoặc cấu hình Speech API
2. [ ] Tạo trang `StickerBook` hiển thị các sticker đã nhận
3. [ ] Viết logic tặng quà sau khi API grading trả về kết quả "Hoàn hảo"

## Files to Create/Modify
- `src/hooks/useSpeech.ts`
- `src/components/RewardModal.tsx`
- `src/app/stickers/page.tsx`

## Test Criteria
- [ ] Nghe được tiếng AI nói khi có kết quả chấm bài.
- [ ] Sticker xuất hiện đúng lúc và được lưu lại.

---
Next Phase: [phase-06-testing.md]
