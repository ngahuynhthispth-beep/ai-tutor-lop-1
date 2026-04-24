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

  const contents = [
    {
      parts: [
        { text: prompt },
        ...images.map(img => {
          const base64Data = img.includes(",") ? img.split(",")[1] : img;
          const mimeMatch = img.match(/^data:([^;]+);base64,/);
          return {
            inline_data: {
              data: base64Data,
              mime_type: mimeMatch ? mimeMatch[1] : "image/jpeg"
            }
          };
        })
      ]
    }
  ];

  // Danh sách các model để thử lần lượt (ưu tiên các bản ổn định)
  const modelsToTry = [
    "gemini-1.5-flash",
    "gemini-1.5-flash-8b",
    "gemini-1.5-pro",
  ];

  let lastError = "";
  let lastErrorCode = 0;

  for (const modelName of modelsToTry) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1/models/${modelName}:generateContent?key=${apiKey}`;
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contents })
      });

      const result = await response.json();

      if (response.ok) {
        const text = result.candidates?.[0]?.content?.parts?.[0]?.text || "";
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (jsonMatch) return JSON.parse(jsonMatch[0]);
      } else {
        lastError = result.error?.message || response.statusText;
        lastErrorCode = response.status;
        console.error(`Lỗi model ${modelName}: ${lastError}`);
        
        // Nếu lỗi là do API Key không hợp lệ thì dừng luôn, không thử model khác mất công
        if (lastErrorCode === 400 && lastError.includes("API key not valid")) {
          throw new Error("API Key của ba mẹ không hợp lệ hoặc đã hết hạn. Hãy kiểm tra lại nhé!");
        }
      }
    } catch (e: any) {
      lastError = e.message;
      if (e.message.includes("API Key")) throw e; // Re-throw lỗi API Key
    }
  }

  // Nếu tất cả đều thất bại
  throw new Error(`Tất cả cô giáo đều bận (Lỗi: ${lastError}). Ba mẹ kiểm tra lại API Key hoặc thử lại sau nhé!`);
}
