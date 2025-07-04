import styled from "styled-components";
import useUserStore from "../../store/useUserStore";
import useStockStore from "../../store/useStockStore";

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
`;

const ConnectionStatus = styled.div`
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 0.9rem;
  font-weight: bold;
  background-color: ${(props) => (props.isConnected ? "#4caf50" : "#f44336")};
  color: white;
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
    text-align: left;
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
  justify-content: flex-start;
  gap: 15px;
  padding-left: 20px;

  & > span {
    font-weight: bold;
    color: #5d4037;
    font-size: 1.2rem;
  }
`;

const ItemImage = styled.div`
  width: 40px;
  height: 40px;
  background-image: url(${(props) => props.imageUrl});
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 5px;
`;

const PriceChange = styled.span`
  color: ${(props) => (props.isPositive ? "#2e7d32" : "#c62828")};
  font-weight: bold;
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: 40px;
  color: #6d5b4f;
  font-size: 1.2rem;
`;

const MarketView = () => {
  const { stocks } = useUserStore((state) => state.assets);
  const { getFormattedStockData, isConnected, connectionStatus } =
    useStockStore();

  // 6개 종목만 고정, 실시간 데이터만 사용
  const stockItems = getFormattedStockData();

  // 각 주식의 보유 개수를 찾는 함수 (백엔드 데이터 기준)
  const getOwnedQuantity = (stockCode) => {
    const ownedStock = stocks.find((stock) => stock.stockCode === stockCode);
    return ownedStock ? ownedStock.quantity : 0;
  };

  return (
    <ViewContainer>
      <Header>
        <title>오늘의 시세</title>
      </Header>
      <Table>
        <TableHeader>
          <span>주식 종목</span>
          <span>주당 가격(원)</span>
          <span>보유개수</span>
          <span>등락폭(원)</span>
        </TableHeader>
        <TableBody>
          {stockItems.length > 0 ? (
            stockItems.map((item) => (
              <TableRow key={item.id}>
                <ItemCell>
                  <ItemImage imageUrl={item.imageUrl} />
                  <span>{item.name}</span>
                </ItemCell>
                <span>{item.price.toLocaleString()}</span>
                <span>{getOwnedQuantity(item.stockCode)}</span>
                <PriceChange isPositive={item.change > 0}>
                  {item.change > 0 ? "+" : ""}
                  {item.change.toLocaleString()}(
                  {item.changePercent > 0 ? "+" : ""}
                  {(item.changePercent || 0).toFixed(2)}%)
                </PriceChange>
              </TableRow>
            ))
          ) : (
            <LoadingMessage>
              {isConnected ? "실시간 데이터를 불러오는 중..." : "연결 중..."}
            </LoadingMessage>
          )}
        </TableBody>
      </Table>
    </ViewContainer>
  );
};

export default MarketView;
