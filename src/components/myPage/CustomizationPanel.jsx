import { useState } from 'react';
import styled from 'styled-components';
import useUserStore from '../../store/useUserStore';

const PanelContainer = styled.div`
  flex-grow: 1;
  border: 3px solid #d8c8b0;
  border-radius: 10px;
  padding: 20px;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h2`
  background-color: #a1887f;
  border: 3px solid #5d4037;
  color: white;
  padding: 5px 20px;
  border-radius: 10px;
  align-self: center;
  font-size: 1.5rem;
  margin: -40px 0 20px 0;
`;

const TabContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
`;

const TabButton = styled.button`
    padding: 10px 20px;
    border-radius: 8px;
    border: 3px solid ${props => props.active ? '#a1887f' : '#d8c8b0'};
    background-color: ${props => props.active ? '#d8c8b0' : 'transparent'};
    color: #5d4037;
    font-size: 1.1rem;
    font-weight: bold;
`;

const ItemGrid = styled.div`
    flex-grow: 1;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 15px;
    overflow-y: auto;
    padding: 5px;
`;

const ItemSlot = styled.div`
    aspect-ratio: 1 / 1;
    background-color: #eee;
    border-radius: 8px;
    border: 3px solid transparent;
    position: relative;
    cursor: pointer;

    &.selected {
        border-color: #ffab40;
    }

    &.owned {
        cursor: pointer;
    }

    &.not-owned {
        cursor: not-allowed;
    }
`;

const ItemSlotOverlay = styled.div`
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.8);
  border-radius: 8px;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 0.8rem;
  font-weight: bold;
`;

const BottomBar = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
`;

const ApplyButton = styled.button`
    padding: 10px 30px;
    background-color: #8d6e63;
    color: white;
    border: 3px solid #5d4037;
    border-radius: 8px;
    font-size: 1.1rem;
`;

// 120개의 캐릭터 코드 생성 (001, 002, ..., 120)
const generateCharacterCodes = () => {
  const codes = [];
  for (let i = 1; i <= 120; i++) {
    codes.push(i.toString().padStart(3, '0'));
  }
  return codes;
};

const characterCodes = generateCharacterCodes();

// 테마 배경화면 배열
const themeBackgrounds = [
  "/src/assets/main-background3.png",
  "/src/assets/main-background5.jpeg"
];

const CustomizationPanel = () => {
  const [activeTab, setActiveTab] = useState('character');
  const { updateSelectedCharacter, updateSelectedTheme, ownedCharacters } = useUserStore();
  const [selectedItem, setSelectedItem] = useState(null);
  
  // 캐릭터 이미지 경로 생성 함수
  const getCharacterImage = (characterCode) => {
    return `https://cy-stock-s3.s3.ap-northeast-2.amazonaws.com/char/${characterCode}.gif`;
  };
  
  // 캐릭터 보유 여부 확인
  const isCharacterOwned = (characterCode) => {
    return ownedCharacters.includes(characterCode);
  };
  
  // 보유한 캐릭터만 필터링
  const ownedCharacterCodes = characterCodes.filter(code => isCharacterOwned(code));
  
  // 적용하기 함수
  const handleApply = () => {
    if (selectedItem) {
      if (activeTab === 'character' || activeTab === 'myCharacter') {
        updateSelectedCharacter(parseInt(selectedItem));
      } else if (activeTab === 'theme') {
        updateSelectedTheme(selectedItem);
      }
      setSelectedItem(null);
    }
  };
  
  // 아이템 선택 함수
  const handleItemSelect = (itemId, isOwned) => {
    if (isOwned) {
      setSelectedItem(itemId);
    }
  };
  
  return (
    <PanelContainer>
      <Title>꾸미기</Title>
      <TabContainer>
        <TabButton active={activeTab === 'character'} onClick={() => setActiveTab('character')}>캐릭터</TabButton>
        <TabButton active={activeTab === 'myCharacter'} onClick={() => setActiveTab('myCharacter')}>내 캐릭터</TabButton>
        <TabButton active={activeTab === 'theme'} onClick={() => setActiveTab('theme')}>테마</TabButton>
      </TabContainer>
      <ItemGrid>
        {activeTab === 'character' && characterCodes.map(code => {
          const isOwned = isCharacterOwned(code);
          return (
            <ItemSlot 
              key={code} 
              className={`${selectedItem === code ? 'selected' : ''} ${isOwned ? 'owned' : 'not-owned'}`}
              onClick={() => handleItemSelect(code, isOwned)}
            >
              <img 
                src={getCharacterImage(code)} 
                alt={`캐릭터${code}`} 
                style={{width:'100%',height:'100%',objectFit:'contain'}} 
              />
              {!isOwned && <ItemSlotOverlay>미보유</ItemSlotOverlay>}
            </ItemSlot>
          );
        })}
        {activeTab === 'myCharacter' && ownedCharacterCodes.map(code => {
          return (
            <ItemSlot 
              key={code} 
              className={`${selectedItem === code ? 'selected' : ''} owned`}
              onClick={() => handleItemSelect(code, true)}
            >
              <img 
                src={getCharacterImage(code)} 
                alt={`캐릭터${code}`} 
                style={{width:'100%',height:'100%',objectFit:'contain'}} 
              />
            </ItemSlot>
          );
        })}
        {activeTab === 'theme' && themeBackgrounds.map((background, index) => (
          <ItemSlot 
            key={index} 
            className={selectedItem === background ? 'selected' : ''}
            onClick={() => handleItemSelect(background, true)}
          >
            <img 
              src={background} 
              alt={`테마${index + 1}`} 
              style={{width:'100%',height:'100%',objectFit:'contain'}} 
            />
          </ItemSlot>
        ))}
      </ItemGrid>
      <BottomBar>
        <ApplyButton onClick={handleApply}>적용하기</ApplyButton>
      </BottomBar>
    </PanelContainer>
  );
};

export default CustomizationPanel;