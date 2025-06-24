import styled, { keyframes } from "styled-components";
import useUserStore from "../../store/useUserStore";
import useStockStore from "../../store/useStockStore";
import OwnedStockCard from "./OwnedStockCard";

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
  width: 95%;
  max-width: 1600px;
  height: 85%;
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

  @media (max-width: 1400px) {
    width: 98%;
  }
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

const Content = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100% - 80px);
  gap: 25px;
`;

const StockList = styled.div`
  flex-grow: 1;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 25px;
  overflow-y: auto;
  align-content: flex-start;
  padding: 15px;
  margin-bottom: 20px;
`;

const ConnectionStatus = styled.div`
  position: absolute;
  top: 15px;
  left: 15px;
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 0.9rem;
  font-weight: bold;
  background-color: ${(props) => (props.isConnected ? "#4caf50" : "#f44336")};
  color: white;
`;

const NavigateButton = styled.button`
  padding: 15px 25px;
  border: 4px solid #a1887f;
  background: #f3e9d3;
  border-radius: 10px;
  font-size: 1.2rem;
  font-weight: bold;
  color: #5d4037;
  width: fit-content;
  margin: 0 auto;
  cursor: pointer;

  &:hover {
    background: #e0d0b8;
  }
`;

const MyStocksModal = ({ onClose, onNavigate }) => {
  const { stocks } = useUserStore((state) => state.assets);
  const { getStockByName, isConnected, connectionStatus } = useStockStore();

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        <Title>내 주식</Title>
        <Content>
          <StockList>
            {stocks.map((item) => {
              const realTimeStock = getStockByName(item.name);
              const currentPrice =
                realTimeStock?.currentPrice || item.avgBuyPrice;
              return (
                <OwnedStockCard
                  key={item.id}
                  item={item}
                  currentPrice={currentPrice}
                  realTimeData={realTimeStock}
                />
              );
            })}
          </StockList>
          <NavigateButton onClick={onNavigate}>구매/판매 창으로</NavigateButton>
        </Content>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default MyStocksModal;
