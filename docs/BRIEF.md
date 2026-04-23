# 💡 BRIEF: AI Tutor Lớp 1 (Tên dự án tạm thời)

**Ngày tạo:** 2026-04-23
**Trạng thái:** Đã thống nhất mục tiêu

---

## 1. VẤN ĐỀ CẦN GIẢI QUYẾT
Học sinh lớp 1 làm bài ôn tập (Toán, Tiếng Việt) cần được phản hồi ngay lập tức về lỗi sai để tự sửa. Phụ huynh bận rộn cần một công cụ hỗ trợ chấm bài chính xác nhưng vẫn mang tính giáo dục (không cho đáp án ngay).

## 2. GIẢI PHÁP ĐỀ XUẤT
Một **Web App** đơn giản:
- Phụ huynh chụp ảnh bài làm.
- AI nhận diện chữ viết tay, chấm điểm.
- AI chỉ lỗi sai bằng hình ảnh và giọng nói để bé tự sửa.

## 3. ĐỐI TƯỢNG SỬ DỤNG
- **Học sinh lớp 1:** Người dùng chính, tương tác với kết quả chấm.
- **Phụ huynh:** Người chụp ảnh và theo dõi tiến độ của con.

## 4. NGHIÊN CỨU THỊ TRƯỜNG & ĐIỂM KHÁC BIỆT
- **Đối thủ:** Photomath, Socratic, Qanda (Thường cho đáp án ngay).
- **Điểm khác biệt của mình:** 
    - Tập trung vào việc **Chỉ lỗi để bé tự sửa** thay vì cho đáp án.
    - Giao diện tối giản, sử dụng hình ảnh và giọng nói dành riêng cho trẻ 6 tuổi.
    - Kết hợp Sticker khen thưởng để tăng động lực.

## 5. TÍNH NĂNG

### 🚀 MVP (Giai đoạn 1):
- [ ] **Quét ảnh:** Tải ảnh bài làm lên và AI nhận diện nội dung (Toán/Tiếng Việt đơn giản).
- [ ] **Chỉ lỗi trực quan:** Khoanh vùng đỏ chỗ sai ngay trên hình ảnh.
- [ ] **AI Voice:** Đọc lời nhận xét/hướng dẫn bằng giọng nói.
- [ ] **Sticker Reward:** Tặng hình dán hoạt hình sau khi hoàn thành.
- [ ] **Giao diện thân thiện:** Sử dụng icon và màu sắc, hạn chế chữ viết.

### 🎁 Phase 2 (Mở rộng):
- [ ] Báo cáo tiến độ cho phụ huynh.
- [ ] Bảng xếp hạng thi đua.
- [ ] Kho bài tập mẫu để học sinh luyện tập thêm.

## 6. ĐÁNH GIÁ KỸ THUẬT
- **Độ phức tạp:** Trung bình.
- **Công nghệ chính:** React/Next.js (Web App), AI Vision API (nhận diện hình ảnh/chữ viết tay), TTS (chuyển văn bản thành giọng nói).

## 7. BƯỚC TIẾP THEO
→ Chạy `/plan` để thiết kế cấu trúc Database và giao diện chi tiết.
