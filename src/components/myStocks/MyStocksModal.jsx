import styled, { keyframes } from 'styled-components';
import useUserStore from '../../store/useUserStore';
import OwnedStockCard from './OwnedStockCard';

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
  width: 90%; max-width: 1400px; height: 85%;
  background-color: #f3e9d3;
  border: 10px solid #4a2e2a; border-radius: 15px;
  box-shadow: inset 0 0 0 5px #8d6e63;
  padding: 25px; box-sizing: border-box; position: relative;
  font-family: monospace; color: #5d4037;
  animation: ${scaleUp} 0.25s ease-out forwards;
`;

const Title = styled.h2`
  text-align: center;
  font-family: monospace;
  font-size: 2.5rem;
  color: #5d4037;
  margin-top: 0;
  margin-bottom: 20px;
`;

const CloseButton = styled.button`
  position: absolute; top: 15px; right: 15px;
  background-color: #ffab40; color: #5d4037;
  border: 3px solid #c62828; border-radius: 50%;
  width: 40px; height: 40px; font-size: 24px; font-weight: bold;
  cursor: pointer; display: flex; justify-content: center; align-items: center; z-index: 10;
  &:hover { background-color: #ffb74d; }
`;

const Content = styled.div`
  display: flex;
  flex-direction: row;
  height: calc(100% - 80px);
  gap: 25px;
`;

const NavigateButton = styled.button`
  padding: 15px 25px;
  border: 4px solid #a1887f;
  background: #f3e9d3;
  border-radius: 10px;
  font-size: 1.2rem;
  font-weight: bold;
  cursor: pointer;
  color: #5d4037;
  height: fit-content;
  align-self: flex-start;

  &:hover {
    background: #e0d0b8;
  }
`;

const StockList = styled.div`
  flex-grow: 1;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(450px, 1fr));
  gap: 25px;
  overflow-y: auto;
  align-content: flex-start;
  padding: 5px 15px 5px 5px;
`;

const MyStocksModal = ({ onClose, onNavigate }) => {
  const { stocks } = useUserStore((state) => state.assets);

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        <Title>내 주식</Title>
        <Content>
          <StockList>
            {stocks.map((item) => (
              <OwnedStockCard key={item.id} item={item} />
            ))}
          </StockList>
          <NavigateButton onClick={onNavigate}>구매/판매 창으로</NavigateButton>
        </Content>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default MyStocksModal; 