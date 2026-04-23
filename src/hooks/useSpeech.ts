"use client";

/**
 * Hook hỗ trợ phát giọng nói từ văn bản (Text-to-Speech)
 */
export function useSpeech() {
  const speak = (text: string) => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      // Hủy các câu nói cũ đang chờ
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "vi-VN"; // Thiết lập tiếng Việt
      utterance.rate = 0.9;     // Nói chậm lại một chút cho bé dễ nghe
      utterance.pitch = 1.1;    // Giọng cao hơn một chút cho thân thiện

      window.speechSynthesis.speak(utterance);
    } else {
      console.warn("Trình duyệt này không hỗ trợ phát giọng nói.");
    }
  };

  return { speak };
}
