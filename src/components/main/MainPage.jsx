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

const MainContainer = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'backgroundImage',
})`
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
  const visitingUser = useUserStore((state) => state.visitingUser);
  const getVisitingUser = useUserStore((state) => state.getVisitingUser);
  const clearVisitingUser = useUserStore((state) => state.clearVisitingUser);
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
  const [showVillageBanner, setShowVillageBanner] = useState(true);
  const [fadeVillageBanner, setFadeVillageBanner] = useState(false);
  const user = useUserStore((state) => state.user);

  // 상대방 방문 정보 확인
  useEffect(() => {
    const storedVisitingUser = getVisitingUser();
    if (storedVisitingUser && !visitingUser) {
      // localStorage에서 상대방 정보를 store에 복원
      useUserStore.getState().setVisitingUser(storedVisitingUser);
    }
  }, [getVisitingUser, visitingUser]);

  // 상대방 방문 중인지 확인
  const isVisiting = visitingUser !== null;
  const myBackgroundCode = isVisiting
    ? visitingUser.currentBackgroundCode || "01"
    : user?.currentBackgroundCode || "01";
  const myBackground = myBackgroundCode === "02" ? "/background/02.png" : "/background/01.jpeg";
  const defaultBackground = "/background/01.jpeg";
  
  const backgroundImage = isVisiting 
    ? visitingUser.backgroundUrl || defaultBackground
    : myBackground || customization.backgroundUrls?.[0] || selectedTheme.background || defaultBackground;

  // 앱 시작 시 백엔드에서 데이터 불러오기 (상대방 방문 중이 아닐 때만)
  useEffect(() => {
    const loadInitialData = async () => {
      if (!isVisiting) {
        try {
          await initializeData();
        } catch (error) {
          console.error("초기 데이터 로드 실패:", error);
        }
      }
    };

    loadInitialData();
  }, [initializeData, isVisiting]);

  // 앱 시작 시 항상 오늘 날짜로 gameDate를 덮어쓰기
  useEffect(() => {
    const today = new Date();
    setGameDate(today.getFullYear(), today.getMonth() + 1, today.getDate());
  }, [setGameDate]);

  // 방문 배너 효과: 3초 후 fade-out, 1.5초 후 완전 사라짐
  useEffect(() => {
    if (isVisiting) {
      setShowVillageBanner(true);
      setFadeVillageBanner(false);
      const fadeTimer = setTimeout(() => setFadeVillageBanner(true), 3000);
      const hideTimer = setTimeout(() => setShowVillageBanner(false), 4500);
      return () => {
        clearTimeout(fadeTimer);
        clearTimeout(hideTimer);
      };
    }
  }, [isVisiting, visitingUser?.nickname]);

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
    if (isVisiting) {
      // 상대방 방문 중이면 내 페이지로 돌아가기
      clearVisitingUser();
      window.location.reload();
    } else {
      // 내 페이지에서 나가기
      navigate("/");
    }
  };

  return (
    <MainContainer backgroundImage={backgroundImage}>
      {isVisiting && showVillageBanner && (
        <div
          style={{
            position: 'fixed',
            top: '12%',
            left: '50%',
            transform: 'translate(-50%, 0)',
            fontSize: '3.2rem',
            fontWeight: 'bold',
            color: '#ffb347',
            textShadow: '2px 2px 8px #000, 0 0 20px #8d6e63',
            zIndex: 2000,
            letterSpacing: '2px',
            fontFamily: 'DNFBitBitv2, sans-serif',
            pointerEvents: 'none',
            userSelect: 'none',
            opacity: fadeVillageBanner ? 0 : 1,
            transition: 'opacity 1.5s',
          }}
        >
          {visitingUser?.nickname} 님의 마을에 방문하셨습니다.
        </div>
      )}
      
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
          <NavItem
            iconUrl={doorIconUrl}
            label={isVisiting ? "돌아가기" : "나가기"}
            onClick={handleOpenExitModal}
          />
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
          message={isVisiting ? "내 페이지로 돌아가시겠습니까?" : "정말로 나가시겠습니까?"}
          onConfirm={handleConfirmExit}
          onCancel={handleCloseExitModal}
        />
      )}
    </MainContainer>
  );
};

export default MainPage;
