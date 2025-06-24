import api from './axiosInstance';

// 주식 매매 실행
export const executeTrade = (tradeData) => {
  const request = {
    stockCode: tradeData.stockCode,
    stockName: tradeData.stockName,
    quantity: tradeData.quantity,
    price: tradeData.price,
    tradeType: tradeData.tradeType // 'BUY' 또는 'SELL'
  };
  return api.post('/api/v1/trades', request);
};

// 포트폴리오 조회
export const getPortfolio = () => api.get('/api/v1/trades/portfolio');

// 거래 내역 조회
export const getTradeHistory = () => api.get('/api/v1/trades/history');

// 특정 주식 거래 내역 조회
export const getStockTradeHistory = (stockCode) => 
  api.get(`/api/v1/trades/stock/${stockCode}/history`);

// 계좌 정보 조회
export const getAccountInfo = () => api.get('/api/v1/accounts');

// 사용자 보유 주식 조회
export const getUserStocks = () => api.get('/api/v1/users/stocks'); 