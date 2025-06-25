import api from "./axiosInstance";

// 계좌 관련
export const getAccount = () => api.get("/api/v1/accounts");
export const getAcorn = () => api.get("/api/v1/accounts/acorn");
export const createAccount = (data) => api.post("/api/v1/accounts", data);
export const withdraw = (data) => api.post("/api/v1/accounts/withdraw", data);
export const deposit = (data) => api.post("/api/v1/accounts/deposit", data);
export const subtractAcorn = (data) =>
  api.post("/api/v1/accounts/acorn/subtract", data);
export const addAcorn = (data) => api.post("/api/v1/accounts/acorn/add", data);

// 친구 관련
export const getFriends = () => api.get("/api/v1/friends");
export const addFriend = (data) => api.post("/api/v1/friends", data);
export const getAllUsers = () => api.get("/api/v1/users");

// 사용자 관련
export const getMe = () => api.get("/api/v1/users/me");
export const getUserById = (userId) => api.get(`/api/v1/users/${userId}`);
export const getUserStocks = () => api.get("/api/v1/users/stocks");
export const searchUsers = (params) =>
  api.get("/api/v1/users/search", { params });
export const checkNickname = (nickname) =>
  api.get("/api/v1/users/check-nickname", { params: { nickname } });
export const updateMe = (data) => api.patch("/api/v1/users/me", data);

// 주식 관련
export const getStocks = () => api.get("/api/v1/stocks");
export const getStockByCode = (code) => api.get(`/api/v1/stocks/${code}`);
export const getStocksBySector = (sector) =>
  api.get(`/api/v1/stocks/sector/${sector}`);
export const searchStocks = (params) =>
  api.get("/api/v1/stocks/search", { params });

// 거래 관련
export const getPortfolio = () => api.get("/api/v1/trades/portfolio");
export const getTradeHistory = () => api.get("/api/v1/trades/history");
export const getStockTradeHistory = (code) =>
  api.get(`/api/v1/trades/stock/${code}/history`);
export const postTrade = (data) => api.post("/api/v1/trades", data);

// 상점 관련
export const shopDraw = (data) => api.post("/api/v1/shop/draw", data);

// 인증/테스트 관련
export const getAuthError = () => api.get("/api/v1/auth/error");
export const getAuthToken = () => api.get("/auth/token");
export const getAuthSuccess = () => api.get("/auth/success");
export const testAuthVerify = () => api.get("/api/v1/test/auth/verify");
export const testAuthLogin = (data) =>
  api.post("/api/v1/test/auth/login", data);

// 홈
export const getHome = () => api.get("/");

// 커스터마이제이션 관련
export const getCustomization = () => api.get("/api/v1/user/customization");
export const selectCustomization = (data) => api.patch("/api/v1/user/customization/select", data);

// 상대방 정보 조회
export const getOtherUserByNickname = (nickname) =>
  api.get(`/api/v1/users/others`, { params: { nickname } });
