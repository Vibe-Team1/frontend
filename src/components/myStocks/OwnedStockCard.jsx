import styled from 'styled-components';

const Card = styled.div`
  width: 330px;
  background-color: #f6f3e8;
  border: 2px solid #d1c7b8;
  border-radius: 10px;
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  font-family: 'DNFBitBitv2', sans-serif;
  color: #5d4037;
`;

const Header = styled.div`
  background-color: #e9e2d4;
  border-radius: 5px;
  padding: 8px;
  text-align: center;
  font-size: 1.5rem;
  font-weight: bold;
`;

const Body = styled.div`
  display: flex;
  gap: 15px;
  align-items: center;
`;

const StockIcon = styled.img`
  width: 70px;
  height: 70px;
  object-fit: contain;
  border-radius: 10px;
  flex-shrink: 0;
  background-color: white;
`;

const InfoSection = styled.div`
  flex-grow: 1;
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 8px 4px;
`;

const InfoLabel = styled.span`
  font-size: 0.9rem;
  color: #6d4c41;
`;

const InfoValue = styled.span`
  font-size: 1rem;
  font-weight: bold;
  text-align: right;
  color: ${(props) => props.color || '#5d4037'};
`;

const OwnedStockCard = ({ item, currentPrice }) => {
  const { name, quantity, avgBuyPrice, imageUrl } = item;

  const totalBuyPrice = avgBuyPrice * quantity;
  const currentTotalValue = currentPrice * quantity;
  const profit = currentTotalValue - totalBuyPrice;
  const profitRate = totalBuyPrice > 0 ? (profit / totalBuyPrice) * 100 : 0;

  const profitColor = profit > 0 ? '#c84a31' : (profit < 0 ? '#1252a1' : '#5d4037');

  return (
    <Card>
      <Header>{name}</Header>
      <Body>
        <StockIcon src={imageUrl} alt={name} />
        <InfoSection>
          <InfoLabel>보유 수량</InfoLabel>
          <InfoValue>{quantity}주</InfoValue>

          <InfoLabel>나의 평균가</InfoLabel>
          <InfoValue>{avgBuyPrice.toLocaleString()}G</InfoValue>

          <InfoLabel>현재가</InfoLabel>
          <InfoValue>{currentPrice.toLocaleString()}G</InfoValue>
          
          <InfoLabel>총 평가액</InfoLabel>
          <InfoValue>{Math.round(currentTotalValue).toLocaleString()}G</InfoValue>

          <InfoLabel>평가 손익</InfoLabel>
          <InfoValue color={profitColor}>
            {profit >= 0 ? '+' : ''}
            {Math.round(profit).toLocaleString()}G
          </InfoValue>

          <InfoLabel>수익률</InfoLabel>
          <InfoValue color={profitColor}>
            {profitRate.toFixed(2)}%
          </InfoValue>
        </InfoSection>
      </Body>
    </Card>
  );
};

export default OwnedStockCard; 