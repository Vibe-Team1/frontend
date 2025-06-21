import styled from 'styled-components';
import OwnedStockCard from './OwnedStockCard';

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
  height: calc(100% - 60px);
  gap: 25px;
  margin-top: 60px;
`;

const NavigateButton = styled.button`
    padding: 15px 25px;
    border: 3px solid #795548;
    background: white;
    border-radius: 10px;
    font-size: 1.2rem;
    font-weight: bold;
    cursor: pointer;
    color: #5D4037;
    box-shadow: 3px 3px 5px rgba(0,0,0,0.2);
    height: fit-content;

    &:hover {
        background: #fdfaf4;
    }
`;

const StockList = styled.div`
  flex-grow: 1;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 25px;
  overflow-y: auto;
  align-content: flex-start;
  padding: 5px 15px 5px 5px;
`;

// Dummy data for owned stocks
const dummyOwnedStocks = [
    { id: 1, name: '삼성전자', quantity: 8, price: 57000, change: 400, avgBuyPrice: 56000, profit: 8000, imageUrl: '/src/assets/stockIcon/005930.png' },
    { id: 2, name: '삼성전자', quantity: 8, price: 57000, change: 400, avgBuyPrice: 56000, profit: 8000, imageUrl: '/src/assets/stockIcon/005930.png' },
    { id: 3, name: '삼성전자', quantity: 8, price: 57000, change: 400, avgBuyPrice: 56000, profit: 8000, imageUrl: '/src/assets/stockIcon/005930.png' },
    { id: 4, name: '삼성전자', quantity: 8, price: 57000, change: 400, avgBuyPrice: 56000, profit: 8000, imageUrl: '/src/assets/stockIcon/005930.png' },
    { id: 5, name: '삼성전자', quantity: 8, price: 57000, change: 400, avgBuyPrice: 56000, profit: 8000, imageUrl: '/src/assets/stockIcon/005930.png' },
    { id: 6, name: '삼성전자', quantity: 8, price: 57000, change: 400, avgBuyPrice: 56000, profit: 8000, imageUrl: '/src/assets/stockIcon/005930.png' },
    { id: 7, name: '삼성전자', quantity: 8, price: 57000, change: 400, avgBuyPrice: 56000, profit: 8000, imageUrl: '/src/assets/stockIcon/005930.png' },
    { id: 8, name: '삼성전자', quantity: 8, price: 57000, change: 400, avgBuyPrice: 56000, profit: 8000, imageUrl: '/src/assets/stockIcon/005930.png' },
];

const MyStocksModal = ({ onClose }) => {
  return (
    <ModalOverlay onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        <Content>
            <StockList>
                {dummyOwnedStocks.map(item => (
                    <OwnedStockCard key={item.id} item={item} />
                ))}
            </StockList>
            <NavigateButton>구매/판매 창으로</NavigateButton>
        </Content>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default MyStocksModal; 