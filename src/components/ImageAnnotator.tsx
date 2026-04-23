"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ErrorLocation } from "@/types";

interface ImageAnnotatorProps {
  imageUrl: string;
  errors: ErrorLocation[];
  onShowHint: (message: string) => void;
}

/**
 * Component hiển thị ảnh bài tập và vẽ các vòng tròn lỗi sai
 */
export const ImageAnnotator: React.FC<ImageAnnotatorProps> = ({ imageUrl, errors, onShowHint }) => {
  return (
    <div className="relative w-full aspect-[3/4] bg-gray-100 rounded-3xl overflow-hidden shadow-inner border-4 border-white">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img 
        src={imageUrl} 
        alt="Homework" 
        className="w-full h-full object-contain"
      />

      {/* Vẽ các vùng lỗi sai */}
      <AnimatePresence>
        {errors.map((error, index) => (
          <motion.div
            key={index}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5 + index * 0.2, type: "spring" }}
            onClick={() => onShowHint(error.message)}
            className="absolute border-4 border-[#FF6B6B] rounded-full cursor-pointer bg-red-400/10 hover:bg-red-400/30 transition-colors"
            style={{
              left: `${error.x}%`,
              top: `${error.y}%`,
              width: `${error.width}%`,
              height: `${error.height}%`,
            }}
          >
            {/* Hiệu ứng nhấp nháy để thu hút sự chú ý */}
            <motion.div 
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="absolute inset-0 border-2 border-white rounded-full" 
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
