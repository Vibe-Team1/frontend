import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

const useUserStore = create(
  persist(
    (set) => ({
      // Game Date
      gameDate: {
        year: 2025,
        month: 6,
        day: 21,
        formatted: '2025년 6월 21일'
      },
      updateGameDate: (year, month, day) => set(() => ({
        gameDate: {
          year,
          month,
          day,
          formatted: `${year}년 ${month}월 ${day}일`
        }
      })),
      advanceGameDate: (days = 1) => set((state) => {
        const { year, month, day } = state.gameDate;
        const date = new Date(year, month - 1, day + days);
        return {
          gameDate: {
            year: date.getFullYear(),
            month: date.getMonth() + 1,
            day: date.getDate(),
            formatted: `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`
          }
        };
      }),

      // User Profile
      user: {
        name: '투자왕초보',
        avatar: 'https://i.pravatar.cc/150?img=10', // Default avatar
        title: '농부', // 칭호
        experience: '8년차', // 경력
        level: 1, // 레벨
        totalTrades: 0, // 총 거래 횟수
        joinDate: '2024-01-01', // 가입일
      },
      updateUsername: (name) => set((state) => ({ user: { ...state.user, name } })),
      updateAvatar: (avatar) => set((state) => ({ user: { ...state.user, avatar } })),
      updateTitle: (title) => set((state) => ({ user: { ...state.user, title } })),
      updateExperience: (experience) => set((state) => ({ user: { ...state.user, experience } })),
      updateLevel: (level) => set((state) => ({ user: { ...state.user, level } })),
      updateTotalTrades: (totalTrades) => set((state) => ({ user: { ...state.user, totalTrades } })),
      incrementTotalTrades: () => set((state) => ({ user: { ...state.user, totalTrades: state.user.totalTrades + 1 } })),

      // Assets
      assets: {
        cash: 30000000,
        stocks: [
            { id: 1, name: '삼성전자', quantity: 8, avgBuyPrice: 56000, imageUrl: '/src/assets/stockIcon/005930.png' },
            { id: 2, name: 'SK하이닉스', quantity: 5, avgBuyPrice: 180000, imageUrl: '/src/assets/stockIcon/000660.png' },
        ],
      },
      addStock: (stock) => set((state) => ({ assets: { ...state.assets, stocks: [...state.assets.stocks, stock] } })),
      updateStock: (updatedStock) => set((state) => ({
        assets: {
          ...state.assets,
          stocks: state.assets.stocks.map(stock => stock.id === updatedStock.id ? updatedStock : stock),
        }
      })),
      updateCash: (amount) => set((state) => ({ assets: { ...state.assets, cash: state.assets.cash + amount } })),
      updateStocks: (newStocks) => set((state) => ({ assets: { ...state.assets, stocks: newStocks } })),

      // Friends
      friends: [
        { id: 1, name: '주식왕초보', profitRate: 15.78, cash: 1250000, avatarUrl: 'https://i.pravatar.cc/150?img=1' },
        { id: 2, name: '매수버튼고장남', profitRate: -5.20, cash: 890000, avatarUrl: 'https://i.pravatar.cc/150?img=2' },
        { id: 3, name: '떡상가즈아', profitRate: 32.11, cash: 3400000, avatarUrl: 'https://i.pravatar.cc/150?img=3' },
      ],
      addFriend: (friend) => set((state) => ({ friends: [...state.friends, friend] })),
    }),
    {
      name: 'user-storage', // Key in localStorage
      storage: createJSONStorage(() => localStorage), // Use localStorage
    }
  )
);

export default useUserStore; 