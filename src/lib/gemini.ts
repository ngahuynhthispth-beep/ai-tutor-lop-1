import { GoogleGenerativeAI } from "@google/generative-ai";

// Khởi tạo Gemini AI với API Key từ biến môi trường
const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY || "";
const genAI = new GoogleGenerativeAI(apiKey);

/**
 * Hàm gửi ảnh bài tập lên Gemini và nhận kết quả phân tích
 * @param imageBase64 Dữ liệu ảnh dưới dạng base64
 * @param subject Môn học (math/vietnamese)
 */
export async function analyzeHomework(imageBase64: string, subject: 'math' | 'vietnamese') {
  if (!apiKey) {
    throw new Error("Chưa cấu hình Gemini API Key. Vui lòng kiểm tra file .env");
  }

  // Sử dụng model gemini-1.5-flash để xử lý ảnh nhanh và tiết kiệm
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = subject === 'math' 
    ? "Bạn là một giáo viên tiểu học vui tính. Hãy kiểm tra bài tập toán lớp 1 trong ảnh này. Đừng cho đáp án ngay, hãy chỉ ra các lỗi sai (nếu có) bằng cách mô tả vị trí và đưa ra gợi ý nhẹ nhàng để bé tự sửa. Trả về kết quả dưới dạng JSON có cấu trúc: { score: number, feedback: string, errors: [{ x: number, y: number, width: number, height: number, message: string }] }"
    : "Bạn là một giáo viên Tiếng Việt tiểu học. Hãy kiểm tra bài viết chữ/chính tả trong ảnh này. Hãy nhận xét về nét chữ và chỉ ra các từ viết chưa đúng. Đừng cho đáp án ngay, hãy gợi ý để bé tự sửa. Trả về kết quả dưới dạng JSON có cấu trúc: { score: number, feedback: string, errors: [{ x: number, y: number, width: number, height: number, message: string }] }";

  const result = await model.generateContent([
    prompt,
    {
      inlineData: {
        data: imageBase64,
        mimeType: "image/jpeg",
      },
    },
  ]);

  const response = await result.response;
  const text = response.text();
  
  // Trích xuất JSON từ phản hồi của AI
  try {
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    return jsonMatch ? JSON.parse(jsonMatch[0]) : null;
  } catch (error) {
    console.error("Lỗi khi phân tích JSON từ AI:", error);
    return null;
  }
}
