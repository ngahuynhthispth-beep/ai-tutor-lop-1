import { GoogleGenerativeAI } from "@google/generative-ai";

// Khởi tạo Gemini AI - Thử lấy cả 2 biến để đảm bảo Vercel nhận diện được
const apiKey = process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY || "";
const genAI = new GoogleGenerativeAI(apiKey);
// Lưu ý: SDK mặc định có thể dùng v1beta, ta sẽ dùng mặc định của nó

/**
 * Hàm gửi danh sách ảnh bài tập lên Gemini và nhận kết quả phân tích
 * @param images Mảng các chuỗi ảnh base64
 * @param subject Môn học (math/vietnamese)
 */
/**
 * Hàm gửi danh sách ảnh bài tập lên Gemini qua Fetch API trực tiếp (để tránh lỗi SDK)
 */
/**
 * Hàm gửi danh sách ảnh bài tập lên Gemini qua Fetch API với cơ chế tự động thử nhiều model
 */
export async function analyzeHomework(images: string[], subject: 'math' | 'vietnamese') {
  if (!apiKey) {
    throw new Error("Chưa cấu hình Gemini API Key.");
  }

  const prompt = subject === 'math' 
    ? "Bạn là một giáo viên tiểu học vui tính. Hãy kiểm tra bài tập toán lớp 1 trong ảnh. Chỉ ra lỗi sai và gợi ý bé tự sửa. TRẢ VỀ JSON: { score: number, feedback: string, errors: [{ imageIndex: number, x: number, y: number, width: number, height: number, message: string }] }"
    : "Bạn là một giáo viên Tiếng Việt tiểu học. Hãy kiểm tra bài viết chữ/chính tả trong ảnh. Chỉ ra từ sai và gợi ý bé tự sửa. TRẢ VỀ JSON: { score: number, feedback: string, errors: [{ imageIndex: number, x: number, y: number, width: number, height: number, message: string }] }";

  try {
    // Sử dụng model Gemini 3 Flash đời mới nhất của năm 2026
    // Đây là model mạnh mẽ và tương thích tốt nhất hiện nay
    const model = genAI.getGenerativeModel({ model: "gemini-3-flash" });

    const imageParts = images.map(img => {
      const base64Data = img.includes(",") ? img.split(",")[1] : img;
      const mimeMatch = img.match(/^data:([^;]+);base64,/);
      return {
        inlineData: {
          data: base64Data,
          mimeType: mimeMatch ? mimeMatch[1] : "image/jpeg"
        }
      };
    });

    const result = await model.generateContent([prompt, ...imageParts]);
    const response = await result.response;
    const text = response.text();

    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    
    throw new Error("AI trả về kết quả không đúng định dạng.");
  } catch (error: any) {
    console.error("Lỗi Gemini SDK:", error);
    
    // Nếu lỗi là do model không tồn tại, thử với bản pro hoặc flash đời mới hơn (fallback)
    if (error.message?.includes("not found")) {
      try {
        const fallbackModel = genAI.getGenerativeModel({ model: "gemini-3-flash-latest" });
        const result = await fallbackModel.generateContent([
          prompt, 
          ...images.map(img => ({
            inlineData: {
              data: img.includes(",") ? img.split(",")[1] : img,
              mimeType: "image/jpeg"
            }
          }))
        ]);
        const text = (await result.response).text();
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (jsonMatch) return JSON.parse(jsonMatch[0]);
      } catch (e2) {
        throw new Error(`Lỗi AI: ${error.message}`);
      }
    }
    
    throw error;
  }
}
