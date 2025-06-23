import styled from 'styled-components';
import useUserStore from '../../store/useUserStore';
import sunIconUrl from '../../assets/sun.png';
import coinIconUrl from '../../assets/coin.png';
import gemIconUrl from '../../assets/gem.png';

const GameStatusContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: #f3e9d3; /* 양피지 느낌의 배경색 */
  border: 7px solid #4a2e2a; /* 어두운 나무 색상의 테두리 */
  border-radius: 12px;
  padding: 10px 20px;
  width: 400px;
  height: 170px;
  box-sizing: border-box;
  box-shadow: inset 0 0 0 4px #8d6e63; /* 안쪽 테두리 효과 */
  font-family: monospace;
  color: #5d4037;
`;

const WeatherContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  flex: 0 0 auto;
`;

const StatusRight = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
  height: 100%;
  gap: 12px;
`;

const SunIcon = styled.div`
  width: 55px;
  height: 55px;
  background-image: url(${sunIconUrl});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  border-radius: 50%;
  box-shadow: 0 0 10px rgba(255, 215, 0, 0.5);
`;

const WeatherText = styled.span`
  font-size: 1.1rem;
  font-weight: bold;
`;

const DateText = styled.p`
  font-size: 1.3rem;
  font-weight: bold;
  margin: 0;
`;

const AssetsRow = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 10px;
`;

const AssetIcon = styled.img`
  width: 38px;
  height: 38px;
  object-fit: contain;
`;

const AssetText = styled.span`
  font-size: 1.2rem;
  font-weight: bold;
  margin-left: 6px;
`;

const GameStatus = () => {
  const { cash } = useUserStore((state) => state.assets);
  // 더미 값
  const gem = 123;
  const { formatted } = useUserStore((state) => state.gameDate);

  return (
    <GameStatusContainer>
      <WeatherContainer>
        <SunIcon />
        <WeatherText>맑음</WeatherText>
      </WeatherContainer>
      <StatusRight>
        <DateText>{formatted}</DateText>
        <AssetsRow>
          <div style={{display:'flex',alignItems:'center'}}>
            <AssetIcon src={coinIconUrl} alt="코인" />
            <AssetText>{cash.toLocaleString()} 원</AssetText>
          </div>
          <div style={{display:'flex',alignItems:'center'}}>
            <AssetIcon src={gemIconUrl} alt="보석" />
            <AssetText>{gem}</AssetText>
          </div>
        </AssetsRow>
      </StatusRight>
    </GameStatusContainer>
  );
};

export default GameStatus; 