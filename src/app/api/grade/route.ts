import { NextRequest, NextResponse } from "next/server";
import { GradingService } from "@/services/grading-service";

/**
 * API Endpoint: /api/grade
 * Nhận ảnh bài tập và trả về kết quả chấm điểm.
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { image, subject } = body;

    if (!image) {
      return NextResponse.json({ error: "Thiếu dữ liệu ảnh" }, { status: 400 });
    }

    // Thực hiện chấm điểm
    const result = await GradingService.gradeHomework(image, subject || 'math');

    return NextResponse.json(result);
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
