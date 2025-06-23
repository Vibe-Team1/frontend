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
  grid-template-columns: repeat(auto-fill, minmax(330px, 1fr));
  gap: 20px;
  overflow-y: auto;
  align-content: flex-start;
  padding: 5px 15px 5px 5px;
`;

// This dummy data should ideally come from a shared source or API
const dummyItems = [
    { id: 1, name: '삼성전자', price: 82400 },
    { id: 2, name: 'SK하이닉스', price: 184500 },
    { id: 3, name: 'LG에너지솔루션', price: 388000 },
    { id: 4, name: '삼성바이오로직스', price: 805000 },
    { id: 5, name: '현대차', price: 251000 },
    { id: 6, name: '기아', price: 115000 },
    { id: 7, name: '셀트리온', price: 181000 },
    { id: 8, name: 'POSCO홀딩스', price: 435000 },
    { id: 9, name: 'NAVER', price: 188000 },
    { id: 10, name: 'LG화학', price: 450000 },
    { id: 11, name: '삼성SDI', price: 420000 },
    { id: 12, name: '삼성물산', price: 150000 },
    { id: 13, name: 'KB금융', price: 76000 },
    { id: 14, name: '카카오', price: 52000 },
];

const MyStocksModal = ({ onClose, onNavigate }) => {
  const { stocks } = useUserStore((state) => state.assets);
  const stockPrices = dummyItems.reduce((acc, item) => {
    acc[item.name] = item.price;
    return acc;
  }, {});

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        <Title>내 주식</Title>
        <Content>
          <StockList>
            {stocks.map((item) => {
              const currentPrice = stockPrices[item.name] || item.avgBuyPrice;
              return (
                <OwnedStockCard key={item.id} item={item} currentPrice={currentPrice} />
              )
            })}
          </StockList>
          <NavigateButton onClick={onNavigate}>구매/판매 창으로</NavigateButton>
        </Content>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default MyStocksModal; 