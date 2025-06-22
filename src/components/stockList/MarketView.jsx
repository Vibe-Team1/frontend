import styled from 'styled-components';

const ViewContainer = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  background-color: #e8dcc5;
  border-radius: 10px;
  border: 2px solid #c9b79c;
  padding: 20px;
  font-family: monospace;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const Title = styled.h3`
  font-size: 1.8rem;
  color: #5d4037;
  margin: 0;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 15px;
`;

const FilterButton = styled.button`
  padding: 5px 15px;
  border-radius: 8px;
  border: 2px solid #a1887f;
  background-color: transparent;
  color: #5d4037;
  font-family: monospace;
  font-weight: bold;
  cursor: pointer;
`;

const Table = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  background-color: #ffffff;
  border: 3px solid #c9b79c;
  border-radius: 8px;
  overflow: hidden;
`;

const TableHeader = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  padding: 25px 100px;
  font-weight: bold;
  text-align: center;
  color: #6d5b4f;
  border-bottom: 2px solid #d8c8b0;
  font-size: 1.1rem;
  & > span:first-child {
    text-align: center;
  }
`;

const TableBody = styled.div`
  overflow-y: auto;
`;

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  align-items: center;
  padding: 25px 100px;
  border-bottom: 1px solid #d8c8b0;
  text-align: center;
  font-size: 1.1rem;
  color: #6d5b4f;
  transition: background-color 0.2s;

  &:hover {
    background-color: #e0d0b8;
  }

  &:last-child {
    border-bottom: none;
  }

  background-color: #f7f2e9;
`;

const ItemCell = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;

  & > span {
    font-weight: bold;
    color: #5d4037;
    font-size: 1.2rem;
  }
`;

const ItemImage = styled.div`
  width: 40px;
  height: 40px;
  background-image: url(${props => props.imageUrl});
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 5px;
`;

const PriceChange = styled.span`
  color: ${(props) => (props.isPositive ? '#2e7d32' : '#c62828')};
  font-weight: bold;
`;

const MarketView = ({ items }) => {
  return (
    <ViewContainer>
      <Header>
        <Title>오늘의 시세</Title>
        <ButtonGroup>
            <FilterButton>내 것만 보기</FilterButton>
            <FilterButton>초기화</FilterButton>
        </ButtonGroup>
      </Header>
      <Table>
        <TableHeader>
          <span>작물</span>
          <span>개당 가격(G)</span>
          <span>보유개수</span>
          <span>등락폭(G)</span>
        </TableHeader>
        <TableBody>
          {items.map(item => (
            <TableRow key={item.id}>
              <ItemCell>
                <ItemImage imageUrl={item.imageUrl} />
                <span>{item.name}</span>
              </ItemCell>
              <span>{item.price.toLocaleString()}</span>
              <span>{item.owned || 0}</span>
              <PriceChange isPositive={item.change > 0}>
                {item.change > 0 ? '+' : ''}{item.change.toLocaleString()}
              </PriceChange>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </ViewContainer>
  );
};

export default MarketView; 