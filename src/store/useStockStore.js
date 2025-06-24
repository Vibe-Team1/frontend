import { create } from "zustand";

const useStockStore = create((set, get) => ({
  // 실시간 주식 데이터
  stockData: [],

  // 연결 상태
  isConnected: false,
  connectionStatus: "",

  // 주식 코드와 이름 매핑 (6개 종목만)
  stockCodeToName: {
    "005930": "삼성전자",
    "000660": "SK하이닉스",
    "035420": "NAVER",
    105560: "KB금융",
    181710: "NHN",
    "003550": "LG",
  },

  // 주식 코드와 이미지 매핑 (6개 종목만)
  stockCodeToImage: {
    "005930": "/src/assets/stockIcon/005930.png",
    "000660": "/src/assets/stockIcon/000660.png",
    "035420": "/src/assets/stockIcon/035420.png",
    105560: "/src/assets/stockIcon/105560.png",
    181710: "/src/assets/stockIcon/181710.png",
    "003550": "/src/assets/stockIcon/003550.png",
  },

  // 액션들
  setStockData: (incoming) =>
    set((state) => {
      // 항상 배열로 변환
      const newData = Array.isArray(incoming) ? incoming : [incoming];
      // 6개 종목만 허용
      const allowedCodes = [
        "005930",
        "000660",
        "035420",
        "105560",
        "181710",
        "003550",
      ];
      let updated = Array.isArray(state.stockData) ? [...state.stockData] : [];
      newData.forEach((item) => {
        if (!allowedCodes.includes(item.stockCode?.toString())) return;
        const idx = updated.findIndex((s) => s.stockCode === item.stockCode);
        if (idx !== -1) {
          updated[idx] = { ...updated[idx], ...item };
        } else {
          updated.push(item);
        }
      });
      // 6개 종목만 나머지 제거
      updated = updated.filter((item) =>
        allowedCodes.includes(item.stockCode?.toString())
      );
      return { stockData: updated };
    }),

  setConnectionStatus: (isConnected, status) =>
    set({ isConnected, connectionStatus: status }),

  // 주식 이름으로 데이터 찾기
  getStockByName: (name) => {
    const { stockData, stockCodeToName } = get();
    const stockCode = Object.keys(stockCodeToName).find(
      (code) => stockCodeToName[code] === name
    );
    return stockData.find((stock) => stock.stockCode === stockCode);
  },

  // 주식 코드로 데이터 찾기
  getStockByCode: (code) => {
    const { stockData } = get();
    return stockData.find((stock) => stock.stockCode === code);
  },

  // 모든 주식 데이터를 UI용으로 변환
  getFormattedStockData: () => {
    const { stockData, stockCodeToName, stockCodeToImage } = get();
    const codes = ["005930", "000660", "035420", "105560", "181710", "003550"];
    // stockData가 배열이 아니면 빈 배열로 처리
    const safeStockData = Array.isArray(stockData) ? stockData : [];
    return codes.map((code) => {
      const stock = safeStockData.find((s) => s.stockCode === code);
      return {
        id: code,
        stockCode: code,
        name: stock?.stockName || stockCodeToName[code] || "알 수 없는 종목",
        imageUrl: stockCodeToImage[code] || "/src/assets/stockIcon/default.png",
        price: stock?.currentPrice ?? 0,
        change: stock?.changeAmount ?? 0,
        changePercent: stock?.changeRate ?? 0,
        volume: stock?.volume ?? 0,
        highPrice: stock?.highPrice ?? 0,
        lowPrice: stock?.lowPrice ?? 0,
        openPrice: stock?.openPrice ?? 0,
        previousDayClosePrice: stock?.previousDayClosePrice ?? 0,
      };
    });
  },
}));

export default useStockStore;
