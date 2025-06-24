import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import useUserStore from "../../store/useUserStore";
import Profile from "./Profile";
import GameStatus from "./GameStatus";
import NavItem from "./NavItem";
import Chat from "./Chat";
import TradeModal from "../stockList/TradeModal";
import SettingsModal from "../settings/SettingsModal";
import ConfirmModal from "../common/ConfirmModal";
import MyPageModal from "../myPage/MyPageModal";
import MyStocksModal from "../myStocks/MyStocksModal";
import MyFriendsModal from "../friends/MyFriendsModal";
import ShopModal from "../shop/ShopModal";
import PlayerCharacter from "./PlayerCharacter";
import addFriendIconUrl from "../../assets/addFriend.png";
import stockIconUrl from "../../assets/stockIcon.png";
import doorIconUrl from "../../assets/door.png";
import dollarIconUrl from "../../assets/dollar.png";
import shopIconUrl from "../../assets/shop.png";
import settingIconUrl from "../../assets/setting.png";

const MainContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background-image: url(${(props) => props.backgroundImage});
  background-size: auto 100%;
  background-repeat: repeat-x;
  background-position: center;
  display: flex;
  flex-direction: column;
  padding: 20px;
  box-sizing: border-box;
  gap: 20px;
  color: white;
`;

const TopSection = styled.header`
  display: flex;
  justify-content: space-between;
  height: 170px;
`;

const MiddleSection = styled.main`
  flex-grow: 1; /* Takes up the remaining space */
  position: relative; /* Set position context for the character */
`;

const BottomSection = styled.footer`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  height: 200px;
`;

const NavContainer = styled.nav`
  display: flex;
  gap: 20px; /* Adjusted gap for new item size */
`;

const BottomNav = styled.nav`
  display: flex;
  gap: 15px;
