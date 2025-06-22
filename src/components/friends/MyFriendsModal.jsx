import styled, { keyframes } from 'styled-components';
import FriendCard from './FriendCard';

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
  background-color: rgba(0, 0, 0, 0.6);
  display: flex; justify-content: center; align-items: center; z-index: 1000;
`;

const ModalContainer = styled.div`
  width: 90%; max-width: 1200px; height: 85%;
  background-color: #f3e9d3;
  border: 10px solid #4a2e2a; border-radius: 15px;
  box-shadow: inset 0 0 0 5px #8d6e63;
  padding: 25px; box-sizing: border-box; position: relative;
  font-family: monospace; color: #5d4037;
  display: flex;
  flex-direction: column;
  animation: ${scaleUp} 0.25s ease-out forwards;
`;

const Title = styled.h2`
  text-align: center;
  font-family: monospace;
  font-size: 2.5rem;
  color: #5d4037;
  margin: 0 0 20px 0;
  flex-shrink: 0;
`;

const CloseButton = styled.button`
  position: absolute; top: 15px; right: 15px;
  background-color: #ffab40; color: #5d4037;
  border: 3px solid #c62828; border-radius: 50%;
  width: 40px; height: 40px; font-size: 24px; font-weight: bold;
  cursor: pointer; display: flex; justify-content: center; align-items: center; z-index: 10;
  &:hover { background-color: #ffb74d; }
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

const dummyFriends = [
    { id: 1, name: '주식왕초보', profitRate: 15.78, cash: 1250000, avatarUrl: 'https://i.pravatar.cc/150?img=1' },
    { id: 2, name: '매수버튼고장남', profitRate: -5.20, cash: 890000, avatarUrl: 'https://i.pravatar.cc/150?img=2' },
    { id: 3, name: '떡상가즈아', profitRate: 32.11, cash: 3400000, avatarUrl: 'https://i.pravatar.cc/150?img=3' },
    { id: 4, name: '오늘만산다', profitRate: -22.50, cash: 450000, avatarUrl: 'https://i.pravatar.cc/150?img=4' },
    { id: 5, name: '존버는승리한다', profitRate: 2.15, cash: 2100000, avatarUrl: 'https://i.pravatar.cc/150?img=5' },
    { id: 6, name: '단타의신', profitRate: 8.99, cash: 1500000, avatarUrl: 'https://i.pravatar.cc/150?img=6' },
    { id: 7, name: '주식왕초보', profitRate: 15.78, cash: 1250000, avatarUrl: 'https://i.pravatar.cc/150?img=1' },
    { id: 8, name: '매수버튼고장남', profitRate: -5.20, cash: 890000, avatarUrl: 'https://i.pravatar.cc/150?img=2' },
    { id: 9, name: '떡상가즈아', profitRate: 32.11, cash: 3400000, avatarUrl: 'https://i.pravatar.cc/150?img=3' },
    { id: 10, name: '오늘만산다', profitRate: -22.50, cash: 450000, avatarUrl: 'https://i.pravatar.cc/150?img=4' },
    { id: 11, name: '존버는승리한다', profitRate: 2.15, cash: 2100000, avatarUrl: 'https://i.pravatar.cc/150?img=5' },
    { id: 12, name: '단타의신', profitRate: 8.99, cash: 1500000, avatarUrl: 'https://i.pravatar.cc/150?img=6' },
    { id: 13, name: '주식왕초보', profitRate: 15.78, cash: 1250000, avatarUrl: 'https://i.pravatar.cc/150?img=1' },
    { id: 14, name: '매수버튼고장남', profitRate: -5.20, cash: 890000, avatarUrl: 'https://i.pravatar.cc/150?img=2' },
    { id: 15, name: '떡상가즈아', profitRate: 32.11, cash: 3400000, avatarUrl: 'https://i.pravatar.cc/150?img=3' },
    { id: 16, name: '오늘만산다', profitRate: -22.50, cash: 450000, avatarUrl: 'https://i.pravatar.cc/150?img=4' },
    { id: 17, name: '존버는승리한다', profitRate: 2.15, cash: 2100000, avatarUrl: 'https://i.pravatar.cc/150?img=5' },
    { id: 18, name: '단타의신', profitRate: 8.99, cash: 1500000, avatarUrl: 'https://i.pravatar.cc/150?img=6' },
];

const MyFriendsModal = ({ onClose }) => {
  return (
    <ModalOverlay onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        <Title>내 친구</Title>
        <FriendList>
            {dummyFriends.map(friend => (
                <FriendCard key={friend.id} friend={friend} />
            ))}
        </FriendList>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default MyFriendsModal; 