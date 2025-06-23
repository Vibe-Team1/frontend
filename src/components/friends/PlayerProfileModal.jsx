import styled, { keyframes } from 'styled-components';
import useUserStore from '../../store/useUserStore';
import NotificationModal from '../common/NotificationModal';
import { useState } from 'react';

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
  position: fixed; top: 0; left: 0; width: 100%; height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex; justify-content: center; align-items: center; z-index: 1050; // Higher z-index
`;

const ModalContainer = styled.div`
  width: 500px;
  background-color: #f3e9d3;
  border: 10px solid #4a2e2a;
  border-image: url('/src/assets/modal_border.png') 10 stretch;
  border-radius: 10px;
  padding: 20px;
  font-family: 'DNFBitBitv2', sans-serif;
  color: #5d4037;
  animation: ${scaleUp} 0.25s ease-out forwards;
  position: relative;
`;

const Title = styled.h2`
  text-align: center;
  font-size: 2rem;
  margin: 0 0 20px;
`;

const CloseButton = styled.button`
  position: absolute; top: 10px; right: 10px;
  background-color: #ffab40;
  border: 3px solid #c62828;
  border-radius: 50%;
  width: 35px; height: 35px;
  font-size: 20px; font-weight: bold;
  display: flex; justify-content: center; align-items: center;
  &:hover { background-color: #ffb74d; }
`;

const ProfileContent = styled.div`
  background-color: #fff;
  border: 2px solid #a1887f;
  border-radius: 10px;
  padding: 20px;
  display: flex;
  gap: 20px;
  align-items: center;
`;

const AvatarContainer = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 10px;
  border: 3px solid #d1c7b8;
  background-color: white;
  overflow: hidden;
  position: relative;
  flex-shrink: 0;
`;

const AvatarImage = styled.img`
  width: 100%;
  position: absolute;
  bottom: 5px; /* Adjust to move the image up */
  left: 0;
`;

const PlayerInfo = styled.div`
  flex-grow: 1;
`;

const PlayerName = styled.h3`
  margin: 0 0 10px;
  font-size: 1.5rem;
`;

const PlayerStats = styled.p`
  margin: 0;
  font-size: 1rem;
`;

const AddFriendButton = styled.button`
  margin-top: 20px;
  width: 100%;
  padding: 12px;
  background-color: #fcae4f;
  border: 2px solid #e5932a;
  border-radius: 5px;
  font-family: 'DNFBitBitv2', sans-serif;
  font-size: 1.2rem;
  color: #5d4037;

  &:hover {
    background-color: #fdb968;
  }

  &:disabled {
    background-color: #ccc;
  }
`;

const PlayerProfileModal = ({ player, onClose }) => {
  const { friends, addFriend } = useUserStore();
  const [notification, setNotification] = useState('');

  const isAlreadyFriend = player && friends.some(friend => friend.id === player.id);

  const handleAddFriend = () => {
    if (!player) return;
    addFriend(player);
    setNotification(`${player.name}님을 친구로 추가했습니다.`);
  };
  
  const handleCloseNotification = () => {
    setNotification('');
    onClose();
  }

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <Title>플레이어 정보</Title>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        {player ? (
          <>
            <ProfileContent>
              <AvatarContainer>
                <AvatarImage src={player.avatarUrl} alt={player.name} />
              </AvatarContainer>
              <PlayerInfo>
                <PlayerName>{player.name}</PlayerName>
                <PlayerStats>수익률: {player.profitRate}%</PlayerStats>
                <PlayerStats>자산: {player.cash.toLocaleString()}G</PlayerStats>
              </PlayerInfo>
            </ProfileContent>
            <AddFriendButton onClick={handleAddFriend} disabled={isAlreadyFriend}>
              {isAlreadyFriend ? '이미 친구입니다' : '친구 추가'}
            </AddFriendButton>
          </>
        ) : (
          <ProfileContent>
            <p>플레이어를 찾을 수 없습니다.</p>
          </ProfileContent>
        )}
      </ModalContainer>
      {notification && (
        <NotificationModal
          message={notification}
          onClose={handleCloseNotification}
        />
      )}
    </ModalOverlay>
  );
};

export default PlayerProfileModal; 