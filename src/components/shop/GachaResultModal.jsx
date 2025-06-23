import { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const slideUp = keyframes`
  from { transform: translateY(100vh); }
  to { transform: translateY(0); }
`;

const float = keyframes`
  0%, 100% {
    transform: translateY(0) rotateX(10deg) rotateY(-10deg);
  }
  50% {
    transform: translateY(-20px) rotateX(-10deg) rotateY(10deg);
  }
`;

const floatBack = keyframes`
  0%, 100% {
    transform: translateY(0) rotateX(10deg) rotateY(170deg);
  }
  50% {
    transform: translateY(-20px) rotateX(-10deg) rotateY(190deg);
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0; left: 0; width: 100%; height: 100%;
  background-color: rgba(0, 0, 0, 1);
  display: flex; justify-content: center; align-items: center;
  z-index: 2000;
  animation: ${fadeIn} 0.3s ease-out;
`;

const CardAnimator = styled.div`
  animation: ${slideUp} 0.6s ease-out forwards;
`;

const CardContainer = styled.div`
  width: 320px;
  height: 550px;
  perspective: 1600px;
`;

const CardInner = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  transition: transform 0.6s;
  transform-style: preserve-3d;
  transform: ${({ $isFlipped }) => $isFlipped ? 'rotateY(180deg)' : 'none'};
`;

const CardFace = styled.div`
  position: absolute; width: 100%; height: 100%;
  backface-visibility: hidden;
  border-radius: 20px;
  background-color: white;
  display: flex; flex-direction: column; justify-content: center; align-items: center;
`;

const CardBack = styled(CardFace)`
  animation: ${float} 5s infinite ease-in-out;
  border: 8px solid black;
  
  p {
    color: black;
    font-size: 5rem;
    font-weight: bold;
    margin: 0;
  }
`;

const CardFront = styled(CardFace)`
  transform: rotateY(180deg);
  animation: ${floatBack} 5s infinite ease-in-out;
  border: 8px solid ${({ rarity }) => {
    switch (rarity) {
      case 'epic': return 'purple';
      case 'legendary': return 'gold';
      default: return 'gray';
    }
  }};
`;

const Rank = styled.p`
  color: ${({ rarity }) => {
    switch (rarity) {
      case 'epic': return 'purple';
      case 'legendary': return 'gold';
      default: return 'gray';
    }
  }};
  font-size: 2rem;
  font-weight: bold;
  margin: 0;
`;

const RewardImageContainer = styled.div`
  height: 60%;
  display: flex; justify-content: center; align-items: center;
`;

const RewardImage = styled.img`
  width: 60%;
`;

const RewardNameContainer = styled.div`
  margin: 0;
  border: 1.2px solid black;
  width: 100%;
  height: 10%;
  background-color: rgba(255, 255, 255, 0.6);
  display: flex; justify-content: center; align-items: center;
`;

const RewardName = styled.p`
  color: black;
  font-size: 1.5rem;
  font-weight: bold;
  letter-spacing: 5px;
`;

const GachaResultModal = ({ rewardItem, onClose }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [rarity, setRarity] = useState('common');

  useEffect(() => {
    // Determine rarity based on item properties (e.g., price)
    // This is just a placeholder logic
    if (rewardItem.price > 1000000) setRarity('legendary');
    else if (rewardItem.price > 500000) setRarity('epic');
    else setRarity('common');
  }, [rewardItem]);

  const handleFlip = (e) => {
    e.stopPropagation();
    if (!isFlipped) setIsFlipped(true);
  };
  
  const handleOverlayClick = () => {
    if (isFlipped) onClose();
  };

  return (
    <ModalOverlay onClick={handleOverlayClick}>
      <CardAnimator>
        <CardContainer onClick={handleFlip}>
          <CardInner $isFlipped={isFlipped}>
            <CardBack>
              <p>?</p>
            </CardBack>
            <CardFront rarity={rarity}>
              <Rank rarity={rarity}>{rarity.toUpperCase()}</Rank>
              <RewardImageContainer>
                <RewardImage src={rewardItem.icon} alt={rewardItem.name} />
              </RewardImageContainer>
              <RewardNameContainer>
                <RewardName>{rewardItem.name}</RewardName>
              </RewardNameContainer>
            </CardFront>
          </CardInner>
        </CardContainer>
      </CardAnimator>
    </ModalOverlay>
  );
};

export default GachaResultModal; 