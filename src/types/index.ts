/**
 * @file types/index.ts
 * Định nghĩa các kiểu dữ liệu chính cho ứng dụng AI Tutor Lớp 1.
 */

export type Subject = 'math' | 'vietnamese';

export interface User {
  id: string;
  name: string;
  avatar?: string;
  totalStickers: number;
  createdAt: Date;
}

export interface Homework {
  id: string;
  userId: string;
  subject: Subject;
  imageUrl: string;
  gradingResult?: GradingResult;
  status: 'pending' | 'graded' | 'completed';
  createdAt: Date;
}

export interface GradingResult {
  score: number;
  feedback: string;
  errors: ErrorLocation[];
}

export interface ErrorLocation {
  imageIndex?: number; // Số thứ tự của ảnh (0, 1, 2)
  x: number; // Tọa độ X (phần trăm 0-100)
  y: number; // Tọa độ Y (phần trăm 0-100)
  width: number;
  height: number;
  message: string; // Lời gợi ý cho lỗi này
}

export interface Sticker {
  id: string;
  userId: string;
  type: string; // Ví dụ: 'superman', 'princess', 'star'
  imageUrl: string;
  earnedAt: Date;
}
