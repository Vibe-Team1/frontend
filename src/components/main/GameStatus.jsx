import styled from "styled-components";
import useUserStore from "../../store/useUserStore";
import sunIconUrl from "../../assets/rain.png";
import coinIconUrl from "../../assets/coin.png";
import gemIconUrl from "../../assets/acorn.png";

const GameStatusContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
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
  width: 60px;
  height: 60px;
  background-image: url(${sunIconUrl});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  border-radius: 50%;
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
  const { cash, acorn } = useUserStore((state) => state.assets);
  const { formatted } = useUserStore((state) => state.gameDate);
  const visitingUser = useUserStore((state) => state.visitingUser);
  
  // 상대방 방문 중인지 확인
  const isVisiting = visitingUser !== null;
  
  // 사용할 자산 정보 결정 (상대방 방문 > 내 정보)
  const currentCash = isVisiting ? (visitingUser?.cash || 0) : (cash || 0);
  const currentAcorn = isVisiting ? 0 : (acorn || 0); // 상대방의 도토리는 표시하지 않음

  return (
    <GameStatusContainer>
      <WeatherContainer>
        <SunIcon />
        <WeatherText>비,구름</WeatherText>
      </WeatherContainer>
      <StatusRight>
        <DateText>{formatted}</DateText>
        <AssetsRow>
          <div style={{ display: "flex", alignItems: "center" }}>
            <AssetIcon src={coinIconUrl} alt="코인" />
            <AssetText>{currentCash?.toLocaleString()}</AssetText>
          </div>
          {!isVisiting && (
            <div style={{ display: "flex", alignItems: "center" }}>
              <AssetIcon src={gemIconUrl} alt="도토리" />
              <AssetText>{currentAcorn?.toLocaleString()}</AssetText>
            </div>
          )}
        </AssetsRow>
      </StatusRight>
    </GameStatusContainer>
  );
};

export default GameStatus;
