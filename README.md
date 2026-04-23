# 🎓 AI Tutor Lớp 1 - Người bạn học tập thông minh

**AI Tutor Lớp 1** là ứng dụng Web giúp các bé học sinh lớp 1 tự kiểm tra bài tập Toán và Tiếng Việt thông qua hình ảnh. Với sự hỗ trợ của trí tuệ nhân tạo (AI), ứng dụng không chỉ chấm điểm mà còn hướng dẫn bé tự nhận ra lỗi sai để sửa đổi, giúp bé hình thành tính tự lập trong học tập.

---

## ✨ Tính năng nổi bật

-   📸 **Chụp ảnh chấm bài:** Sử dụng AI Gemini Vision để nhận diện chữ viết tay và nội dung bài làm của bé.
-   🔴 **Khoanh vùng lỗi sai:** Tự động đánh dấu những vị trí bé làm chưa đúng trực tiếp trên ảnh.
-   🔊 **Cô giáo AI:** Phát giọng nói hướng dẫn và khích lệ bé bằng tiếng Việt thân thiện.
-   🎁 **Phần thưởng Sticker:** Tặng các Sticker xinh xắn (Siêu nhân, Công chúa...) khi bé hoàn thành bài tập xuất sắc.
-   🎨 **Giao diện rực rỡ:** Thiết kế dành riêng cho trẻ em với màu sắc tươi sáng, nút bấm to và hiệu ứng mượt mà.

## 🚀 Công nghệ sử dụng

-   **Frontend:** [Next.js](https://nextjs.org/) (React Framework), [TailwindCSS](https://tailwindcss.com/)
-   **AI:** [Google Gemini 1.5 Flash](https://aistudio.google.com/) (Xử lý hình ảnh và ngôn ngữ)
-   **Hiệu ứng:** [Framer Motion](https://www.framer.com/motion/), [Canvas Confetti](https://www.npmjs.com/package/canvas-confetti)
-   **Icons:** [Lucide React](https://lucide.dev/)

## 🛠️ Cài đặt và Chạy thử

1.  **Tải mã nguồn về máy.**
2.  **Cài đặt thư viện:**
    ```bash
    npm install
    ```
3.  **Cấu hình biến môi trường:**
    Tạo file `.env.local` và thêm mã API Key của bạn:
    ```env
    NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key_here
    ```
4.  **Chạy ứng dụng:**
    ```bash
    npm run dev
    ```
    Mở trình duyệt tại địa chỉ: `http://localhost:3000`

## 🌍 Triển khai lên Vercel

Ứng dụng được tối ưu hóa để chạy trên nền tảng **Vercel**. Hãy đảm bảo bạn đã cấu hình `NEXT_PUBLIC_GEMINI_API_KEY` trong phần **Environment Variables** của Vercel khi deploy.

---
*Phát triển bởi ❤️ dành cho các bé lớp 1.*
