import styled from 'styled-components';

const CardContainer = styled.div`
  background: white;
  border: 3px solid #795548;
  border-radius: 10px;
  overflow: hidden;
  font-family: 'Malgun Gothic', 'Dotum', sans-serif;
  color: #5D4037;
  box-shadow: 3px 3px 5px rgba(0,0,0,0.2);
`;

const CardHeader = styled.div`
  background-color: #D7CCC8;
  padding: 8px;
  text-align: center;
  font-weight: bold;
  font-size: 1.3rem;
  border-bottom: 3px solid #795548;
`;

const CardBody = styled.div`
  padding: 20px;
  display: grid;
  grid-template-columns: 100px 1fr;
  gap: 15px;
  align-items: flex-start;
`;

const LeftSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding-top: 15px;
  height: 100%;
`;

const ItemImage = styled.img`
  width: 70px;
  height: 70px;
`;

const PricePerItem = styled.span`
  font-size: 0.9rem;
  font-weight: bold;
`;

const RightSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

const Quantity = styled.div`
    font-size: 1.1rem;
    font-weight: bold;
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1rem;
`;

const Label = styled.span`
    font-weight: bold;
`;

const Value = styled.span`
    font-weight: bold;
    color: ${props => props.color || '#5D4037'};
`;

const OwnedStockCard = ({ item }) => {
    const { name, quantity, price, change, avgBuyPrice, profit, imageUrl } = item;
    const changeColor = change >= 0 ? '#2196F3' : '#F44336';
    const profitColor = profit >= 0 ? '#2196F3' : '#F44336';

    return (
        <CardContainer>
            <CardHeader>{name}</CardHeader>
            <CardBody>
                <LeftSection>
                    <ItemImage src={imageUrl} alt={name} />
                    <PricePerItem>1개당 {price.toLocaleString()}G</PricePerItem>
                </LeftSection>
                <RightSection>
                    <Quantity>x{quantity}</Quantity>
                    <InfoRow>
                        <Label>전일 대비</Label>
                        <Value color={changeColor}>{change >= 0 ? '+' : ''}{change.toLocaleString()}G</Value>
                    </InfoRow>
                    <InfoRow>
                        <Label>나의 평균 구매가</Label>
                        <Value>{avgBuyPrice.toLocaleString()}G</Value>
                    </InfoRow>
                    <InfoRow>
                        <Label>구매 대비 이익</Label>
                        <Value color={profitColor}>{profit >= 0 ? '+' : ''}{profit.toLocaleString()}G</Value>
                    </InfoRow>
                </RightSection>
            </CardBody>
        </CardContainer>
    );
};

export default OwnedStockCard; 