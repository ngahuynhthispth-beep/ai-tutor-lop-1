# Phase 03: Core Logic (AI Grading)

Status: ⬜ Pending
Dependencies: Phase 02

## Objective
Xây dựng bộ não xử lý việc chấm điểm và phát hiện lỗi sai.

## Tasks:
- [ ] Viết API xử lý ảnh tải lên
- [ ] Xây dựng Prompt cho AI để: nhận diện đề bài, nhận diện lời giải, so sánh và tìm lỗi
- [ ] Định dạng kết quả trả về: tọa độ lỗi sai (để khoanh vùng) và lời nhận xét bằng văn bản

## Implementation Steps
1. [ ] Tạo Route `/api/grade` để nhận ảnh
2. [ ] Tinh chỉnh Prompt AI để đạt độ chính xác cao nhất cho chữ viết tay lớp 1
3. [ ] Xử lý logic trả về tọa độ lỗi trên ảnh

## Files to Create/Modify
- `src/app/api/grade/route.ts` - API chính
- `src/services/grading-service.ts` - Logic chấm điểm

## Test Criteria
- [ ] Upload ảnh bài toán sai -> AI chỉ ra đúng vị trí sai.
- [ ] Kết quả trả về kèm theo lời khuyên cho bé.

---
Next Phase: [phase-04-frontend.md]
