import { analyzeHomework } from "@/lib/gemini";
import { GradingResult, Subject } from "@/types";

/**
 * Service xử lý logic chấm điểm bài tập
 */
export const GradingService = {
  /**
   * Chấm điểm bài tập từ mảng các ảnh base64
   */
  gradeHomework: async (images: string[], subject: Subject): Promise<GradingResult> => {
    try {
      // 1. Gửi mảng ảnh sang Gemini để phân tích
      const rawResult = await analyzeHomework(images, subject);

      if (!rawResult) {
        throw new Error("Không nhận được phản hồi từ AI");
      }

      // 2. Chuẩn hóa kết quả trả về theo đúng định dạng GradingResult
      const result: GradingResult = {
        score: rawResult.score || 0,
        feedback: rawResult.feedback || "AI không đưa ra nhận xét.",
        errors: (rawResult.errors || []).map((err: any) => ({
          imageIndex: err.imageIndex ?? 0, // Mặc định là ảnh đầu tiên nếu AI quên
          x: err.x || 0,
          y: err.y || 0,
          width: err.width || 10,
          height: err.height || 10,
          message: err.message || "Chỗ này cần xem lại nhé!"
        }))
      };

      return result;
    } catch (error: any) {
      console.error("Lỗi trong GradingService:", error);
      return {
        score: 0,
        feedback: `Ối, có lỗi kỹ thuật rồi: ${error.message || "Không xác định"}. Ba mẹ thử lại nhé!`,
        errors: []
      };
    }
  }
};
