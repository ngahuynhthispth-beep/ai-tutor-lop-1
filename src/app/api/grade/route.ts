import { NextRequest, NextResponse } from "next/server";
import { GradingService } from "@/services/grading-service";

/**
 * API Endpoint: /api/grade
 * Nhận ảnh bài tập và trả về kết quả chấm điểm.
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { images, subject } = body; // 'images' bây giờ là một mảng

    if (!images || !Array.isArray(images) || images.length === 0) {
      return NextResponse.json({ error: "Thiếu dữ liệu ảnh" }, { status: 400 });
    }

    // Thực hiện chấm điểm cho toàn bộ danh sách ảnh
    const result = await GradingService.gradeHomework(images, subject || 'math');

    return NextResponse.json(result);
  } catch (error: any) {
    console.error("API Error:", error);
    return NextResponse.json(
      { 
        score: 0,
        feedback: `Ối, có lỗi rồi: ${error.message || "Máy chủ gặp sự cố"}. Ba mẹ thử lại nhé!`,
        errors: []
      },
      { status: 500 }
    );
  }
}
