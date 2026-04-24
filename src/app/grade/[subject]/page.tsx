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
  
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<GradingResult | null>(null);
  const [hint, setHint] = useState<string | null>(null);
  const [showReward, setShowReward] = useState(false);

  // Hàm nén ảnh để giảm dung lượng trước khi gửi lên server
  const compressImage = (base64: string): Promise<string> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = base64;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const MAX_WIDTH = 1200; // Giới hạn chiều rộng để ảnh nhẹ hơn
        const scale = MAX_WIDTH / img.width;
        
        if (scale < 1) {
          canvas.width = MAX_WIDTH;
          canvas.height = img.height * scale;
        } else {
          canvas.width = img.width;
          canvas.height = img.height;
        }

        const ctx = canvas.getContext("2d");
        ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);
        // Nén chất lượng xuống 0.7 (70%) để giảm dung lượng đáng kể
        resolve(canvas.toDataURL("image/jpeg", 0.7));
      };
    });
  };

  // Xử lý khi chọn nhiều ảnh
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []).slice(0, 3);
    if (files.length > 0) {
      setLoading(true);
      const newImages: string[] = [];
      let loadedCount = 0;

      files.forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = async () => {
          const compressed = await compressImage(reader.result as string);
          newImages.push(compressed);
          loadedCount++;
          if (loadedCount === files.length) {
            setImages(newImages);
            setResult(null);
            setLoading(false);
            speak(`Bé đã chụp ${files.length} trang bài tập. Ba mẹ bấm chấm điểm nhé!`);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const [status, setStatus] = useState<string | null>(null);

  // Gửi danh sách ảnh đi chấm điểm
  const handleGrade = async () => {
    if (images.length === 0) return;
    setLoading(true);
    setHint(null);
    setStatus("Đang gửi ảnh...");
    speak("Đợi một chút nhé, cô giáo đang xem kỹ từng trang bài của bé đây...");

    try {
      const response = await fetch("/api/grade", {
        method: "POST",
        body: JSON.stringify({ images, subject }),
      });
      
      setStatus("Đang phân tích bài...");
      
      if (!response.ok) {
        throw new Error(`Lỗi máy chủ (${response.status})`);
      }

      const data = await response.json();
      setResult(data);

      // Phát âm lời nhận xét
      if (data.feedback) {
        speak(data.feedback);
      }

      // Chỉ tặng quà khi điểm số > 0 và không có lỗi bài tập
      if (data.score > 0 && data.errors && data.errors.length === 0) {
        db.addSticker({
          id: Date.now().toString(),
          userId: "user-1",
          type: "star",
          imageUrl: "⭐",
          earnedAt: new Date(),
        });
        
        setTimeout(() => setShowReward(true), 2000);
      }
    } catch (error: any) {
      console.error("Lỗi:", error);
      setResult({
        score: 0,
        feedback: `Ối, có lỗi rồi: ${error.message}. Ba mẹ thử lại nhé!`,
        errors: []
      });
      speak("Ôi, máy móc bị hỏng một chút, bé thử lại sau nhé!");
    } finally {
      setLoading(false);
      setStatus(null);
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

      <div className="flex justify-between items-end">
        <h2 className="text-3xl font-extrabold text-[#4D96FF]">
          {subject === 'math' ? 'Môn Toán 🔢' : 'Tiếng Việt ✍️'}
        </h2>
        {images.length > 0 && !result && (
          <span className="text-sm font-bold text-gray-400">Đã chọn {images.length}/3 ảnh</span>
        )}
      </div>

      {images.length === 0 ? (
        // Màn hình chọn ảnh
        <motion.label 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-full aspect-[3/4] border-4 border-dashed border-gray-300 rounded-[40px] flex flex-col items-center justify-center gap-4 cursor-pointer bg-gray-50 hover:bg-blue-50 transition-colors"
        >
          <div className="bg-[#4D96FF] p-6 rounded-full shadow-lg shadow-blue-200">
            <Camera size={64} className="text-white" />
          </div>
          <div className="text-center px-8">
            <span className="text-gray-500 font-bold text-xl block">Bấm để chụp ảnh bài tập của bé!</span>
            <span className="text-gray-400 font-medium text-sm mt-2 block">(Ba mẹ có thể chọn từ 1 đến 3 ảnh cùng lúc nhé)</span>
          </div>
          <input type="file" accept="image/*" multiple className="hidden" onChange={handleImageUpload} />
        </motion.label>
      ) : (
        // Màn hình hiển thị ảnh và kết quả
        <div className="flex flex-col gap-6">
          <ImageAnnotator 
            imageUrls={images} 
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
              className="sticky bottom-24 z-10 bg-red-50 border-2 border-red-200 p-4 rounded-2xl text-red-600 font-bold text-lg text-center shadow-lg"
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
                className="w-full bg-[#FF6B6B] text-white py-5 rounded-[24px] font-bold text-2xl shadow-lg shadow-red-200 flex flex-col items-center justify-center gap-1 active:scale-95 transition-transform disabled:bg-gray-400"
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin" size={32} />
                    {status && <span className="text-sm font-medium">{status}</span>}
                  </>
                ) : (
                  "Chấm điểm ngay!"
                )}
              </button>
            ) : (
              <div className={`${result.score > 0 ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'} p-6 rounded-[24px] border-2 flex flex-col items-center gap-2`}>
                {result.score > 0 ? (
                  <CheckCircle2 className="text-green-500" size={48} />
                ) : (
                  <div className="bg-red-500 text-white p-3 rounded-full mb-2">
                    <Camera size={32} />
                  </div>
                )}
                <p className={`${result.score > 0 ? 'text-green-700' : 'text-red-700'} font-bold text-xl text-center`}>
                  {result.feedback}
                </p>
                <button 
                  onClick={() => setImages([])}
                  className={`mt-4 ${result.score > 0 ? 'text-green-600' : 'text-red-600'} font-bold underline`}
                >
                  Chụp bài khác
                </button>
              </div>
            )}
            
            {!loading && !result && (
              <button 
                onClick={() => setImages([])}
                className="text-gray-400 font-semibold"
              >
                Chọn lại ảnh khác
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
