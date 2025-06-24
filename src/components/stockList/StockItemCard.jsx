import { useState } from "react";
import styled from "styled-components";
import useUserStore from "../../store/useUserStore";
import useStockStore from "../../store/useStockStore";

const CardContainer = styled.div`
  background-color: #e8dcc5;
  border: 2px solid #c9b79c;
  border-radius: 16px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  flex: 1 1 calc(50% - 20px);
  box-sizing: border-box;
  font-family: monospace;
  position: relative;
  min-width: 380px;
  min-height: 220px;
  font-size: 1.15rem;
`;

const TopSection = styled.div`
  background-color: #d8c8b0;
  padding: 8px 12px;
  border-radius: 8px;
  text-align: center;
  font-size: 2rem;
  color: #5d4037;
  font-weight: bold;
`;

const MainContent = styled.div`
  display: flex;
  gap: 24px;
`;

const ItemImage = styled.div`
  width: 110px;
  height: 110px;
  background-image: url(${(props) => props.imageUrl});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  border-radius: 8px;
  flex-shrink: 0;
  align-self: center;
`;

const DetailsContainer = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: 14px;
  font-size: 1.1rem;
  color: #6d5b4f;
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
`;

const PriceChange = styled.span`
  color: ${(props) => (props.isPositive ? "#2e7d32" : "#c62828")};
  font-weight: bold;
`;

const RealTimeIndicator = styled.div`
  position: absolute;
  top: 5px;
  right: 5px;
  width: 8px;
  height: 8px;
  background-color: #4caf50;
  border-radius: 50%;
  animation: pulse 1.5s infinite;

  @keyframes pulse {
    0% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
    100% {
      opacity: 1;
    }
  }
`;

const BottomControls = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const QuantitySelector = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const QuantityButton = styled.button`
  background-color: #ffcc80;
  border: 2px solid #ffa726;
  color: #5d4037;
  font-weight: bold;
  padding: 5px 10px;
  border-radius: 5px;
  &:hover {
    background-color: #ffb74d;
  }
  &:disabled {
    background-color: #e0e0e0;
    border-color: #bdbdbd;
  }
`;

const QuantityInput = styled.input`
  width: 50px;
  text-align: center;
  font-size: 1.2rem;
  border: 2px solid #c9b79c;
  background-color: #fff9e9;
  border-radius: 5px;
  padding: 5px;
  -moz-appearance: textfield;
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

const TotalPrice = styled.div`
  flex-grow: 1;
  color: black;
  border: 2px solid #c9b79c;
  background-color: #fff9e9;
  border-radius: 5px;
  padding: 8px;
  text-align: center;
  font-size: 1.1rem;
  font-weight: bold;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 15px;
`;

const ActionButton = styled(QuantityButton)`
  flex-grow: 1;
  padding: 8px;
  font-size: 1.1rem;
  background-color: #ffab40;
`;

const StockItemCard = ({ item, onCartChange, mode }) => {
  const [quantity, setQuantity] = useState(0);
  const { stocks, cash } = useUserStore((state) => state.assets);
  const { getStockByCode } = useStockStore();

  // 실시간 데이터만 사용 (더미/초기화 없음)
  const realTimeData = getStockByCode(item.stockCode);

  // 보유 주식 찾기 (백엔드 데이터 기준)
  const ownedStock = stocks.find((stock) => stock.stockCode === item.stockCode);
  const ownedQuantity = ownedStock ? ownedStock.quantity : 0;

  // 최대 구매/매도 가능 수량 계산
  let maxQuantity;
  if (mode === "sell") {
    maxQuantity = ownedQuantity;
  } else {
    // 실시간 가격 사용
    const currentPrice = realTimeData?.currentPrice || item.price || 1;
    maxQuantity = Math.floor(cash / currentPrice);
  }

  const updateQuantity = (newAmount) => {
    const newQuantity = Math.max(0, Math.min(maxQuantity, newAmount));
    setQuantity(newQuantity);
    if (onCartChange) {
      onCartChange(item, newQuantity);
    }
  };

  const handleInputChange = (e) => {
    const value = parseInt(e.target.value, 10);
    updateQuantity(isNaN(value) ? 0 : value);
  };

  // 전일 대비, 주당 가격 실시간 데이터 기준 표시
  const changeAmount = realTimeData?.changeAmount ?? 0;
  const changeRate = realTimeData?.changeRate ?? 0;
  const currentPrice = realTimeData?.currentPrice ?? item.price ?? 0;

  return (
    <CardContainer>
      {realTimeData && <RealTimeIndicator />}
      <TopSection>{item.name}</TopSection>
      <MainContent>
        <ItemImage imageUrl={item.imageUrl} />
        <DetailsContainer>
          <InfoRow>
            <span>
              {mode === "sell"
                ? `${ownedQuantity}주 보유`
                : `${maxQuantity}주 구매 가능`}
            </span>
          </InfoRow>
          <InfoRow>
            <span>전일 대비</span>
            <PriceChange isPositive={changeAmount > 0}>
              {changeAmount > 0 ? "+" : ""}
              {changeAmount.toLocaleString()}원 ({changeRate > 0 ? "+" : ""}
              {(changeRate || 0).toFixed(2)}%)
            </PriceChange>
          </InfoRow>
          <InfoRow>
            <span>나의 평균 구매가</span>
            <span>
              {ownedStock
                ? `${ownedStock.avgBuyPrice.toLocaleString()}원`
                : "미구매"}
            </span>
          </InfoRow>
          <InfoRow>
            <span>주당</span>
            <span>{currentPrice.toLocaleString()}원</span>
          </InfoRow>
        </DetailsContainer>
      </MainContent>
      <BottomControls>
        <QuantitySelector>
          <QuantityButton onClick={() => updateQuantity(quantity - 10)}>
            -10
          </QuantityButton>
          <QuantityButton onClick={() => updateQuantity(quantity - 1)}>
            -1
          </QuantityButton>
          <QuantityInput
            type="number"
            value={quantity}
            onChange={handleInputChange}
          />
          <QuantityButton onClick={() => updateQuantity(quantity + 1)}>
            +1
          </QuantityButton>
          <QuantityButton onClick={() => updateQuantity(quantity + 10)}>
            +10
          </QuantityButton>
        </QuantitySelector>
        <ActionButtons>
          <ActionButton onClick={() => updateQuantity(0)}>최소</ActionButton>
          <ActionButton onClick={() => updateQuantity(maxQuantity)}>
            최대
          </ActionButton>
          <TotalPrice>
            {(quantity * currentPrice).toLocaleString()} (원)
          </TotalPrice>
        </ActionButtons>
      </BottomControls>
    </CardContainer>
  );
};

export default StockItemCard;
