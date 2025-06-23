import styled from 'styled-components';
import useUserStore from '../../store/useUserStore';

// TODO: 이 경로에 실제 코인 이미지 파일을 넣어주세요. 예: /src/assets/coin.png
const coinIconUrl = '/src/assets/coin.png';

const GameStatusContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  background-color: #f3e9d3; /* 양피지 느낌의 배경색 */
  border: 7px solid #4a2e2a; /* 어두운 나무 색상의 테두리 */
  border-radius: 12px;
  padding: 10px 20px;
  width: 300px;
  height: 120px;
  box-sizing: border-box;
  box-shadow: inset 0 0 0 4px #8d6e63; /* 안쪽 테두리 효과 */
  font-family: monospace;
  color: #5d4037;
`;

const DateText = styled.p`
  font-size: 1.3rem;
  font-weight: bold;
  margin: 0;
`;

const MoneyContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const CoinIcon = styled.div`
  width: 40px;
  height: 40px;
  background-image: url(${coinIconUrl});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
`;

const MoneyText = styled.p`
  font-size: 1.4rem;
  font-weight: bold;
  margin: 0;
`;

const GameStatus = () => {
  const { cash } = useUserStore((state) => state.assets);
  const { formatted } = useUserStore((state) => state.gameDate);

  return (
    <GameStatusContainer>
      <DateText>{formatted}</DateText>
      <MoneyContainer>
        <CoinIcon />
        <MoneyText>{cash.toLocaleString()} 원</MoneyText>
      </MoneyContainer>
    </GameStatusContainer>
  );
};

export default GameStatus; 