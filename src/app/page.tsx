"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Calculator, BookOpen, Star, Camera } from "lucide-react";
import Link from "next/link";
import { db } from "@/lib/database";
import { Sticker } from "@/types";

export default function Dashboard() {
  const [stickers, setStickers] = useState<Sticker[]>([]);

  useEffect(() => {
    setStickers(db.getStickers());
  }, []);

  return (
    <div className="flex flex-col items-center gap-8 animate-in fade-in duration-700">
      {/* Header Chào Bé */}
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-center"
      >
        <h1 className="text-4xl font-bold text-[#FF6B6B] mb-2 drop-shadow-sm">Chào bé yêu! 👋</h1>
        <p className="text-lg text-gray-500 font-medium">Hôm nay chúng mình học gì nào?</p>
      </motion.div>

      {/* Grid chọn môn học */}
      <div className="grid grid-cols-1 gap-6 w-full max-w-xs">
        <MenuCard 
          href="/grade/math"
          title="Toán Học"
          icon={<Calculator size={48} className="text-white" />}
          color="bg-[#4D96FF]"
          delay={0.1}
        />
        <MenuCard 
          href="/grade/vietnamese"
          title="Tiếng Việt"
          icon={<BookOpen size={48} className="text-white" />}
          color="bg-[#6BCB77]"
          delay={0.2}
        />
      </div>

      {/* Bảng Sticker mini */}
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mt-8 p-6 bg-yellow-50 rounded-3xl border-4 border-yellow-200 w-full flex flex-col items-center gap-4"
      >
        <div className="flex items-center gap-2 text-yellow-600 font-bold text-xl">
          <Star fill="currentColor" />
          <span>Kho báu Sticker ({stickers.length})</span>
          <Star fill="currentColor" />
        </div>
        <div className="flex gap-3 overflow-x-auto w-full justify-center pb-2">
          {stickers.length > 0 ? (
            stickers.slice(-3).map((s, i) => (
              <motion.div 
                key={s.id}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5 + i * 0.1 }}
                className="w-16 h-16 bg-white rounded-2xl shadow-md border-2 border-yellow-200 flex items-center justify-center text-3xl"
              >
                {s.imageUrl}
              </motion.div>
            ))
          ) : (
            [1, 2, 3].map((i) => (
              <div key={i} className="w-16 h-16 bg-white rounded-2xl shadow-sm border-2 border-dashed border-yellow-200 flex items-center justify-center text-2xl">
                ❓
              </div>
            ))
          )}
        </div>
        <button className="text-yellow-600 font-semibold underline underline-offset-4">Xem tất cả</button>
      </motion.div>
    </div>
  );
}

function MenuCard({ href, title, icon, color, delay }: any) {
  return (
    <Link href={href} className="w-full">
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay }}
        className={`${color} p-6 rounded-[32px] shadow-lg flex items-center gap-6 cursor-pointer border-b-8 border-black/10 active:border-b-0 active:translate-y-2 transition-all`}
      >
        <div className="bg-white/20 p-4 rounded-2xl">
          {icon}
        </div>
        <span className="text-white text-2xl font-bold tracking-wide">{title}</span>
      </motion.div>
    </Link>
  );
}
