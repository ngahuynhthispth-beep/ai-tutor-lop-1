# Phase 03: Core Logic (AI Grading)

Status: ✅ Complete
Dependencies: Phase 02

## Objective
Xây dựng bộ não xử lý việc chấm điểm và phát hiện lỗi sai.

## Tasks:
- [x] Viết API xử lý ảnh tải lên
- [x] Xây dựng Prompt cho AI để: nhận diện đề bài, nhận diện lời giải, so sánh và tìm lỗi
- [x] Định dạng kết quả trả về: tọa độ lỗi sai (để khoanh vùng) và lời nhận xét bằng văn bản

## Implementation Steps
1. [x] Tạo Route `/api/grade` để nhận ảnh
2. [x] Xây dựng `GradingService` để kết nối logic AI và API
3. [x] Chuẩn hóa dữ liệu trả về cho Frontend sử dụng

## Files to Create/Modify
- `src/app/api/grade/route.ts` - API chính
- `src/services/grading-service.ts` - Logic chấm điểm

## Test Criteria
- [ ] Upload ảnh bài toán sai -> AI chỉ ra đúng vị trí sai.
- [ ] Kết quả trả về kèm theo lời khuyên cho bé.

---
Next Phase: [phase-04-frontend.md]
