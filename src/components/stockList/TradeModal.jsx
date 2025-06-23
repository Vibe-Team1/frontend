import { useState } from "react";
import styled, { keyframes } from "styled-components";
import useUserStore from "../../store/useUserStore";
import StockItemCard from "./StockItemCard";
import ReceiptComponent from "./Receipt";
import MarketView from "./MarketView";
import NotificationModal from "../common/NotificationModal";

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
  width: 90%;
  height: 85%;
  background-color: #f3e9d3; /* Parchment background */
  border: 10px solid #4a2e2a;
  border-radius: 15px;
  box-shadow: inset 0 0 0 5px #8d6e63;
  padding: 25px;
  box-sizing: border-box;
  position: relative;
  animation: ${scaleUp} 0.25s ease-out forwards;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  background-color: #e57373;
  color: white;
  border: 3px solid #c62828;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  font-size: 24px;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;

  &:hover {
    background-color: #ef5350;
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

const TopInfoBar = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 20px;
  background-color: #d8c8b0;
  border-radius: 8px;
  margin-bottom: 20px;
  font-family: monospace;
  color: #5d4037;
`;

const InfoItem = styled.div`
  font-size: 1rem;
  & span {
    font-weight: bold;
    margin-left: 10px;
  }
`;

const ModalContent = styled.div`
  display: flex;
  height: calc(100% - 130px); /* Adjust based on title and info bar height */
  gap: 20px;
`;

const LeftNav = styled.nav`
  width: 150px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Tab = styled.button`
  padding: 15px 30px;
  font-size: 1.2rem;
  font-weight: bold;
  cursor: pointer;
  background-color: ${({ $active }) => ($active ? "white" : "transparent")};
  border: none;
  border-bottom: 5px solid
    ${({ $active }) => ($active ? "#8d6e63" : "transparent")};
  color: #5d4037;

  &:hover {
    background-color: ${({ $active }) => ($active ? "white" : "#f7f2e9")};
  }
`;

const ItemList = styled.div`
  flex-grow: 1;
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  overflow-y: auto;
  padding: 10px;
  align-content: flex-start;
  /* background-color: rgba(0,0,0,0.1); */ /* Placeholder removed */
`;

const Receipt = styled.aside`
  width: 350px;
  flex-shrink: 0;
  /* background-color: rgba(0,0,0,0.1); */ /* Placeholder removed */
`;

const TradeModal = ({ onClose }) => {
  const [cart, setCart] = useState({});
  const [activeTab, setActiveTab] = useState("buy"); // 'buy', 'sell', 'market'
  const [resetKey, setResetKey] = useState(0); // 카드 리셋을 위한 key
  const [notification, setNotification] = useState({
    isOpen: false,
    type: 'success',
    title: '',
    message: ''
  });
  
  const { cash, stocks } = useUserStore((state) => state.assets);
  const { updateCash, addStock, updateStock, updateStocks, incrementTotalTrades } = useUserStore();
  
  // 더미 주식 데이터 (실제로는 API에서 가져와야 함)
  const dummyItems = [
    { id: 1, name: '삼성전자', price: 82400, available: 500, change: 1200, avgBuyPrice: null, imageUrl: '/src/assets/stockIcon/005930.png'},
    { id: 2, name: 'SK하이닉스', price: 184500, available: 300, change: -2500, avgBuyPrice: null, imageUrl: '/src/assets/stockIcon/000660.png'},
    { id: 3, name: 'LG에너지솔루션', price: 388000, available: 100, change: 5500, avgBuyPrice: null, imageUrl: '/src/assets/stockIcon/373220.png'},
    { id: 4, name: '삼성바이오로직스', price: 805000, available: 50, change: -10000, avgBuyPrice: null, imageUrl: '/src/assets/stockIcon/207940.png'},
    { id: 5, name: '현대차', price: 251000, available: 200, change: 3000, avgBuyPrice: null, imageUrl: '/src/assets/stockIcon/005380.png'},
    { id: 6, name: '기아', price: 115000, available: 400, change: -1000, avgBuyPrice: null, imageUrl: '/src/assets/stockIcon/000270.png'},
    { id: 7, name: '셀트리온', price: 181000, available: 250, change: 4200, avgBuyPrice: null, imageUrl: '/src/assets/stockIcon/068270.png'},
    { id: 8, name: 'POSCO홀딩스', price: 435000, available: 80, change: -5000, avgBuyPrice: null, imageUrl: '/src/assets/stockIcon/005490.png'},
    { id: 9, name: 'NAVER', price: 188000, available: 300, change: 1500, avgBuyPrice: null, imageUrl: '/src/assets/stockIcon/035420.png'},
    { id: 10, name: 'LG화학', price: 450000, available: 90, change: -8000, avgBuyPrice: null, imageUrl: '/src/assets/stockIcon/051910.png'},
    { id: 11, name: '삼성SDI', price: 420000, available: 120, change: 7000, avgBuyPrice: null, imageUrl: '/src/assets/stockIcon/006400.png'},
    { id: 12, name: '삼성물산', price: 150000, available: 350, change: -2000, avgBuyPrice: null, imageUrl: '/src/assets/stockIcon/028260.png'},
    { id: 13, name: 'KB금융', price: 76000, available: 600, change: 800, avgBuyPrice: null, imageUrl: '/src/assets/stockIcon/105560.png'},
    { id: 14, name: '카카오', price: 52000, available: 1000, change: -500, avgBuyPrice: null, imageUrl: '/src/assets/stockIcon/035720.png'},
  ];

  const handleCartChange = (item, quantity) => {
    setCart((prevCart) => {
      const newCart = { ...prevCart };
      if (quantity > 0) {
        newCart[item.id] = { item, quantity };
      } else {
        delete newCart[item.id];
      }
      return newCart;
    });
  };

  const showNotification = (type, title, message) => {
    setNotification({
      isOpen: true,
      type,
      title,
      message
    });
  };

  const handlePurchase = () => {
    console.log("handlePurchase called, activeTab:", activeTab, "cart:", cart);
    
    if (activeTab === "buy") {
      // 매수 로직
      let totalCost = 0;
      
      // 총 비용 계산
      Object.values(cart).forEach(({ item, quantity }) => {
        totalCost += item.price * quantity;
      });
      
      console.log("Total cost:", totalCost, "Available cash:", cash);
      
      // 현금이 부족한지 확인
      if (totalCost > cash) {
        showNotification('error', '매수 실패', '현금이 부족합니다!');
        return;
      }
      
      // 현금 차감
      updateCash(-totalCost);
      
      // 주식 추가 또는 업데이트
      Object.values(cart).forEach(({ item, quantity }) => {
        const existingStock = stocks.find(stock => stock.name === item.name);
        
        if (existingStock) {
          // 기존 주식이 있으면 수량과 평균 구매가 업데이트
          const newQuantity = existingStock.quantity + quantity;
          const newAvgBuyPrice = Math.round(
            ((existingStock.avgBuyPrice * existingStock.quantity) + (item.price * quantity)) / newQuantity
          );
          
          updateStock({
            ...existingStock,
            quantity: newQuantity,
            avgBuyPrice: newAvgBuyPrice
          });
        } else {
          // 새로운 주식 추가
          addStock({
            id: Date.now() + Math.random(), // 임시 ID 생성
            name: item.name,
            quantity: quantity,
            avgBuyPrice: item.price,
            imageUrl: item.imageUrl
          });
        }
      });
      
      showNotification('success', '매수 완료', '주식 매수가 성공적으로 완료되었습니다!');
      
    } else if (activeTab === "sell") {
      // 매도 로직
      console.log("Selling stocks:", cart);
      console.log("Current stocks:", stocks);
      
      let totalRevenue = 0;
      
      // 총 수익 계산
      Object.values(cart).forEach(({ item, quantity }) => {
        totalRevenue += item.price * quantity;
      });
      
      // 수수료 계산 (1% 차감)
      const fee = totalRevenue * 0.01;
      const netRevenue = totalRevenue - fee;
      
      console.log("Total revenue:", totalRevenue, "Fee:", fee, "Net revenue:", netRevenue);
      
      // 보유 주식 확인 및 차감
      for (const { item, quantity } of Object.values(cart)) {
        const existingStock = stocks.find(stock => stock.name === item.name);
        
        console.log(`Checking ${item.name}:`, existingStock, "requested quantity:", quantity);
        
        if (!existingStock) {
          showNotification('error', '매도 실패', `${item.name}을(를) 보유하고 있지 않습니다!`);
          return;
        }
        
        if (existingStock.quantity < quantity) {
          showNotification('error', '매도 실패', `${item.name}의 보유 수량이 부족합니다! (보유: ${existingStock.quantity}, 요청: ${quantity})`);
          return;
        }
      }
      
      // 주식 차감 및 현금 추가
      const updatedStocks = [...stocks];
      Object.values(cart).forEach(({ item, quantity }) => {
        const stockIndex = updatedStocks.findIndex(stock => stock.name === item.name);
        const existingStock = updatedStocks[stockIndex];
        
        console.log(`Processing ${item.name}:`, existingStock, "quantity to sell:", quantity);
        
        if (existingStock.quantity === quantity) {
          // 모든 주식을 매도하는 경우, 주식 목록에서 제거
          console.log(`Removing ${item.name} completely`);
          updatedStocks.splice(stockIndex, 1);
        } else {
          // 일부만 매도하는 경우, 수량만 차감
          console.log(`Reducing ${item.name} quantity from ${existingStock.quantity} to ${existingStock.quantity - quantity}`);
          updatedStocks[stockIndex] = {
            ...existingStock,
            quantity: existingStock.quantity - quantity
          };
        }
      });
      
      console.log("Updated stocks:", updatedStocks);
      
      // 주식 배열 업데이트
      updateStocks(updatedStocks);
      
      // 현금 추가 (수수료 차감 후)
      updateCash(netRevenue);
      
      showNotification('success', '매도 완료', '주식 매도가 성공적으로 완료되었습니다!');
    }
    
    // 장바구니 초기화 및 카드 리셋
    setCart({});
    setResetKey(prev => prev + 1); // 카드들을 강제로 리렌더링
    incrementTotalTrades();
  };

  const getTitle = () => {
    switch (activeTab) {
      case "buy":
        return "주식 매수";
      case "sell":
        return "주식 매도";
      case "market":
        return "주가 정보";
      default:
        return "매매";
    }
  };

  return (
    <>
      <ModalOverlay onClick={onClose}>
        <ModalContainer onClick={(e) => e.stopPropagation()}>
          <CloseButton onClick={onClose}>&times;</CloseButton>
          <Title>{getTitle()}</Title>

          <TopInfoBar>
            <InfoItem>
              현재 소지 금액<span>{cash.toLocaleString()}</span>
            </InfoItem>
            <InfoItem>
              예상 창고 용량<span>12/200</span>
            </InfoItem>
            <InfoItem>
              일일 구매 한도<span>10/100</span>
            </InfoItem>
          </TopInfoBar>

          <ModalContent>
            <LeftNav>
              <Tab
                $active={activeTab === "buy"}
                onClick={() => setActiveTab("buy")}
              >
                매수
              </Tab>
              <Tab
                $active={activeTab === "sell"}
                onClick={() => setActiveTab("sell")}
              >
                매도
              </Tab>
              <Tab
                $active={activeTab === "market"}
                onClick={() => setActiveTab("market")}
              >
                주가
              </Tab>
            </LeftNav>

            {activeTab === "market" ? (
              <MarketView items={dummyItems} />
            ) : (
              <>
                <ItemList>
                  {dummyItems.map((item) => (
                    <StockItemCard
                      key={`${item.id}-${resetKey}`} // resetKey를 포함하여 강제 리렌더링
                      item={item}
                      onCartChange={handleCartChange}
                      mode={activeTab}
                    />
                  ))}
                </ItemList>

                <ReceiptComponent
                  cart={cart}
                  onPurchase={handlePurchase}
                  mode={activeTab}
                />
              </>
            )}
          </ModalContent>
        </ModalContainer>
      </ModalOverlay>
      
      <NotificationModal
        isOpen={notification.isOpen}
        onClose={() => setNotification({ ...notification, isOpen: false })}
        type={notification.type}
        title={notification.title}
        message={notification.message}
      />
    </>
  );
};

export default TradeModal;
