import styled, { keyframes } from 'styled-components';
import UserInfoPanel from './UserInfoPanel';
import CustomizationPanel from './CustomizationPanel'; // Assuming this will be created

const scaleUp = keyframes`
  from {
    transform: scale(0.9);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

// Base Modal Styles
const ModalOverlay = styled.div`
  position: fixed; top: 0; left: 0; width: 100%; height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex; justify-content: center; align-items: center; z-index: 1000;
  animation: ${fadeIn} 0.25s ease-out forwards;
`;

const ModalContainer = styled.div`
  width: 95%; max-width: 1200px; height: 85%;
  background-color: #f3e9d3;
  border: 10px solid #4a2e2a; border-radius: 15px;
  box-shadow: inset 0 0 0 5px #8d6e63;
  padding: 25px; box-sizing: border-box; position: relative;
  font-family: monospace; color: #5d4037;
  animation: ${scaleUp} 0.25s ease-out forwards;
`;

const CloseButton = styled.button`
  position: absolute; top: 15px; right: 15px;
  background-color: #ffab40; color: #5d4037;
  border: 3px solid #c62828; border-radius: 50%;
  width: 40px; height: 40px; font-size: 24px; font-weight: bold;
  display: flex; justify-content: center; align-items: center; z-index: 10;
  &:hover { background-color: #ffb74d; }
`;

const Content = styled.div`
  display: flex;
  gap: 20px;
  height: 100%;
  
  & > *:first-child {
    width: 350px;
    min-width: 350px;
    max-width: 350px;
  }
  & > *:last-child {
    flex-grow: 1;
    min-width: 0;
  }
`;

const getCharacterImage = (characterCode, costumeCode) => {
  // 의상코드는 항상 2자리로 맞춤
  const costumeStr = costumeCode.toString().padStart(2, '0');
  return `/characters/${characterCode}${costumeStr}.gif`;
};

const MyPageModal = ({ onClose }) => {
  return (
    <ModalOverlay onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        <Content>
          <UserInfoPanel />
          <CustomizationPanel />
        </Content>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default MyPageModal; 