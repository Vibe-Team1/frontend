import { useState } from 'react';
import styled from 'styled-components';

const PanelContainer = styled.div`
  flex-grow: 1;
  border: 3px solid #d8c8b0;
  border-radius: 10px;
  padding: 20px;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h2`
  background-color: #8e44ad;
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
    cursor: pointer;
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
    cursor: pointer;
`;

const CustomizationPanel = () => {
  const [activeTab, setActiveTab] = useState('theme');
  
  return (
    <PanelContainer>
      <Title>꾸미기</Title>
      <TabContainer>
        <TabButton active={activeTab === 'frame'} onClick={() => setActiveTab('frame')}>프레임</TabButton>
        <TabButton active={activeTab === 'icon'} onClick={() => setActiveTab('icon')}>아이콘</TabButton>
        <TabButton active={activeTab === 'theme'} onClick={() => setActiveTab('theme')}>테마</TabButton>
      </TabContainer>
      <ItemGrid>
        {/* Items will be rendered here based on the active tab */}
        {Array.from({ length: 10 }).map((_, i) => <ItemSlot key={i} />)}
      </ItemGrid>
      <BottomBar>
        <ApplyButton>적용하기</ApplyButton>
      </BottomBar>
    </PanelContainer>
  );
};

export default CustomizationPanel; 