import { useState, useEffect, useCallback } from "react";
import styled, { keyframes } from "styled-components";
import useUserStore from "../../store/useUserStore";
import FriendCard from "./FriendCard";
import PlayerProfileModal from "./PlayerProfileModal";
import NotificationModal from "../common/NotificationModal";

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
  const friends = useUserStore((state) => state.friends);
  const users = useUserStore((state) => state.users);
  const fetchFriends = useUserStore((state) => state.fetchFriends);
  const fetchAllUsers = useUserStore((state) => state.fetchAllUsers);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [notification, setNotification] = useState("");

  useEffect(() => {
    fetchFriends();
    fetchAllUsers();
  }, [fetchFriends, fetchAllUsers]);

  // 실제 전체 유저 목록에서 검색
  const handleSearch = useCallback(() => {
    if (!searchQuery.trim()) {
      setNotification("검색할 플레이어 이름을 입력하세요.");
      return;
    }

    const searchRegex = new RegExp(searchQuery, "i");
    const foundPlayer = users.find(
      (p) => p.nickname && searchRegex.test(p.nickname)
    );

    if (foundPlayer) {
      // API 응답 형식에 맞게 데이터 변환
      const playerData = {
        id: foundPlayer.userId,
        name: foundPlayer.nickname,
        avatarUrl: "/characters/101.gif", // 기본 아바타
        profitRate: 0, // 기본값
        cash: 0, // 기본값
        userId: foundPlayer.userId,
        nickname: foundPlayer.nickname,
      };
      setSearchResult(playerData);
      setIsProfileModalOpen(true);
    } else {
      setNotification("해당 플레이어를 찾을 수 없습니다.");
    }
  }, [searchQuery, users]);

  const handleCloseProfileModal = () => {
    setIsProfileModalOpen(false);
  };

  return (
    <>
      <ModalOverlay onClick={onClose}>
        <ModalContainer onClick={(e) => e.stopPropagation()}>
          <CloseButton onClick={onClose}>&times;</CloseButton>
          <Title>내 친구</Title>
          <SearchContainer>
            <SearchInput
              type="text"
              placeholder="플레이어 이름 검색..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSearch()}
            />
            <SearchButton onClick={handleSearch}>검색</SearchButton>
          </SearchContainer>
          <FriendList>
            {friends.map((friend) => (
              <FriendCard key={friend.id} friend={friend} />
            ))}
          </FriendList>
        </ModalContainer>
      </ModalOverlay>

      {isProfileModalOpen && (
        <PlayerProfileModal
          player={searchResult}
          onClose={handleCloseProfileModal}
        />
      )}
      {notification && (
        <NotificationModal
          message={notification}
          onClose={() => setNotification("")}
        />
      )}
    </>
  );
};

export default MyFriendsModal;
