import { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import useUserStore from '../../store/useUserStore';
import ShopItemCard from './ShopItemCard';
import ReceiptComponent from '../stockList/Receipt';
import NotificationModal from '../common/NotificationModal';

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
  width: 85%;
  height: 85%;
  background-color: #f3e9d3;
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
  font-family: 'DNFBitBitv2', sans-serif;
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
  font-family: 'DNFBitBitv2', sans-serif;
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
  height: calc(100% - 130px);
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
  font-family: 'DNFBitBitv2', sans-serif;

  &:hover {
    background-color: ${({ $active }) => ($active ? 'white' : '#f7f2e9')};
  }
`;

const ItemList = styled.div`
  flex-grow: 1;
  display: grid;
  grid-template-columns: repeat(2, auto);
  justify-content: center;
  gap: 25px;
  overflow-y: auto;
  padding: 10px;
  align-content: flex-start;
`;

const shopItems = [
  { id: 'red_potion', name: '빨간 물약', description: '다음 매도 시 수익 5% 추가', price: 100000, icon: '🍷' },
  { id: 'blue_potion', name: '파란 물약', description: '다음 거래 시 수수료 면제', price: 200000, icon: '💧' },
];

const ShopModal = ({ onClose }) => {
  const [cart, setCart] = useState({});
  const [activeTab, setActiveTab] = useState('buy');
  const [resetKey, setResetKey] = useState(0);
  const [notification, setNotification] = useState('');

  const { cash } = useUserStore((state) => state.assets);
  const { inventory, updateCash, setInventory } = useUserStore();

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
    let totalCost = 0;
    Object.values(cart).forEach(({ item, quantity }) => {
      totalCost += item.price * quantity;
    });

    if (totalCost > cash) {
      setNotification('현금이 부족합니다!');
      return;
    }

    updateCash(-totalCost);

    const newInventory = { ...inventory };
    Object.values(cart).forEach(({ item, quantity }) => {
      newInventory[item.id] = (newInventory[item.id] || 0) + quantity;
    });
    setInventory(newInventory);

    setNotification('구매가 완료되었습니다.');
    setCart({});
    setResetKey((prev) => prev + 1);
  };

  const handleCloseNotification = () => {
    setNotification('');
  };

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        <Title>상점</Title>

        <TopInfoBar>
          <InfoItem>
            현재 소지 금액<span>{cash.toLocaleString()} G</span>
          </InfoItem>
        </TopInfoBar>

        <ModalContent>
          <LeftNav>
            <Tab $active={activeTab === 'buy'} onClick={() => setActiveTab('buy')}>
              구매
            </Tab>
            <Tab $active={activeTab === 'sell'} onClick={() => setActiveTab('sell')}>
              판매
            </Tab>
          </LeftNav>

          <>
            <ItemList>
              {shopItems.map((item) => (
                <ShopItemCard
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
        </ModalContent>
      </ModalContainer>
      {notification && (
        <NotificationModal
          message={notification}
          onClose={handleCloseNotification}
        />
      )}
    </ModalOverlay>
  );
};

export default ShopModal; 