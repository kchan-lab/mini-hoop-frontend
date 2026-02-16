"use client";

import { User } from "lucide-react";
import { ParentRegisterForm } from "./ParentRegisterForm";

export function ParentRegisterPage() {
  return (
    <div className="min-h-screen bg-amber-50/50 pb-6">
      {/* ヘッダー */}
      <div className="bg-gradient-to-br from-amber-700 to-amber-600 text-white p-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.15),transparent_70%)]" />
        <div className="relative">
          <h1 className="flex items-center gap-2 mb-2">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur">
              <User className="w-6 h-6" />
            </div>
            保護者情報登録
          </h1>
          <p className="text-sm opacity-90 ml-12">
            お子様の情報を入力してください
          </p>
        </div>
      </div>

      {/* フォーム */}
      <div className="max-w-md md:max-w-2xl mx-auto px-4 mt-6">
        <ParentRegisterForm />
      </div>
    </div>
  );
}
