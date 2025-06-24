import styled from "styled-components";
import useUserStore from "../../store/useUserStore";
import { useState, useEffect } from "react";

const PanelContainer = styled.div`
  width: 350px;
  height: 100%;
  border: 3px solid #d8c8b0;
  border-radius: 10px;
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const AvatarContainer = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 10px;
  border: 3px solid #d8c8b0;
  background-color: white;
  overflow: hidden;
  position: relative;
  flex-shrink: 0;
`;

const AvatarImage = styled.img`
  width: 100%;
  position: absolute;
  bottom: 5px; /* Adjust to move the image up */
  left: 0;
`;

const InfoSection = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.1rem;
`;

const Label = styled.span`
  font-weight: bold;
  color: #8d6e63;
`;

const Value = styled.span``;

const EditButton = styled.button`
  border: 2px solid #ffab40;
  background-color: transparent;
  color: #5d4037;
  padding: 5px 10px;
  border-radius: 5px;
`;

const EquippedItems = styled.div`
  width: 100%;
  border: 3px solid #d8c8b0;
  border-radius: 10px;
  padding: 10px;
`;

const EquippedItemsGrid = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 10px;
`;

const EquippedItemSlot = styled.div`
  width: 60px;
  height: 60px;
  background-color: #eee;
  border-radius: 5px;
`;

const ButtonGroup = styled.div`
  width: 100%;
  display: flex;
  gap: 10px;
  margin-top: auto; /* Pushes to the bottom */
`;

const ActionButton = styled.button`
  flex-grow: 1;
  padding: 10px;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: bold;
  border: 3px solid;

  &.logout {
    border-color: #a1887f;
    background-color: transparent;
  }
  &.unregister {
    border-color: #c62828;
    background-color: #e57373;
    color: white;
  }
`;

const UserInfoPanel = () => {
  const { user, updateMeInStore } = useUserStore();
  const [isEditingName, setIsEditingName] = useState(false);
  const [editName, setEditName] = useState(user?.nickname || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setEditName(user?.nickname || "");
  }, [user?.nickname]);

  const handleNameEdit = async () => {
    if (isEditingName) {
      // 저장 버튼 클릭 시 PATCH
      if (!editName.trim()) {
        setError("닉네임을 입력하세요");
        return;
      }
      setLoading(true);
      setError("");
      const result = await updateMeInStore({ nickname: editName });
      setLoading(false);
      if (result.success) {
        setIsEditingName(false);
      } else {
        setError("닉네임 변경 실패");
      }
    } else {
      setIsEditingName(true);
    }
  };

  // 가입일(생성일) yyyy-mm-dd만 추출
  let createdDate = "-";
  if (
    user?.createdAt &&
    typeof user.createdAt === "string" &&
    user.createdAt.length >= 10
  ) {
    createdDate = user.createdAt.slice(0, 10);
  }
  const avatar = user?.avatar || "/characters/1001.gif";

  // 대표 이미지 클릭 시 캐릭터/의상 변경 연동 (예: 커스터마이즈 패널 열기)
  const handleAvatarClick = () => {
    // TODO: 커스터마이즈 패널 연동 또는 이미지 변경 모달 오픈
    // ex) setShowCustomization(true)
  };

  return (
    <PanelContainer>
      <AvatarContainer
        onClick={handleAvatarClick}
        style={{ cursor: "pointer" }}
      >
        <AvatarImage src={avatar} alt={user?.nickname || "닉네임 없음"} />
      </AvatarContainer>
      <InfoSection>
        <InfoRow>
          <Label>닉네임</Label>
          {isEditingName ? (
            <>
              <input
                type="text"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                style={{
                  border: "1px solid #ccc",
                  padding: "2px 5px",
                  borderRadius: "3px",
                  width: "80px",
                }}
                disabled={loading}
              />
              {loading && (
                <span style={{ marginLeft: 4, fontSize: 12 }}>저장중...</span>
              )}
              {error && (
                <span style={{ color: "red", fontSize: 12, marginLeft: 4 }}>
                  {error}
                </span>
              )}
            </>
          ) : (
            <Value>{user?.nickname || "닉네임 없음"}</Value>
          )}
          <EditButton onClick={handleNameEdit} disabled={loading}>
            {isEditingName ? "저장" : "수정"}
          </EditButton>
        </InfoRow>
        <InfoRow>
          <Label>가입일</Label>
          <Value>{createdDate}</Value>
        </InfoRow>
      </InfoSection>
    </PanelContainer>
  );
};

export default UserInfoPanel;
