import { useState } from "react";
import styled, { keyframes } from "styled-components";
import useUserStore from "../../store/useUserStore";
import useStockStore from "../../store/useStockStore";
import StockItemCard from "./StockItemCard";
import ReceiptComponent from "./Receipt";
import MarketView from "./MarketView";
import NotificationModal from "../common/NotificationModal";
import {
  executeTrade,
  getAccountInfo,
  getUserStocks,
  getPortfolio,
} from "../../api/tradeApi";

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
    type: "success",
    title: "",
    message: "",
  });

  const { cash, stocks } = useUserStore((state) => state.assets);
  const { totalTrades } = useUserStore();
  const {
    updateCash,
    addStock,
    updateStock,
    updateStocks,
    incrementTotalTrades,
    fetchAccountInfo,
    fetchUserStocks,
  } = useUserStore();
  const { getFormattedStockData } = useStockStore();

  // 웹소켓에서 받은 6개 종목만 사용 (getFormattedStockData가 이미 6개만 반환)
  const stockItems = getFormattedStockData();

  // 디버깅용 로그 추가
  console.log("getFormattedStockData:", getFormattedStockData());
  console.log("stockItems:", stockItems);

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
      message,
    });
  };

  const handlePurchase = async () => {
    console.log("handlePurchase called, activeTab:", activeTab, "cart:", cart);

    if (Object.keys(cart).length === 0) {
      showNotification("error", "거래 실패", "선택된 주식이 없습니다!");
      return;
    }

    // 각 주식별로 거래 실행
    for (const { item, quantity } of Object.values(cart)) {
      const tradeData = {
        stockCode: item.stockCode,
        stockName: item.name,
        quantity: quantity,
        price: item.price,
        tradeType: activeTab === "buy" ? "BUY" : "SELL",
      };

      try {
        const result = await executeTrade(tradeData);

        if (result.data.success) {
          console.log(
            `${item.name} ${activeTab === "buy" ? "매수" : "매도"} 성공:`,
            result.data.data
          );
        } else {
          showNotification("error", "거래 실패", result.data.message);
          return;
        }
      } catch (error) {
        console.error(`${item.name} 거래 실패:`, error);
        const errorMessage =
          error.response?.data?.message || "거래 실행에 실패했습니다.";
        showNotification("error", "거래 실패", errorMessage);
        return;
      }
    }

    // 모든 거래가 성공한 경우
    showNotification(
      "success",
      activeTab === "buy" ? "매수 완료" : "매도 완료",
      activeTab === "buy"
        ? "주식 매수가 성공적으로 완료되었습니다!"
        : "주식 매도가 성공적으로 완료되었습니다!"
    );

    // 거래 완료 후 계좌 정보와 보유 주식 업데이트
    await fetchAccountInfo();
    await fetchUserStocks();

    // 장바구니 초기화 및 카드 리셋
    setCart({});
    setResetKey((prev) => prev + 1);
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
              보유 주식 수<span>{stocks.length}종목</span>
            </InfoItem>
            <InfoItem>
              총 거래 횟수<span>{totalTrades}회</span>
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
              <MarketView />
            ) : (
              <>
                <ItemList>
                  {stockItems.map((item) => (
                    <StockItemCard
                      key={`${item.id}-${resetKey}`}
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
