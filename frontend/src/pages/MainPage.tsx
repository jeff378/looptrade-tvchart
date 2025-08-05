import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

export default function MainPage() {
  const navigate = useNavigate();

  const pages = [
    { title: "백테스트 실행기", route: "/backtest" },
    { title: "전략 성능 차트", route: "/charts" },
    { title: "전략 상세 분석", route: "/analysis" },
    { title: "텔레그램 알림 설정", route: "/settings" },
    { title: "전략 판단기 트리거", route: "/trigger" },
    { title: "실시간 판단 알림", route: "/alert" }
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-10">
      <h1 className="text-3xl font-bold mb-6">LoopTrade 메인 페이지</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">
        {pages.map((page) => (
          <Card key={page.route} className="cursor-pointer hover:shadow-xl" onClick={() => navigate(page.route)}>
            <CardContent className="p-6 text-center text-lg font-semibold">
              {page.title}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}