import styled from "styled-components";

const CardContainer = styled.div`
  background-color: #fff9e9;
  border: 3px solid #c9b79c;
  border-radius: 15px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  position: relative;
  height: 100%;
  box-sizing: border-box;
`;

const StockHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  padding-bottom: 12px;
  border-bottom: 2px dashed #c9b79c;
`;

const StockImage = styled.div`
  width: 80px;
  height: 80px;
  background-image: url(${(props) => props.imageUrl});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  border-radius: 8px;
  flex-shrink: 0;
`;

const StockName = styled.h3`
  margin: 0;
  font-size: 1.4rem;
  color: #5d4037;
  flex-grow: 1;
  word-break: break-word;
`;

const StockInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-size: 1rem;
  flex-grow: 1;
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 6px 0;
  border-bottom: 1px dashed #c9b79c;

  &:last-child {
    border-bottom: none;
  }
`;

const Label = styled.span`
  color: #8d6e63;
  font-weight: bold;
  font-size: 0.95rem;
`;

const Value = styled.span`
  color: #5d4037;
  font-weight: ${(props) => (props.highlight ? "bold" : "normal")};
  font-size: ${(props) => (props.highlight ? "1.1rem" : "0.95rem")};
  text-align: right;
`;

const PriceChange = styled.span`
  color: ${(props) => (props.isPositive ? "#2e7d32" : "#c62828")};
  font-size: 0.9rem;
  margin-left: 8px;
`;

const RealTimeIndicator = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
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

const OwnedStockCard = ({ item, currentPrice, realTimeData }) => {
  const { name, quantity, avgBuyPrice, imageUrl } = item;

  const totalBuyPrice = avgBuyPrice * quantity;
  const currentTotalValue = currentPrice * quantity;
  const profit = currentTotalValue - totalBuyPrice;
  const profitRate = totalBuyPrice > 0 ? (profit / totalBuyPrice) * 100 : 0;

  const profitColor =
    profit > 0 ? "#c84a31" : profit < 0 ? "#1252a1" : "#5d4037";

  // 실시간 데이터에서 가격 변화 정보 추출
  const priceChange = realTimeData?.priceChange || 0;
  const priceChangePercent = realTimeData?.priceChangePercent || 0;

  return (
    <CardContainer>
      {realTimeData && <RealTimeIndicator />}
      <StockHeader>
        <StockImage imageUrl={imageUrl} />
        <StockName>{name}</StockName>
      </StockHeader>
      <StockInfo>
        <InfoRow>
          <Label>보유 수량</Label>
          <Value>{quantity}주</Value>
        </InfoRow>
        <InfoRow>
          <Label>나의 평균가</Label>
          <Value>{avgBuyPrice.toLocaleString()}G</Value>
        </InfoRow>
        <InfoRow>
          <Label>현재가</Label>
          <Value>
            {currentPrice.toLocaleString()}G
            {realTimeData && (
              <PriceChange isPositive={priceChange > 0}>
                {priceChange > 0 ? " ▲" : " ▼"}{" "}
                {Math.abs(priceChange).toLocaleString()}G (
                {priceChangePercent > 0 ? "+" : ""}
                {priceChangePercent.toFixed(2)}%)
              </PriceChange>
            )}
          </Value>
        </InfoRow>
        <InfoRow>
          <Label>총 평가액</Label>
          <Value>{Math.round(currentTotalValue).toLocaleString()}G</Value>
        </InfoRow>
        <InfoRow>
          <Label>평가 손익</Label>
          <Value color={profitColor}>
            {profit >= 0 ? "+" : ""}
            {Math.round(profit).toLocaleString()}G
          </Value>
        </InfoRow>
        <InfoRow>
          <Label>수익률</Label>
          <Value color={profitColor}>{profitRate.toFixed(2)}%</Value>
        </InfoRow>
      </StockInfo>
    </CardContainer>
  );
};

export default OwnedStockCard;
