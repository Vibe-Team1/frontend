import { useState, useEffect, useCallback } from "react";
import styled, { keyframes } from "styled-components";
import useUserStore from "../../store/useUserStore";
import FriendCard from "./FriendCard";
import PlayerProfileModal from "./PlayerProfileModal";
import NotificationModal from "../common/NotificationModal";
import { searchUsers } from '../../api/accountApi';

const scaleUp = keyframes`
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  width: 90%;
  max-width: 1200px;
  height: 85%;
  background-color: #f3e9d3;
  border: 10px solid #4a2e2a;
  border-radius: 15px;
  box-shadow: inset 0 0 0 5px #8d6e63;
  padding: 25px;
  box-sizing: border-box;
  position: relative;
  font-family: sans-serif;
  color: #5d4037;
  display: flex;
  flex-direction: column;
  animation: ${scaleUp} 0.25s ease-out forwards;
`;

const Title = styled.h2`
  text-align: center;
  font-family: sans-serif;
  font-size: 2.5rem;
  color: #5d4037;
  margin: 0 0 20px 0;
  flex-shrink: 0;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  background-color: #ffab40;
  color: #5d4037;
  border: 3px solid #c62828;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  font-size: 24px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
  &:hover {
    background-color: #ffb74d;
  }
`;

const SearchContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  flex-shrink: 0;
`;

const SearchInput = styled.input`
  flex-grow: 1;
  padding: 10px 15px;
  font-size: 1.1rem;
  border: 3px solid #a1887f;
  border-radius: 5px;
  background-color: white;
  font-family: sans-serif;
`;

const SearchButton = styled.button`
  padding: 10px 20px;
  background-color: #fcae4f;
  border: 2px solid #e5932a;
  border-radius: 5px;
  font-family: sans-serif;
  font-size: 1.1rem;
  color: #5d4037;

  &:hover {
    background-color: #fdb968;
  }
`;

const FriendList = styled.div`
  flex-grow: 1;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 20px;
  overflow-y: auto;
  padding: 5px;
  align-content: flex-start;
  min-height: 0;
`;

const MyFriendsModal = ({ onClose }) => {
  const fetchFriends = useUserStore((state) => state.fetchFriends);
  const fetchAllUsers = useUserStore((state) => state.fetchAllUsers);
  const searchUsersAsync = useUserStore((state) => state.searchUsersAsync);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [notification, setNotification] = useState("");
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [detailedFriends, setDetailedFriends] = useState([]);

  useEffect(() => {
    const fetchAll = async () => {
      const friendsList = await fetchFriends();
      fetchAllUsers();
      if (!friendsList || friendsList.length === 0) {
        setDetailedFriends([]);
        return;
      }
      const details = await Promise.all(
        friendsList.map(async (friend) => {
          try {
            // search API로 상세 정보 조회
            const res = await searchUsers({ nickname: friend.nickname });
            const userArr = res.data.data;
            if (Array.isArray(userArr) && userArr.length > 0) {
              const data = userArr[0];
              return {
                ...friend,
                name: data.nickname,
                nickname: data.nickname,
                characterCount: data.characterCount || 0,
                cash: data.balance || 0,
                currentCharacterCode: data.currentCharacterCode,
                avatarUrl: `https://cy-stock-s3.s3.ap-northeast-2.amazonaws.com/char/${data.currentCharacterCode || '001'}.gif`,
              };
            } else {
              return { ...friend, characterCount: 0, cash: 0 };
            }
          } catch {
            return { ...friend, characterCount: 0, cash: 0 };
          }
        })
      );
      setDetailedFriends(details);
    };
    fetchAll();
    // eslint-disable-next-line
  }, []);

  // API를 통한 사용자 검색
  const handleSearch = useCallback(async () => {
    if (!searchQuery.trim()) {
      setNotification("검색할 플레이어 이름을 입력하세요.");
      setIsNotificationOpen(true);
      return;
    }

    setIsSearching(true);
    setNotification("");

    try {
      const result = await searchUsersAsync(searchQuery);
      console.log("검색 결과:", result); // 디버깅용 로그
      
      if (result.success) {
        const userData = result.data.data;
        console.log("사용자 데이터:", userData); // 디버깅용 로그
        
        // userData가 배열이고 길이가 0보다 큰지 확인
        if (Array.isArray(userData) && userData.length > 0) {
          // 검색된 사용자가 있는 경우
          const foundUser = userData[0]; // 첫 번째 사용자 선택
          const playerData = {
            id: foundUser.userId,
            name: foundUser.nickname,
            avatarUrl: `https://cy-stock-s3.s3.ap-northeast-2.amazonaws.com/char/${foundUser.currentCharacterCode}.gif`,
            profitRate: 0, // API에서 제공하지 않으므로 기본값
            cash: foundUser.balance,
            userId: foundUser.userId,
            nickname: foundUser.nickname,
            currentCharacterCode: foundUser.currentCharacterCode,
            characterCount: foundUser.characterCount,
          };
          setSearchResult(playerData);
          setIsProfileModalOpen(true);
        } else {
          // 검색된 사용자가 없는 경우
          console.log("사용자를 찾을 수 없음"); // 디버깅용 로그
          setNotification("해당 플레이어를 찾을 수 없습니다.");
          setIsNotificationOpen(true);
        }
      } else {
        setNotification(result.error || "검색에 실패했습니다.");
        setIsNotificationOpen(true);
      }
    } catch (error) {
      console.error("검색 에러:", error); // 디버깅용 로그
      setNotification("검색 중 오류가 발생했습니다.");
      setIsNotificationOpen(true);
    } finally {
      setIsSearching(false);
    }
  }, [searchQuery, searchUsersAsync]);

  const handleCloseModal = () => {
    onClose();
  };

  return (
    <>
      <ModalOverlay onClick={handleCloseModal}>
        <ModalContainer onClick={(e) => e.stopPropagation()}>
          <CloseButton onClick={handleCloseModal}>&times;</CloseButton>
          <Title>내 친구</Title>
          <SearchContainer>
            <SearchInput
              type="text"
              placeholder="플레이어 이름 검색..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSearch()}
              disabled={isSearching}
            />
            <SearchButton onClick={handleSearch} disabled={isSearching}>
              {isSearching ? "검색중..." : "검색"}
            </SearchButton>
          </SearchContainer>
          <FriendList>
            {detailedFriends.map((friend) => (
              <FriendCard key={friend.userId} friend={friend} />
            ))}
          </FriendList>
        </ModalContainer>
      </ModalOverlay>

      {isProfileModalOpen && (
        <PlayerProfileModal
          player={searchResult}
          onClose={() => setIsProfileModalOpen(false)}
        />
      )}
      <NotificationModal
        isOpen={isNotificationOpen}
        message={notification}
        onClose={() => setIsNotificationOpen(false)}
      />
    </>
  );
};

export default MyFriendsModal;
