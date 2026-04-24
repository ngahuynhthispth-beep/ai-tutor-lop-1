"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ErrorLocation } from "@/types";

interface ImageAnnotatorProps {
  imageUrls: string[];
  errors: ErrorLocation[];
  onShowHint: (message: string) => void;
}

/**
 * Component hiển thị danh sách ảnh bài tập và vẽ các vòng tròn lỗi sai trên từng ảnh tương ứng
 */
export const ImageAnnotator: React.FC<ImageAnnotatorProps> = ({ imageUrls, errors, onShowHint }) => {
  return (
    <div className="flex flex-col gap-8">
      {imageUrls.map((url, imgIndex) => (
        <div key={imgIndex} className="relative w-full aspect-[3/4] bg-gray-100 rounded-3xl overflow-hidden shadow-inner border-4 border-white">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src={url} 
            alt={`Homework Page ${imgIndex + 1}`} 
            className="w-full h-full object-contain"
          />

          {/* Vẽ các vùng lỗi sai cho ảnh này */}
          <AnimatePresence>
            {errors
              .filter(error => (error.imageIndex ?? 0) === imgIndex)
              .map((error, errIndex) => (
                <motion.div
                  key={`${imgIndex}-${errIndex}`}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.5 + errIndex * 0.2, type: "spring" }}
                  onClick={() => onShowHint(error.message)}
                  className="absolute border-4 border-[#FF6B6B] rounded-full cursor-pointer bg-red-400/10 hover:bg-red-400/30 transition-colors"
                  style={{
                    left: `${error.x}%`,
                    top: `${error.y}%`,
                    width: `${error.width}%`,
                    height: `${error.height}%`,
                  }}
                >
                  <motion.div 
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                    className="absolute inset-0 border-2 border-white rounded-full" 
                  />
                </motion.div>
              ))}
          </AnimatePresence>
          
          {/* Nhãn đánh dấu số trang */}
          <div className="absolute top-4 left-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm font-bold backdrop-blur-sm">
            Trang {imgIndex + 1}
          </div>
        </div>
      ))}
    </div>
  );
};
