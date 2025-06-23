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

    &.selected {
        border-color: #ffab40;
    }
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

const characterIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const unavailableIds = [5, 8]; // 없는 캐릭터 예시

const costumeIds = Array.from({ length: 15 }, (_, i) => i + 1);

const ItemSlotOverlay = styled.div`
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.8);
  border-radius: 8px;
  z-index: 2;
`;

const ItemSlotWithOverlay = styled(ItemSlot)`
  position: relative;
`;

const CustomizationPanel = () => {
  const [activeTab, setActiveTab] = useState('character');
  const { selectedCharacter, updateSelectedCharacter, updateSelectedCostume, updateSelectedTheme } = useUserStore();
  const [selectedItem, setSelectedItem] = useState(null);
  
  // 테마 배경화면 배열
  const themeBackgrounds = [
    "/src/assets/main-background3.png",
    "/src/assets/main-background5.jpeg"
  ];
  
  // 캐릭터 이미지 경로 생성 함수
  const getCharacterImage = (characterCode) => {
    return `/characters/${characterCode}01.gif`; // 기본 의상(01번)으로 표시
  };
  
  // 의상 이미지 경로 생성 함수
  const getCostumeImage = (costumeCode) => {
    const costumeStr = costumeCode.toString().padStart(2, '0');
    return `/characters/${selectedCharacter.characterCode}${costumeStr}.gif`;
  };
  
  // 적용하기 함수
  const handleApply = () => {
    if (selectedItem) {
      if (activeTab === 'character') {
        updateSelectedCharacter(selectedItem);
      } else if (activeTab === 'costume') {
        updateSelectedCostume(selectedItem);
      } else if (activeTab === 'theme') {
        updateSelectedTheme(selectedItem);
      }
      setSelectedItem(null);
    }
  };
  
  // 아이템 선택 함수
  const handleItemSelect = (itemId) => {
    setSelectedItem(itemId);
  };
  
  return (
    <PanelContainer>
      <Title>꾸미기</Title>
      <TabContainer>
        <TabButton active={activeTab === 'character'} onClick={() => setActiveTab('character')}>캐릭터</TabButton>
        <TabButton active={activeTab === 'costume'} onClick={() => setActiveTab('costume')}>의상</TabButton>
        <TabButton active={activeTab === 'theme'} onClick={() => setActiveTab('theme')}>테마</TabButton>
      </TabContainer>
      <ItemGrid>
        {activeTab === 'character' && characterIds.map(id => (
          <ItemSlotWithOverlay 
            key={id} 
            className={selectedItem === id ? 'selected' : ''}
            onClick={() => handleItemSelect(id)}
          >
            <img 
              src={getCharacterImage(id)} 
              alt={`캐릭터${id}`} 
              style={{width:'100%',height:'100%',objectFit:'contain'}} 
            />
            {unavailableIds.includes(id) && <ItemSlotOverlay />}
          </ItemSlotWithOverlay>
        ))}
        {activeTab === 'costume' && costumeIds.map(id => (
          <ItemSlot 
            key={id} 
            className={selectedItem === id ? 'selected' : ''}
            onClick={() => handleItemSelect(id)}
          >
            <img 
              src={getCostumeImage(id)} 
              alt={`의상${id}`} 
              style={{width:'100%',height:'100%',objectFit:'contain'}} 
            />
          </ItemSlot>
        ))}
        {activeTab === 'theme' && themeBackgrounds.map((background, index) => (
          <ItemSlotWithOverlay 
            key={index} 
            className={selectedItem === background ? 'selected' : ''}
            onClick={() => handleItemSelect(background)}
          >
            <img 
              src={background} 
              alt={`테마${index + 1}`} 
              style={{width:'100%',height:'100%',objectFit:'contain'}} 
            />
          </ItemSlotWithOverlay>
        ))}
      </ItemGrid>
      <BottomBar>
        <ApplyButton onClick={handleApply}>적용하기</ApplyButton>
      </BottomBar>
    </PanelContainer>
  );
};

export default CustomizationPanel;