import styled from "styled-components";

const CardContainer = styled.div`
  background: #fdfaf4;
  border: 3px solid #bcaaa4;
  border-radius: 10px;
  overflow: hidden;
  color: #5d4037;
  display: flex;
  flex-direction: column;
  padding: 15px;
  gap: 15px;
  min-height: 170px;
  justify-content: space-between;
`;

const TopSection = styled.div`
  display: flex;
  gap: 15px;
  align-items: center;
`;

const AvatarContainer = styled.div`
  width: 75px;
  height: 75px;
  border-radius: 50%;
  border: 3px solid #a1887f;
  background-color: white;
  overflow: hidden;
  position: relative;
  flex-shrink: 0;
`;

const Avatar = styled.img`
  width: 100%;
  position: absolute;
  bottom: 10px;
  left: 0;
`;

const InfoSection = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const FriendName = styled.h3`
  margin: 0;
  font-size: 1.5rem;
  font-family: monospace;
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1rem;
  font-family: monospace;
`;

const Label = styled.span`
  font-weight: 500;
  color: #6d5b4f;
`;

const Value = styled.span`
  font-weight: bold;
  color: ${(props) => props.color || "#5D4037"};
`;

const ActionButton = styled.button`
  width: 100%;
  padding: 12px;
  border-radius: 8px;
  border: 3px solid #a1887f;
  background-color: #d7ccc8;
  color: #5d4037;
  font-family: monospace;
  font-size: 1.1rem;
  font-weight: bold;
  transition: background-color 0.2s;

  &:hover {
    background-color: #c8b8a8;
  }
`;

const FriendCard = ({ friend }) => {
  const { name, nickname, profitRate, cash, avatarUrl } = friend;
  const displayName = name || nickname || "알 수 없음";
  const displayProfitRate = profitRate || 0;
  const displayCash = cash || 0;
  const displayAvatar = avatarUrl || "/characters/101.gif";
  const profitColor = displayProfitRate >= 0 ? "#0D47A1" : "#D32F2F";

  return (
    <CardContainer>
      <TopSection>
        <AvatarContainer>
          <Avatar src={displayAvatar} alt={displayName} />
        </AvatarContainer>
        <InfoSection>
          <FriendName>{displayName}</FriendName>
          <InfoRow>
            <Label>수익률</Label>
            <Value color={profitColor}>{displayProfitRate.toFixed(2)}%</Value>
          </InfoRow>
          <InfoRow>
            <Label>보유 현금</Label>
            <Value>{displayCash.toLocaleString()}G</Value>
          </InfoRow>
        </InfoSection>
      </TopSection>
      <ActionButton>이동하기</ActionButton>
    </CardContainer>
  );
};

export default FriendCard;
