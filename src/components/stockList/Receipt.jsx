import styled from "styled-components";

const ReceiptContainer = styled.aside`
  width: 350px;
  flex-shrink: 0;
  background-color: #f3e9d3;
  border: 4px solid #c9b79c;
  border-radius: 10px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  font-family: monospace;
  color: #5d4037;
`;

const Title = styled.h3`
  text-align: center;
  font-size: 1.8rem;
  margin: 0 0 20px 0;
  padding-bottom: 10px;
  border-bottom: 2px dashed #c9b79c;
`;

const ItemList = styled.div`
  flex-grow: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ItemRow = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 2fr;
  text-align: right;
  & > span:first-child {
    text-align: left;
  }
`;

const HeaderRow = styled(ItemRow)`
  font-weight: bold;
  border-bottom: 1px solid #c9b79c;
  padding-bottom: 5px;
`;

const TotalsSection = styled.div`
  padding-top: 20px;
  border-top: 2px dashed #c9b79c;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const TotalRow = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 1.1rem;
`;

const PurchaseButton = styled.button`
  margin-top: 20px;
  background-color: #8d6e63;
  color: white;
  border: 4px solid #5d4037;
  padding: 15px;
  border-radius: 10px;
  font-size: 1.5rem;
  font-weight: bold;

  &:hover {
    background-color: #a1887f;
  }
`;

const Receipt = ({ cart, onPurchase, mode = 'buy', isShop = false }) => {
  const cartItems = Object.values(cart);

  const subtotal = cartItems.reduce((acc, current) => {
    return acc + current.item.price * current.quantity;
  }, 0);

  const fee = isShop ? 0 : subtotal * 0.01;
  const isBuyMode = mode === 'buy';
  
  // 매수는 수수료를 더하고, 매도는 수수료를 차감
  const total = isBuyMode ? subtotal + fee : subtotal - fee;

  return (
    <ReceiptContainer>
      <Title>{isBuyMode ? '구매 영수증' : '판매 영수증'}</Title>
      <ItemList>
        <HeaderRow>
          <span>물품명</span>
          <span>수량</span>
          <span>가격</span>
        </HeaderRow>
        {cartItems.length === 0 && (
          <p style={{ textAlign: "center", marginTop: "20px" }}>
            선택된 물품이 없습니다.
          </p>
        )}
        {cartItems.map(({ item, quantity }) => (
          <ItemRow key={item.id}>
            <span>{item.name}</span>
            <span>{quantity}</span>
            <span>{(item.price * quantity).toLocaleString()}</span>
          </ItemRow>
        ))}
      </ItemList>
      <TotalsSection>
        {!isShop && (
          <TotalRow>
            <span>수수료 (1%)</span>
            <span>
              {isBuyMode ? '+' : '-'}
              {fee.toLocaleString(undefined, { maximumFractionDigits: 0 })}
            </span>
          </TotalRow>
        )}
        <TotalRow>
          <span>{isBuyMode ? '총 구매 금액' : '총 판매 금액'}</span>
          <span>
            {total.toLocaleString(undefined, { maximumFractionDigits: 0 })}
          </span>
        </TotalRow>
      </TotalsSection>
      <PurchaseButton onClick={onPurchase}>{isBuyMode ? '구매' : '판매'}</PurchaseButton>
    </ReceiptContainer>
  );
};

export default Receipt;
