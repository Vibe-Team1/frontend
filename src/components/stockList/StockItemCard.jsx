import { useState } from "react";
import styled from "styled-components";
import useUserStore from "../../store/useUserStore";

const CardContainer = styled.div`
  background-color: #e8dcc5;
  border: 2px solid #c9b79c;
  border-radius: 10px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex: 1 1 calc(50% - 10px);
  box-sizing: border-box;
  font-family: monospace;
`;

const TopSection = styled.div`
  background-color: #d8c8b0;
  padding: 5px 10px;
  border-radius: 5px;
  text-align: center;
  font-size: 1.5rem;
  color: #5d4037;
  font-weight: bold;
`;

const MainContent = styled.div`
  display: flex;
  gap: 15px;
`;

const ItemImage = styled.div`
  width: 80px;
  height: 80px;
  background-image: url(${(props) => props.imageUrl});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  border-radius: 5px;
  flex-shrink: 0;
  align-self: center;
`;

const DetailsContainer = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-size: 0.9rem;
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
  gap: 10px;
`;

const ActionButton = styled(QuantityButton)`
  flex-grow: 1;
  padding: 8px;
  background-color: #ffab40;
`;

const StockItemCard = ({ item, onCartChange, mode }) => {
  const [quantity, setQuantity] = useState(0);
  const { stocks, cash } = useUserStore((state) => state.assets);
  
  // 보유 주식 찾기
  const ownedStock = stocks.find(stock => stock.name === item.name);
  const ownedQuantity = ownedStock ? ownedStock.quantity : 0;
  
  // 최대 구매/매도 가능 수량 계산
  let maxQuantity;
  if (mode === "sell") {
    // 매도 모드: 보유 수량
    maxQuantity = ownedQuantity;
  } else {
    // 매수 모드: 현금으로 구매 가능한 수량
    maxQuantity = Math.floor(cash / item.price);
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

  return (
    <CardContainer>
      <TopSection>{item.name}</TopSection>
      <MainContent>
        <ItemImage imageUrl={item.imageUrl} />
        <DetailsContainer>
          <InfoRow>
            <span>
              {mode === "sell" 
                ? `${ownedQuantity}주 보유` 
                : `${maxQuantity}주 구매 가능`
              }
            </span>
          </InfoRow>
          <InfoRow>
            <span>전일 대비</span>
            <PriceChange isPositive={item.change > 0}>
              {item.change > 0 ? "+" : ""}
              {item.change.toLocaleString()}
            </PriceChange>
          </InfoRow>
          <InfoRow>
            <span>나의 평균 구매가</span>
            <span>
              {ownedStock
                ? `${ownedStock.avgBuyPrice.toLocaleString()}G`
                : "미구매"}
            </span>
          </InfoRow>
          <InfoRow>
            <span>주당</span>
            <span>{item.price.toLocaleString()}G</span>
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
            {(quantity * item.price).toLocaleString()} (G)
          </TotalPrice>
        </ActionButtons>
      </BottomControls>
    </CardContainer>
  );
};

export default StockItemCard;
