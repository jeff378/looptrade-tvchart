import './globals.css'
import Sidebar from './components/Sidebar'

export const metadata = {
  title: "LoopTrade Dashboard",
  description: "AI 기반 자동매매 전략 통합 대시보드",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body className="bg-black text-white font-sans antialiased">
        <div className="flex justify-between">
          <div className="flex-1 min-h-screen">{children}</div>
          <Sidebar />
        </div>
      </body>
    </html>
  )
}
