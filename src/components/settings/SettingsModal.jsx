import { useState } from 'react';
import styled, { keyframes } from 'styled-components';

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

// Base Modal Styles (can be refactored into a shared component later)
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
  width: 700px;
  background-color: #f3e9d3;
  border: 10px solid #4a2e2a;
  border-radius: 15px;
  box-shadow: inset 0 0 0 5px #8d6e63;
  padding: 25px;
  box-sizing: border-box;
  position: relative;
  font-family: monospace;
  color: #5d4037;
  animation: ${scaleUp} 0.25s ease-out forwards;
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

const Title = styled.h2`
  text-align: center;
  font-size: 2rem;
  margin-top: 0;
`;

const Section = styled.div`
  margin-top: 30px;
`;

const SectionTitle = styled.h3`
  font-size: 1.5rem;
  border-bottom: 2px solid #d8c8b0;
  padding-bottom: 10px;
`;

const SettingsList = styled.div`
  margin-top: 30px;
`;

const SettingRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 10px;
  margin-bottom: 20px;
`;

const Label = styled.label`
  font-size: 1.5rem;
  font-weight: bold;
`;

const SwitchContainer = styled.div`
  width: 120px;
  height: 50px;
  background-color: ${({ active }) => (active ? '#aed581' : '#ff8a65')};
  border-radius: 25px;
  border: 3px solid #5d4037;
  display: flex;
  align-items: center;
  padding: 5px;
  transition: background-color 0.3s ease;
`;

const SwitchButton = styled.div`
  width: 50px;
  height: 40px;
  background-color: white;
  border-radius: 20px;
  border: 2px solid #5d4037;
  transform: ${({ active }) => (active ? 'translateX(60px)' : 'translateX(0)')};
  transition: transform 0.3s ease;
`;

const ScreenOptionsContainer = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 10px 0;
`;

const ScreenOptionButton = styled.button`
    padding: 10px 25px;
    font-family: monospace;
    font-size: 1.1rem;
    font-weight: bold;
    border-radius: 8px;
    border: 3px solid ${props => props.active ? '#e65100' : '#ffab40'};
    background-color: ${props => props.active ? '#ffab40' : 'transparent'};
    color: #5d4037;
    transition: all 0.2s;
`;

const HintText = styled.p`
    text-align: center;
    font-size: 0.9rem;
    color: #a1887f;
`;

const SettingsModal = ({ onClose, isMusicPlaying, playMusic, pauseMusic }) => {
  const [soundOn, setSoundOn] = useState(true);
  const [fullscreen, setFullscreen] = useState(false);

  const handleBgmToggle = () => {
    if (isMusicPlaying) {
      pauseMusic();
    } else {
      playMusic();
    }
  };

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        <Title>설정</Title>
        <SettingsList>
          <SettingRow>
            <Label>배경음악</Label>
            <SwitchContainer active={isMusicPlaying} onClick={handleBgmToggle}>
              <SwitchButton active={isMusicPlaying} />
            </SwitchContainer>
          </SettingRow>
          <SettingRow>
            <Label>효과음</Label>
            <SwitchContainer active={soundOn} onClick={() => setSoundOn(!soundOn)}>
              <SwitchButton active={soundOn} />
            </SwitchContainer>
          </SettingRow>
          <SettingRow>
            <Label>전체화면</Label>
            <SwitchContainer active={fullscreen} onClick={() => setFullscreen(!fullscreen)}>
              <SwitchButton active={fullscreen} />
            </SwitchContainer>
          </SettingRow>
        </SettingsList>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default SettingsModal; 