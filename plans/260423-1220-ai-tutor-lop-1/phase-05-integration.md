# Phase 05: Voice & Rewards

Status: ✅ Complete
Dependencies: Phase 04

## Objective
Thêm tính năng âm thanh và hệ thống khen thưởng để tăng động lực cho bé.

## Tasks:
- [x] Tích hợp Text-to-Speech để đọc lời nhận xét của AI
- [x] Xây dựng kho Sticker (Sử dụng emoji cho bản MVP)
- [x] Hiển thị thông báo chúc mừng & tặng Sticker khi bé hoàn thành bài
- [x] Lưu bộ sưu tập Sticker vào Database

## Implementation Steps
1. [x] Tạo hook `useSpeech.ts` sử dụng Web Speech API
2. [x] Tạo component `RewardModal.tsx` với hiệu ứng pháo hoa
3. [x] Kết nối logic tặng Sticker và lưu vào LocalStorage

## Files to Create/Modify
- `src/hooks/useSpeech.ts`
- `src/components/RewardModal.tsx`
- `src/app/stickers/page.tsx`

## Test Criteria
- [ ] Nghe được tiếng AI nói khi có kết quả chấm bài.
- [ ] Sticker xuất hiện đúng lúc và được lưu lại.

---
Next Phase: [phase-06-testing.md]
