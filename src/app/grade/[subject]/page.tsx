"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Camera, ArrowLeft, Loader2, CheckCircle2 } from "lucide-react";
import { ImageAnnotator } from "@/components/ImageAnnotator";
import { RewardModal } from "@/components/RewardModal";
import { useSpeech } from "@/hooks/useSpeech";
import { GradingResult } from "@/types";
import { db } from "@/lib/database";

export default function GradePage() {
  const { subject } = useParams();
  const router = useRouter();
  const { speak } = useSpeech();
  
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<GradingResult | null>(null);
  const [hint, setHint] = useState<string | null>(null);
  const [showReward, setShowReward] = useState(false);

  // Xử lý khi chọn ảnh
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        setResult(null); // Reset kết quả cũ
      };
      reader.readAsDataURL(file);
      speak("Ba mẹ ơi, bé đã sẵn sàng học chưa nào?");
    }
  };

  // Gửi ảnh đi chấm điểm
  const handleGrade = async () => {
    if (!image) return;
    setLoading(true);
    setHint(null);
    speak("Đợi một chút nhé, cô giáo đang xem bài của bé đây...");

    try {
      const response = await fetch("/api/grade", {
        method: "POST",
        body: JSON.stringify({ image, subject }),
      });
      const data = await response.json();
      setResult(data);

      // Phát âm lời nhận xét
      if (data.feedback) {
        speak(data.feedback);
      }

      // Nếu không có lỗi, tặng quà
      if (data.errors && data.errors.length === 0) {
        // Lưu sticker vào DB
        db.addSticker({
          id: Date.now().toString(),
          userId: "user-1",
          type: "star",
          imageUrl: "⭐",
          earnedAt: new Date(),
        });
        
        setTimeout(() => setShowReward(true), 2000);
      }
    } catch (error) {
      console.error("Lỗi:", error);
      speak("Ôi, máy móc bị hỏng một chút, bé thử lại sau nhé!");
    } finally {
      setLoading(false);
    }
  };

  const handleShowHint = (message: string) => {
    setHint(message);
    speak(message);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Nút quay lại */}
      <button 
        onClick={() => router.push("/")}
        className="flex items-center gap-2 text-gray-500 font-bold hover:text-[#FF6B6B] transition-colors"
      >
        <ArrowLeft size={24} />
        <span>Quay lại</span>
      </button>

      <h2 className="text-3xl font-extrabold text-[#4D96FF]">
        {subject === 'math' ? 'Môn Toán 🔢' : 'Tiếng Việt ✍️'}
      </h2>

      {!image ? (
        // Màn hình chọn ảnh
        <motion.label 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-full aspect-[3/4] border-4 border-dashed border-gray-300 rounded-[40px] flex flex-col items-center justify-center gap-4 cursor-pointer bg-gray-50 hover:bg-blue-50 transition-colors"
        >
          <div className="bg-[#4D96FF] p-6 rounded-full shadow-lg shadow-blue-200">
            <Camera size={64} className="text-white" />
          </div>
          <span className="text-gray-400 font-bold text-xl px-8 text-center">Bấm vào đây để chụp ảnh bài tập của bé nhé!</span>
          <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
        </motion.label>
      ) : (
        // Màn hình hiển thị ảnh và kết quả
        <div className="flex flex-col gap-6">
          <ImageAnnotator 
            imageUrl={image} 
            errors={result?.errors || []} 
            onShowHint={handleShowHint} 
          />

          <RewardModal 
            isOpen={showReward} 
            onClose={() => setShowReward(false)} 
          />

          {/* Hiển thị gợi ý khi bấm vào lỗi */}
          {hint && (
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="bg-red-50 border-2 border-red-200 p-4 rounded-2xl text-red-600 font-bold text-lg text-center shadow-sm"
            >
              💡 {hint}
            </motion.div>
          )}

          {/* Nút điều khiển */}
          <div className="flex flex-col gap-3">
            {!result ? (
              <button
                onClick={handleGrade}
                disabled={loading}
                className="w-full bg-[#FF6B6B] text-white py-5 rounded-[24px] font-bold text-2xl shadow-lg shadow-red-200 flex items-center justify-center gap-3 active:scale-95 transition-transform"
              >
                {loading ? <Loader2 className="animate-spin" size={32} /> : "Chấm điểm ngay!"}
              </button>
            ) : (
              <div className="bg-green-50 p-6 rounded-[24px] border-2 border-green-200 flex flex-col items-center gap-2">
                <CheckCircle2 className="text-green-500" size={48} />
                <p className="text-green-700 font-bold text-xl text-center">{result.feedback}</p>
                <button 
                  onClick={() => setImage(null)}
                  className="mt-4 text-green-600 font-bold underline"
                >
                  Chụp bài khác
                </button>
              </div>
            )}
            
            {!loading && !result && (
              <button 
                onClick={() => setImage(null)}
                className="text-gray-400 font-semibold"
              >
                Chọn ảnh khác
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
