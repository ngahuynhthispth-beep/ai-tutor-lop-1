/**
 * @file lib/database.ts
 * Quản lý việc lưu trữ dữ liệu. 
 * Hiện tại đang dùng LocalStorage để chạy nhanh, sau này dễ dàng nâng cấp lên Supabase.
 */

import { User, Homework, Sticker } from "@/types";

const KEYS = {
  USER: "ai_tutor_user",
  HOMEWORK: "ai_tutor_homework",
  STICKERS: "ai_tutor_stickers",
};

export const db = {
  // --- USER ---
  getUser: (): User | null => {
    if (typeof window === "undefined") return null;
    const data = localStorage.getItem(KEYS.USER);
    return data ? JSON.parse(data) : null;
  },

  saveUser: (user: User) => {
    localStorage.setItem(KEYS.USER, JSON.stringify(user));
  },

  // --- HOMEWORK ---
  getHomeworkList: (): Homework[] => {
    if (typeof window === "undefined") return [];
    const data = localStorage.getItem(KEYS.HOMEWORK);
    return data ? JSON.parse(data) : [];
  },

  saveHomework: (homework: Homework) => {
    const list = db.getHomeworkList();
    const index = list.findIndex((h) => h.id === homework.id);
    if (index > -1) {
      list[index] = homework;
    } else {
      list.push(homework);
    }
    localStorage.setItem(KEYS.HOMEWORK, JSON.stringify(list));
  },

  // --- STICKERS ---
  getStickers: (): Sticker[] => {
    if (typeof window === "undefined") return [];
    const data = localStorage.getItem(KEYS.STICKERS);
    return data ? JSON.parse(data) : [];
  },

  addSticker: (sticker: Sticker) => {
    const list = db.getStickers();
    list.push(sticker);
    localStorage.setItem(KEYS.STICKERS, JSON.stringify(list));
    
    // Cập nhật tổng số sticker của User
    const user = db.getUser();
    if (user) {
      user.totalStickers = list.length;
      db.saveUser(user);
    }
  },
};
