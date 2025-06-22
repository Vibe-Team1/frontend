import styled from 'styled-components';

const CardContainer = styled.div`
  background: #fdfaf4;
  border: 3px solid #bcaaa4;
  border-radius: 10px;
  overflow: hidden;
  color: #5d4037;
  display: flex;
  flex-direction: column;
  min-height: 250px;
`;

const CardHeader = styled.div`
  background-color: #d7ccc8;
  padding: 10px;
  text-align: center;
  font-weight: bold;
  font-size: 1.4rem;
  border-bottom: 3px solid #bcaaa4;
  font-family: monospace;
`;

const CardBody = styled.div`
  padding: 20px;
  display: flex;
  gap: 20px;
  align-items: flex-start;
  flex-grow: 1;
`;

const LeftSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 15px;
  flex-basis: 120px;
  flex-shrink: 0;
  height: 100%;
`;

const ItemImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: contain;
  border-radius: 5px;
`;

const PricePerItem = styled.span`
  font-size: 1rem;
  font-weight: bold;
  font-family: monospace;
`;

const RightSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  flex-grow: 1;
  padding-top: 10px;
`;

const Quantity = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  align-self: flex-start;
  padding-bottom: 10px;
  font-family: monospace;
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.1rem;
  width: 100%;
  font-family: monospace;
`;

const Label = styled.span`
  font-weight: 500;
  color: #6d5b4f;
`;

const Value = styled.span`
  font-weight: bold;
  color: ${(props) => props.color || '#5D4037'};
  text-align: right;
`;

const OwnedStockCard = ({ item }) => {
  const { name, quantity, price, change, avgBuyPrice, profit, imageUrl } = item;
  const changeColor = change >= 0 ? '#0D47A1' : '#D32F2F';
  const profitColor = profit >= 0 ? '#0D47A1' : '#D32F2F';

  return (
    <CardContainer>
      <CardHeader>{name}</CardHeader>
      <CardBody>
        <LeftSection>
          <Quantity>x{quantity}</Quantity>
          <ItemImage src={imageUrl} alt={name} />
          <PricePerItem>1개당 {price.toLocaleString()}G</PricePerItem>
        </LeftSection>
        <RightSection>
          <InfoRow>
            <Label>전일 대비</Label>
            <Value color={changeColor}>
              {change >= 0 ? '' : ''}
              {change.toLocaleString()}G
            </Value>
          </InfoRow>
          <InfoRow>
            <Label>나의 평균 구매가</Label>
            <Value>{avgBuyPrice.toLocaleString()}G</Value>
          </InfoRow>
          <InfoRow>
            <Label>구매 대비 이익</Label>
            <Value color={profitColor}>
              {profit >= 0 ? '+' : ''}
              {profit.toLocaleString()}G
            </Value>
          </InfoRow>
        </RightSection>
      </CardBody>
    </CardContainer>
  );
};

export default OwnedStockCard; 