`;

const MainPage = ({ isMusicPlaying, playMusic, pauseMusic }) => {
  const selectedTheme = useUserStore((state) => state.selectedTheme);
  const customization = useUserStore((state) => state.customization);
  const isFriendView = useUserStore((state) => state.isFriendView);
  const friendViewBackground = useUserStore((state) => state.friendViewBackground);
  const resetFriendView = useUserStore((state) => state.resetFriendView);
  const [isTradeModalOpen, setIsTradeModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [isExitModalOpen, setIsExitModalOpen] = useState(false);
  const [isMyPageModalOpen, setIsMyPageModalOpen] = useState(false);
  const [isMyStocksModalOpen, setIsMyStocksModalOpen] = useState(false);
  const [isMyFriendsModalOpen, setIsMyFriendsModalOpen] = useState(false);
  const [isShopModalOpen, setIsShopModalOpen] = useState(false);
  const navigate = useNavigate();
  const { initializeData } = useUserStore();
  const setGameDate = useUserStore((state) => state.updateGameDate);

  // 배경 이미지 결정 (API 응답 > customization > selectedTheme > 기본 배경 순서)
  const currentBackgroundCode = localStorage.getItem('currentBackgroundCode') || "01";
  const ext = currentBackgroundCode === "01" ? "jpeg" : "png";
  const apiBackground = `/background/${currentBackgroundCode}.${ext}`;
  const defaultBackground = "/background/01.jpeg";
  const friendBgExt = friendViewBackground === "01" ? "jpeg" : "png";
  const friendBg = friendViewBackground ? `/background/${friendViewBackground}.${friendBgExt}` : null;
  const backgroundImage = isFriendView ? friendBg : (apiBackground || customization.backgroundUrls?.[0] || selectedTheme.background || defaultBackground);

  // 앱 시작 시 백엔드에서 데이터 불러오기
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        await initializeData();
      } catch (error) {
        console.error("초기 데이터 로드 실패:", error);
      }
    };

    loadInitialData();
  }, [initializeData]);

  // 앱 시작 시 항상 오늘 날짜로 gameDate를 덮어쓰기
  useEffect(() => {
    const today = new Date();
    setGameDate(today.getFullYear(), today.getMonth() + 1, today.getDate());
  }, [setGameDate]);

  const handleOpenTradeModal = () => setIsTradeModalOpen(true);
  const handleCloseTradeModal = () => setIsTradeModalOpen(false);

  const handleOpenSettingsModal = () => setIsSettingsModalOpen(true);
  const handleCloseSettingsModal = () => setIsSettingsModalOpen(false);

  const handleOpenExitModal = () => setIsExitModalOpen(true);
  const handleCloseExitModal = () => setIsExitModalOpen(false);

  const handleOpenMyPageModal = () => setIsMyPageModalOpen(true);
  const handleCloseMyPageModal = () => setIsMyPageModalOpen(false);

  const handleOpenMyStocksModal = () => setIsMyStocksModalOpen(true);
  const handleCloseMyStocksModal = () => setIsMyStocksModalOpen(false);

  const handleOpenMyFriendsModal = () => setIsMyFriendsModalOpen(true);
  const handleCloseMyFriendsModal = () => setIsMyFriendsModalOpen(false);

  const handleOpenShopModal = () => setIsShopModalOpen(true);
  const handleCloseShopModal = () => setIsShopModalOpen(false);

  const handleNavigateToTrade = () => {
    setIsMyStocksModalOpen(false);
    setIsTradeModalOpen(true);
  };

  const handleConfirmExit = () => {
    navigate("/"); // Go back to landing page
  };

  return (
    <MainContainer backgroundImage={backgroundImage}>
      <TopSection>
        <div onClick={handleOpenMyPageModal}>
          <Profile />
        </div>
        <GameStatus />
      </TopSection>

      <MiddleSection>
        <PlayerCharacter />
      </MiddleSection>

      <BottomSection>
        <NavContainer>
          {/* TODO: Add iconUrl prop, e.g., iconUrl="/src/assets/icons/trade.png" */}
          <NavItem
            iconUrl={stockIconUrl}
            label="매매"
            onClick={handleOpenTradeModal}
          />
          <NavItem
            iconUrl={dollarIconUrl}
            label="내 주식"
            onClick={handleOpenMyStocksModal}
          />
          <NavItem
            iconUrl={shopIconUrl}
            label="상점"
            onClick={handleOpenShopModal}
          />
          <NavItem
            iconUrl={addFriendIconUrl}
            label="내 친구"
            onClick={handleOpenMyFriendsModal}
          />
        </NavContainer>
        <Chat />
        <NavContainer>
          <NavItem
            iconUrl={settingIconUrl}
            label="설정"
            onClick={handleOpenSettingsModal}
          />
          {isFriendView ? (
            <button
              style={{
                border: 'none',
                background: '#ffab40',
                color: '#5d4037',
                borderRadius: '8px',
                padding: '12px 24px',
                fontWeight: 'bold',
                fontSize: '1.1rem',
                marginLeft: '10px',
                cursor: 'pointer',
              }}
              onClick={resetFriendView}
            >
              내 메인페이지로 돌아가기
            </button>
          ) : (
            <NavItem
              iconUrl={doorIconUrl}
              label="나가기"
              onClick={handleOpenExitModal}
            />
          )}
        </NavContainer>
      </BottomSection>
      {isTradeModalOpen && <TradeModal onClose={handleCloseTradeModal} />}
      {isSettingsModalOpen && (
        <SettingsModal
          onClose={handleCloseSettingsModal}
          isMusicPlaying={isMusicPlaying}
          playMusic={playMusic}
          pauseMusic={pauseMusic}
        />
      )}
      {isMyPageModalOpen && <MyPageModal onClose={handleCloseMyPageModal} />}
      {isMyStocksModalOpen && (
        <MyStocksModal
          onClose={handleCloseMyStocksModal}
          onNavigate={handleNavigateToTrade}
        />
      )}
      {isShopModalOpen && <ShopModal onClose={handleCloseShopModal} />}
      {isMyFriendsModalOpen && (
        <MyFriendsModal onClose={handleCloseMyFriendsModal} />
      )}
      {isExitModalOpen && (
        <ConfirmModal
          message="정말로 나가시겠습니까?"
          onConfirm={handleConfirmExit}
          onCancel={handleCloseExitModal}
        />
      )}
    </MainContainer>
  );
};

export default MainPage;
