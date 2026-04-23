# Phase 04: Frontend UI (Kid-Friendly)

Status: ✅ Complete
Dependencies: Phase 03

## Objective
Xây dựng giao diện thân thiện, rực rỡ dành cho trẻ em.

## Tasks:
- [x] Thiết kế Dashboard với các icon lớn (Toán, Tiếng Việt)
- [x] Xây dựng màn hình Chụp ảnh & Xem kết quả
- [x] Hiển thị ảnh bài làm với các vòng tròn khoanh vùng lỗi sai (dùng Canvas hoặc SVG)
- [x] Thêm các hiệu ứng chuyển cảnh mượt mà (Framer Motion)

## Implementation Steps
1. [x] Tạo layout rực rỡ trong `src/app/layout.tsx`
2. [x] Tạo Dashboard trong `src/app/page.tsx`
3. [x] Tạo component `ImageAnnotator` để vẽ lỗi sai
4. [x] Tạo trang chấm điểm trong `src/app/grade/[subject]/page.tsx`

## Files to Create/Modify
- `src/components/ImageAnnotator.tsx`
- `src/app/dashboard/page.tsx`
- `src/app/camera/page.tsx`

## Test Criteria
- [ ] Giao diện hiển thị tốt trên điện thoại/máy tính bảng.
- [ ] Bé có thể dễ dàng thấy chỗ sai được khoanh vùng.

---
Next Phase: [phase-05-integration.md]
