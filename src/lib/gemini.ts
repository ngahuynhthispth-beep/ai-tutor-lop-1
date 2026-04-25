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

  // Biệt đội "cô giáo" siêu cấp năm 2026 - Dùng chính dòng Gemini 3 mới nhất
  const modelsToTry = [
    "gemini-3-flash",
    "gemini-3-pro",
    "gemini-2.0-flash-latest",
    "gemini-1.5-flash-latest"
  ];

  let lastError: any = null;

  for (const modelName of modelsToTry) {
    try {
      console.log(`Đang thử gọi cô giáo: ${modelName}...`);
      const model = genAI.getGenerativeModel({ model: modelName }, { apiVersion: "v1" });
      const result = await model.generateContent([prompt, ...imageParts]);
      const response = await result.response;
      const text = response.text();

      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
    } catch (error: any) {
      console.error(`Cô giáo ${modelName} đang bận:`, error.message);
      lastError = error;
      // Nếu là lỗi API Key không hợp lệ thì dừng luôn
      if (error.message?.includes("API key not valid")) {
        throw new Error("API Key của ba mẹ không hợp lệ. Hãy kiểm tra lại nhé!");
      }
      continue; // Thử cô giáo tiếp theo trong danh sách
    }
  }

  // Nếu tất cả đều thất bại
  throw new Error(`Tất cả các cô giáo đều đang bận chuẩn bị bài (Lỗi cuối: ${lastError?.message || "Không xác định"}). Ba mẹ thử lại sau nhé!`);
}
