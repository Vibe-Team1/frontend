import { useState, useEffect } from 'react';
import styled from 'styled-components';
import useUserStore from '../../store/useUserStore';

const Card = styled.div`
  width: 340px;
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

const ItemIcon = styled.div`
  width: 70px;
  height: 70px;
  font-size: 45px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #e9e2d4;
  border-radius: 10px;
  flex-shrink: 0;
`;

const InfoSection = styled.div`
  flex-grow: 1;
  display: grid;
  gap: 8px;
`;

const InfoRow = styled.div`
  display: grid;
  grid-template-columns: 80px 1fr;
  align-items: baseline;
`;

const InfoLabel = styled.span`
  font-size: 0.9rem;
  color: #6d4c41;
`;

const InfoValue = styled.span`
  font-size: 1rem;
  font-weight: bold;
  text-align: right;
`;

const Controls = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 5px;
`;

const QuantityButton = styled.button`
  background-color: #fcae4f;
  border: 2px solid #e5932a;
  border-radius: 5px;
  color: #5d4037;
  font-family: 'DNFBitBitv2', sans-serif;
  font-size: 1rem;
  font-weight: bold;
  padding: 8px 12px;
  cursor: pointer;
  &:hover {
    background-color: #fdb968;
  }
`;

const QuantityInput = styled.input`
  width: 100%;
  text-align: center;
  font-size: 1.2rem;
  font-family: 'DNFBitBitv2', sans-serif;
  border: 2px solid #e9e2d4;
  border-radius: 5px;
  padding: 6px;
  background-color: white;
  color: #5d4037;
`;

const ActionButton = styled(QuantityButton)`
  flex-grow: 1;
`;

const TotalPrice = styled.div`
  flex-grow: 2;
  text-align: center;
  font-size: 1.1rem;
  font-weight: bold;
  border: 2px solid #e9e2d4;
  border-radius: 5px;
  padding: 8px;
  background-color: white;
`;

const ShopItemCard = ({ item, onCartChange }) => {
  const [quantity, setQuantity] = useState(0);
  const { cash } = useUserStore((state) => state.assets);
  const maxBuyable = item.price > 0 ? Math.floor(cash / item.price) : 0;

  useEffect(() => {
    onCartChange(item, quantity);
  }, [quantity, item, onCartChange]);

  const handleQuantityChange = (amount) => {
    setQuantity((prev) => {
      const newQuantity = Math.max(0, prev + amount);
      return Math.min(newQuantity, maxBuyable);
    });
  };

  const handleInputChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (isNaN(value) || value < 0) {
      setQuantity(0);
    } else {
      setQuantity(Math.min(value, maxBuyable));
    }
  };

  const setMax = () => {
    setQuantity(maxBuyable);
  };

  return (
    <Card>
      <Header>{item.name}</Header>
      <Body>
        <ItemIcon>{item.icon}</ItemIcon>
        <InfoSection>
          <InfoRow>
            <InfoLabel>효과</InfoLabel>
            <InfoValue>{item.description}</InfoValue>
          </InfoRow>
          <InfoRow>
            <InfoLabel>가격</InfoLabel>
            <InfoValue>{item.price.toLocaleString()}G</InfoValue>
          </InfoRow>
        </InfoSection>
      </Body>
      <Controls>
        <QuantityButton onClick={() => handleQuantityChange(-10)}>-10</QuantityButton>
        <QuantityButton onClick={() => handleQuantityChange(-1)}>-1</QuantityButton>
        <QuantityInput type="number" value={quantity} onChange={handleInputChange} />
        <QuantityButton onClick={() => handleQuantityChange(1)}>+1</QuantityButton>
        <QuantityButton onClick={() => handleQuantityChange(10)}>+10</QuantityButton>
      </Controls>
      <Controls>
        <ActionButton onClick={() => setQuantity(0)}>최소</ActionButton>
        <ActionButton onClick={setMax}>최대</ActionButton>
        <TotalPrice>{(quantity * item.price).toLocaleString()} (G)</TotalPrice>
      </Controls>
    </Card>
  );
};

export default ShopItemCard; 