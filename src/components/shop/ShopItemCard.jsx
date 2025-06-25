import { useState } from 'react';
import styled from 'styled-components';

const Card = styled.div`
  width: 100%;
  background: #fdfaf4;
  border: 3px solid #bcaaa4;
  border-radius: 10px;
  padding: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  font-family: 'DNFBitBitv2', sans-serif;
  color: #5d4037;
  text-align: center;
  box-sizing: border-box;
`;

const IconContainer = styled.div`
  width: 80px;
  height: 80px;
  background-color: white;
  border: 3px solid #d1c7b8;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 3rem;
  overflow: hidden;
  position: relative;
`;

const IconImage = styled.img`
  width: 100%;
  position: absolute;
  bottom: 5px;
  left: 0;
`;

const ItemName = styled.h3`
  margin: 0;
  font-size: 1.3rem;
  height: 30px;
`;

const ItemDescription = styled.p`
  margin: 0;
  font-size: 0.9rem;
  min-height: 30px;
  flex-grow: 1;
`;

const ItemPrice = styled.div`
  font-size: 1.1rem;
  font-weight: bold;
`;

const QuantityControl = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  margin-top: 10px;
`;

const QuantityButton = styled.button`
  width: 35px;
  height: 35px;
  background-color: #e0e0e0;
  border: 2px solid #bdbdbd;
  border-radius: 50%;
  font-size: 1.5rem;
  font-weight: bold;
`;

const QuantityDisplay = styled.span`
  font-size: 1.2rem;
  font-weight: bold;
  width: 30px;
  text-align: center;
`;

const ShopItemCard = ({ item, onCartChange, maxQuantity, disabled, disablePlus }) => {
  const [quantity, setQuantity] = useState(0);

  const handleQuantityChange = (amount) => {
    let newQuantity = Math.max(0, quantity + amount);
    if (maxQuantity !== undefined) {
      newQuantity = Math.min(newQuantity, maxQuantity);
    }
    setQuantity(newQuantity);
    onCartChange(item, newQuantity);
  };
  
  const isImageUrl = typeof item.icon === 'string' && (item.icon.startsWith('/') || item.icon.startsWith('https://'));

  return (
    <Card>
      <IconContainer>
        {isImageUrl ? <IconImage src={item.icon} alt={item.name} /> : item.icon}
      </IconContainer>
      <ItemName>{item.name}</ItemName>
      <ItemDescription>{item.description}</ItemDescription>
      <ItemPrice>{item.price.toLocaleString()} G</ItemPrice>

      <QuantityControl>
        <QuantityButton onClick={() => handleQuantityChange(-1)}>-</QuantityButton>
        <QuantityDisplay>{quantity}</QuantityDisplay>
        <QuantityButton onClick={() => handleQuantityChange(1)} disabled={disabled && quantity === 0 || disablePlus}>
          +
        </QuantityButton>
      </QuantityControl>
    </Card>
  );
};

export default ShopItemCard; 