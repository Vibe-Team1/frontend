import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import {
  executeTrade,
  getAccountInfo,
  getUserStocks,
  getPortfolio,
} from "../api/tradeApi";
import {
  getMe,
  updateMe,
  getFriends,
  addFriend,
  getAllUsers,
} from "../api/accountApi";

const today = new Date();
const initialGameDate = {
  year: today.getFullYear(),
  month: today.getMonth() + 1,
  day: today.getDate(),
  formatted: `${today.getFullYear()}년 ${
    today.getMonth() + 1
  }월 ${today.getDate()}일`,
};

const useUserStore = create(
  persist(
    (set, get) => ({
      // Game Date
      gameDate: initialGameDate,
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
      user: null,
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

      // 현재 선택된 캐릭터 정보
      selectedCharacter: {
        characterCode: 12, // 캐릭터 코드 (1, 2, 3, ..., 12)
        costumeCode: 1, // 의상 코드 (1, 2, ..., 15)
      },
      // 현재 선택된 테마 정보
      selectedTheme: {
        background: null, // MainPage에서 기본 배경을 사용
      },
      // 캐릭터 변경 함수
      updateSelectedCharacter: (characterCode) =>
        set((state) => ({
          selectedCharacter: { ...state.selectedCharacter, characterCode },
          user: {
            ...state.user,
            avatar: `/characters/${characterCode}${state.selectedCharacter.costumeCode
              .toString()
              .padStart(2, "0")}.gif`,
          },
        })),
      // 의상 변경 함수
      updateSelectedCostume: (costumeCode) =>
        set((state) => ({
          selectedCharacter: { ...state.selectedCharacter, costumeCode },
          user: {
            ...state.user,
            avatar: `/characters/${
              state.selectedCharacter.characterCode
            }${costumeCode.toString().padStart(2, "0")}.gif`,
          },
        })),
      // 테마 변경 함수
      updateSelectedTheme: (background) =>
        set((state) => ({
          selectedTheme: { ...state.selectedTheme, background },
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
        cash: 1000000, // 초기값, API에서 업데이트
        stocks: [], // 보유 주식 목록
        acorn: 5, // 도토리
      },
      addStock: (stock) =>
        set((state) => ({
          assets: {
            ...state.assets,
            stocks: [...state.assets.stocks, stock],
          },
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
          assets: {
            ...state.assets,
            cash: state.assets.cash + amount,
          },
        })),
      updateAcorn: (amount) =>
        set((state) => ({
          assets: {
            ...state.assets,
            acorn: state.assets.acorn + amount,
          },
        })),
      updateStocks: (newStocks) =>
        set((state) => ({
          assets: {
            ...state.assets,
            stocks: newStocks,
          },
        })),

      // Friends
      friends: [],
      addFriend: (friend) =>
        set((state) => ({ friends: [...state.friends, friend] })),

      // 전체 사용자 목록
      users: [],

      // Transactions
      transactions: [],
      addTransaction: (transaction) =>
        set((state) => ({
          transactions: [
            { ...transaction, date: new Date().toISOString() },
            ...state.transactions,
          ],
        })),

      // 거래 관련
      totalTrades: 0,
      portfolio: null,

      // 로딩 상태
      isLoading: false,
      error: null,

      // 백엔드 API 연동 함수들
      fetchAccountInfo: async () => {
        set({ isLoading: true, error: null });
        try {
          const response = await getAccountInfo();
          const accountData = response.data.data;

          set((state) => ({
            assets: {
              ...state.assets,
              cash: accountData.balance,
              acorn: accountData.acorn,
            },
            isLoading: false,
          }));
        } catch (error) {
          console.error("계좌 정보 조회 실패:", error);
          set({
            error: "계좌 정보를 불러오는데 실패했습니다.",
            isLoading: false,
          });
        }
      },

      fetchUserStocks: async () => {
        set({ isLoading: true, error: null });
        try {
          const response = await getUserStocks();
          const stocksData = response.data.data;

          // 백엔드 응답을 프론트엔드 형식으로 변환
          const formattedStocks = stocksData.map((stock) => ({
            id: stock.id || Date.now() + Math.random(),
            name: stock.stockName,
            quantity: stock.quantity,
            avgBuyPrice: stock.averagePrice,
            imageUrl: `/src/assets/stockIcon/${stock.stockCode}.png`,
            stockCode: stock.stockCode,
          }));

          set((state) => ({
            assets: {
              ...state.assets,
              stocks: formattedStocks,
            },
            isLoading: false,
          }));
        } catch (error) {
          console.error("보유 주식 조회 실패:", error);
          set({
            error: "보유 주식을 불러오는데 실패했습니다.",
            isLoading: false,
          });
        }
      },

      fetchPortfolio: async () => {
        set({ isLoading: true, error: null });
        try {
          const response = await getPortfolio();
          const portfolioData = response.data.data;

          set({
            portfolio: portfolioData,
            isLoading: false,
          });
        } catch (error) {
          console.error("포트폴리오 조회 실패:", error);
          set({
            error: "포트폴리오를 불러오는데 실패했습니다.",
            isLoading: false,
          });
        }
      },

      // 주식 매매 실행 (백엔드 API 호출)
      executeTrade: async (tradeData) => {
        set({ isLoading: true, error: null });
        try {
          const response = await executeTrade(tradeData);
          const tradeResult = response.data.data;

          // 거래 완료 후 계좌 정보와 보유 주식 업데이트
          await get().fetchAccountInfo();
          await get().fetchUserStocks();

          set({ isLoading: false });

          // 성공 메시지 반환
          return {
            success: true,
            message:
              tradeData.tradeType === "BUY"
                ? "매수가 완료되었습니다!"
                : "매도가 완료되었습니다!",
            data: tradeResult,
          };
        } catch (error) {
          console.error("거래 실행 실패:", error);
          const errorMessage =
            error.response?.data?.message || "거래 실행에 실패했습니다.";
          set({
            error: errorMessage,
            isLoading: false,
          });

          return {
            success: false,
            message: errorMessage,
          };
        }
      },

      fetchMe: async () => {
        try {
          const response = await getMe();
          const userData = response.data.data;
          const avatar = "/characters/101.gif";
          set({ user: { ...userData, avatar } });
        } catch (error) {
          console.error("유저 정보 조회 실패:", error);
          set({ user: null });
        }
      },

      initializeData: async () => {
        await get().fetchMe();
        await get().fetchAccountInfo();
        await get().fetchUserStocks();
        await get().fetchPortfolio();
      },

      // 에러 초기화
      clearError: () => set({ error: null }),

      // 유저 정보(닉네임, 아바타 등) 변경 및 store 갱신
      updateMeInStore: async (data) => {
        try {
          await updateMe(data); // PATCH
          await get().fetchMe(); // 변경 후 최신 정보로 갱신
          return { success: true };
        } catch (error) {
          console.error("유저 정보 변경 실패:", error);
          return { success: false, error };
        }
      },

      // 친구 목록 불러오기 (API)
      fetchFriends: async () => {
        try {
          const response = await getFriends();
          // API 응답에 따라 friends 데이터 구조 맞춤
          const friendsData = response.data.data || [];
          const formattedFriends = friendsData.map((friend) => ({
            id: friend.userId,
            userId: friend.userId,
            name: friend.nickname,
            nickname: friend.nickname,
            avatarUrl: "/characters/101.gif", // 기본 아바타
            profitRate: 0, // 기본값
            cash: 0, // 기본값
          }));
          set({ friends: formattedFriends });
        } catch (error) {
          console.error("친구 목록 불러오기 실패:", error);
        }
      },

      // 친구 추가 (API)
      addFriendAsync: async (friendIdOrObj) => {
        try {
          // friendIdOrObj가 id면 { friendId: ... }로, 객체면 그대로
          const payload =
            typeof friendIdOrObj === "string" ||
            typeof friendIdOrObj === "number"
              ? { friendId: friendIdOrObj }
              : friendIdOrObj;
          await addFriend(payload);
          await get().fetchFriends(); // 추가 후 목록 갱신
          return { success: true };
        } catch (error) {
          console.error("친구 추가 실패:", error);
          let errorMessage = "친구 추가에 실패했습니다.";

          if (error.response?.data?.message) {
            errorMessage = error.response.data.message;
          } else if (error.response?.status === 409) {
            errorMessage = "이미 친구 관계가 존재합니다.";
          } else if (error.response?.status === 400) {
            errorMessage = "자신을 친구로 추가할 수 없습니다.";
          }

          return { success: false, error: errorMessage };
        }
      },

      // 전체 사용자 목록 조회 (API)
      fetchAllUsers: async () => {
        try {
          const response = await getAllUsers();
          const usersData = response.data.data || [];
          const formattedUsers = usersData.map((user) => ({
            userId: user.userId,
            nickname: user.nickname,
          }));
          set({ users: formattedUsers });
        } catch (error) {
          console.error("전체 사용자 목록 조회 실패:", error);
        }
      },
    }),
    {
      name: "user-storage", // Key in localStorage
      storage: createJSONStorage(() => localStorage), // Use localStorage
    }
  )
);

export default useUserStore;
