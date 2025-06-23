import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const useUserStore = create(
  persist(
    (set) => ({
      // Game Date
      gameDate: {
        year: 2025,
        month: 6,
        day: 21,
        formatted: "2025년 6월 21일",
      },
      updateGameDate: (year, month, day) =>
        set(() => ({
          gameDate: {
            year,
            month,
            day,
            formatted: `${year}년 ${month}월 ${day}일`,
          },
        })),
      advanceGameDate: (days = 1) =>
        set((state) => {
          const { year, month, day } = state.gameDate;
          const date = new Date(year, month - 1, day + days);
          return {
            gameDate: {
              year: date.getFullYear(),
              month: date.getMonth() + 1,
              day: date.getDate(),
              formatted: `${date.getFullYear()}년 ${
                date.getMonth() + 1
              }월 ${date.getDate()}일`,
            },
          };
        }),

      // User Profile
      user: {
        name: "투자왕초보",
        avatar: "/characters/1201.gif", // Default avatar
        title: "농부", // 칭호
        experience: "8년차", // 경력
        level: 1, // 레벨
        totalTrades: 0, // 총 거래 횟수
        joinDate: "2024-01-01", // 가입일
      },
      updateUsername: (name) =>
        set((state) => ({ user: { ...state.user, name } })),
      updateAvatar: (avatar) =>
        set((state) => ({ user: { ...state.user, avatar } })),
      updateTitle: (title) =>
        set((state) => ({ user: { ...state.user, title } })),
      updateExperience: (experience) =>
        set((state) => ({ user: { ...state.user, experience } })),
      updateLevel: (level) =>
        set((state) => ({ user: { ...state.user, level } })),
      updateTotalTrades: (totalTrades) =>
        set((state) => ({ user: { ...state.user, totalTrades } })),
      incrementTotalTrades: () =>
        set((state) => ({
          user: { ...state.user, totalTrades: state.user.totalTrades + 1 },
        })),

      // Vehicle
      vehicleLevel: 0, // 0: 손수레, 1: 자전거, ...
      setVehicleLevel: (level) => set({ vehicleLevel: level }),

      // Inventory for items
      inventory: {
        // e.g., red_potion: 5, blue_potion: 2
      },
      setInventory: (inventory) => set({ inventory }),

      // Assets
      assets: {
        cash: 30000000,
        stocks: [
          {
            id: 1,
            name: "삼성전자",
            quantity: 8,
            avgBuyPrice: 56000,
            imageUrl: "/src/assets/stockIcon/005930.png",
          },
          {
            id: 2,
            name: "SK하이닉스",
            quantity: 5,
            avgBuyPrice: 180000,
            imageUrl: "/src/assets/stockIcon/000660.png",
          },
        ],
      },
      addStock: (stock) =>
        set((state) => ({
          assets: { ...state.assets, stocks: [...state.assets.stocks, stock] },
        })),
      updateStock: (updatedStock) =>
        set((state) => ({
          assets: {
            ...state.assets,
            stocks: state.assets.stocks.map((stock) =>
              stock.id === updatedStock.id ? updatedStock : stock
            ),
          },
        })),
      updateCash: (amount) =>
        set((state) => ({
          assets: { ...state.assets, cash: state.assets.cash + amount },
        })),
      updateStocks: (newStocks) =>
        set((state) => ({ assets: { ...state.assets, stocks: newStocks } })),

      // Friends
      friends: [
        {
          id: 4,
          name: "상한가헌터",
          avatarUrl: "/characters/104.gif",
          profitRate: 300,
          cash: 10000000,
        },
        {
          id: 5,
          name: "기관",
          avatarUrl: "/characters/105.gif",
          profitRate: 500,
          cash: 100000000,
        },
        {
          id: 6,
          name: "외인",
          avatarUrl: "/characters/106.gif",
          profitRate: 1000,
          cash: 1000000000,
        },
      ],
      addFriend: (friend) =>
        set((state) => ({ friends: [...state.friends, friend] })),

      // Transactions
      transactions: [],
      addTransaction: (transaction) =>
        set((state) => ({
          transactions: [
            { ...transaction, date: new Date().toISOString() },
            ...state.transactions,
          ],
        })),
    }),
    {
      name: "user-storage", // Key in localStorage
      storage: createJSONStorage(() => localStorage), // Use localStorage
    }
  )
);

export default useUserStore;
