import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata = {
  title: "AI Tutor Lớp 1 - Người bạn học tập thông minh",
  description: "Ứng dụng AI giúp bé lớp 1 tự học và sửa bài tập qua ảnh chụp.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body className={`${outfit.variable} font-sans bg-[#FDFCF0] text-[#4A4A4A] min-h-screen`}>
        <div className="max-w-md mx-auto min-h-screen flex flex-col relative overflow-hidden shadow-2xl bg-white">
          {/* Nền trang trí phía sau */}
          <div className="absolute top-[-10%] right-[-10%] w-64 h-64 bg-pink-200 rounded-full blur-3xl opacity-30 -z-10" />
          <div className="absolute bottom-[-5%] left-[-10%] w-72 h-72 bg-blue-200 rounded-full blur-3xl opacity-30 -z-10" />
          
          <main className="flex-1 flex flex-col p-6 pt-12">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
