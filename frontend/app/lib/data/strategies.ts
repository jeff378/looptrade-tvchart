export type Strategy = {
  id: string
  name: string
  winRate: number
  successCount: number
  priority: number
  description: string
  status: '사용 중' | '비활성화'
  condition: string
  lastUpdated: string
}

export const strategies: Strategy[] = [
  {
    id: "s1",
    name: "추세선 돌파",
    winRate: 70.2,
    successCount: 31,
    priority: 1,
    description: "세 번 터치 후 볼린저밴드 확장에 따라 롱 진입.",
    status: "사용 중",
    condition: "3번 터치 후 볼밴 확장",
    lastUpdated: "2025-08-03"
  },
  {
    id: "s2",
    name: "RSI 다이버전스 쌍바닥",
    winRate: 65.8,
    successCount: 24,
    priority: 2,
    description: "RSI 하단 다이버전스와 쌍바닥 구조 + 캔들 반전 발생 시 진입.",
    status: "비활성화",
    condition: "RSI 다이버전스 쌍바닥 + 캔들 반전",
    lastUpdated: "2025-07-29"
  }
]
