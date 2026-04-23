"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { Star, Trophy } from "lucide-react";

interface RewardModalProps {
  isOpen: boolean;
  onClose: () => void;
  stickerEmoji?: string;
}

export const RewardModal: React.FC<RewardModalProps> = ({ isOpen, onClose, stickerEmoji = "🦄" }) => {
  useEffect(() => {
    if (isOpen) {
      // Pháo hoa chúc mừng
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#FF6B6B", "#4D96FF", "#FFD93D", "#6BCB77"]
      });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/50 backdrop-blur-sm">
        <motion.div
          initial={{ scale: 0.5, opacity: 0, rotate: -10 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          exit={{ scale: 0.5, opacity: 0 }}
          className="bg-white rounded-[40px] p-8 w-full max-w-sm text-center shadow-2xl border-8 border-yellow-300 relative overflow-hidden"
        >
          {/* Trang trí phía sau */}
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-yellow-100 rounded-full blur-2xl -z-10" />
          
          <div className="flex justify-center mb-4 text-yellow-400">
            <Trophy size={80} strokeWidth={2.5} />
          </div>

          <h2 className="text-4xl font-extrabold text-[#FF6B6B] mb-2">Tuyệt vời!</h2>
          <p className="text-xl text-gray-600 font-bold mb-6">Bé đã hoàn thành bài tập xuất sắc!</p>

          <div className="bg-yellow-50 rounded-3xl p-6 border-4 border-dashed border-yellow-200 mb-8">
            <p className="text-gray-500 font-bold mb-2">Bé nhận được 1 Sticker mới:</p>
            <div className="text-7xl animate-bounce mt-4">{stickerEmoji}</div>
          </div>

          <button
            onClick={onClose}
            className="w-full bg-[#6BCB77] text-white py-4 rounded-[24px] font-bold text-2xl shadow-lg shadow-green-200 active:scale-95 transition-transform"
          >
            Nhận quà thôi!
          </button>

          <div className="mt-4 flex justify-center gap-2">
            {[1, 2, 3].map(i => <Star key={i} size={20} fill="#FFD93D" className="text-yellow-400" />)}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
