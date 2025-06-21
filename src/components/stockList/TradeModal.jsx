import { useState } from "react";
import styled from "styled-components";
import StockItemCard from "./StockItemCard";
import ReceiptComponent from "./Receipt";
import MarketView from './MarketView';

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
  background-color: ${({ $active }) => ($active ? 'white' : 'transparent')};
  border: none;
  border-bottom: 5px solid ${({ $active }) => ($active ? '#8d6e63' : 'transparent')};
  color: #5d4037;
  
  &:hover {
    background-color: ${({ $active }) => ($active ? 'white' : '#f7f2e9')};
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

const dummyItems = [
  {
      id: 1,
      name: "삼성전자",
      price: 59600,
      available: 318,
      change: 400,
      avgBuyPrice: null,
      imageUrl: "/src/assets/stockIcon/005930.png",
    },
    {
      id: 2,
      name: "삼성전자",
      price: 59600,
      available: 318,
      change: 400,
      avgBuyPrice: null,
      imageUrl: "/src/assets/stockIcon/005930.png",
    },
  {
      id: 3,
      name: "삼성전자",
      price: 59600,
      available: 318,
      change: 400,
      avgBuyPrice: null,
      imageUrl: "/src/assets/stockIcon/005930.png",
    },
    {
      id: 4,
      name: "삼성전자",
      price: 59600,
      available: 318,
      change: 400,
      avgBuyPrice: null,
      imageUrl: "/src/assets/stockIcon/005930.png",
    },
  {
      id: 5,
      name: "삼성전자",
      price: 59600,
      available: 318,
      change: 400,
      avgBuyPrice: null,
      imageUrl: "/src/assets/stockIcon/005930.png",
    },
    {
      id: 6,
      name: "삼성전자",
      price: 59600,
      available: 318,
      change: 400,
      avgBuyPrice: null,
      imageUrl: "/src/assets/stockIcon/005930.png",
    },
];

const TradeModal = ({ onClose }) => {
  const [cart, setCart] = useState({});
  const [activeTab, setActiveTab] = useState("buy"); // 'buy', 'sell', 'market'

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

  const handlePurchase = () => {
    alert("구매가 완료되었습니다! (임시)");
    console.log("Purchased items:", cart);
    onClose();
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
    <ModalOverlay onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        <Title>{getTitle()}</Title>

        <TopInfoBar>
          <InfoItem>
            현재 소지 금액<span>30,000,000</span>
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
          
          {activeTab === 'market' ? (
            <MarketView items={dummyItems} />
          ) : (
            <>
              <ItemList>
                {dummyItems.map((item) => (
                  <StockItemCard
                    key={item.id}
                    item={item}
                    onCartChange={handleCartChange}
                  />
                ))}
              </ItemList>
              <ReceiptComponent cart={cart} onPurchase={handlePurchase} />
            </>
          )}
        </ModalContent>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default TradeModal;
