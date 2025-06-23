import styled from 'styled-components';
import useUserStore from '../../store/useUserStore';
import { useState, useEffect } from 'react';

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

const ProfileImage = styled.div`
  width: 150px;
  height: 150px;
  background-image: url('/src/assets/stockIcon/005930.png');
  background-size: cover;
  background-position: center;
  background-color: #eee; /* Placeholder */
  border: 3px solid #d8c8b0;
  border-radius: 10px;
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
  cursor: pointer;
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
    width: 60px; height: 60px;
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
  cursor: pointer;
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
  const { user, updateUsername, updateTitle, updateExperience } = useUserStore();
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isEditingExperience, setIsEditingExperience] = useState(false);
  const [editName, setEditName] = useState(user.name);
  const [editTitle, setEditTitle] = useState(user.title);
  const [editExperience, setEditExperience] = useState(user.experience);

  useEffect(() => {
    setEditName(user.name);
    setEditTitle(user.title);
    setEditExperience(user.experience);
  }, [user.name, user.title, user.experience]);

  const handleNameEdit = () => {
    if (isEditingName) {
      updateUsername(editName);
      setIsEditingName(false);
    } else {
      setIsEditingName(true);
    }
  };

  const handleTitleEdit = () => {
    if (isEditingTitle) {
      updateTitle(editTitle);
      setIsEditingTitle(false);
    } else {
      setIsEditingTitle(true);
    }
  };

  const handleExperienceEdit = () => {
    if (isEditingExperience) {
      updateExperience(editExperience);
      setIsEditingExperience(false);
    } else {
      setIsEditingExperience(true);
    }
  };

  return (
    <PanelContainer>
      <ProfileImage style={{ backgroundImage: `url(${user.avatar})` }} />
      <InfoSection>
        <InfoRow>
          <Label>칭호</Label> 
          {isEditingTitle ? (
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              style={{ 
                border: '1px solid #ccc', 
                padding: '2px 5px', 
                borderRadius: '3px',
                width: '80px'
              }}
            />
          ) : (
            <Value>{user.title}</Value>
          )}
          <EditButton onClick={handleTitleEdit}>
            {isEditingTitle ? '저장' : '수정'}
          </EditButton>
        </InfoRow>
        <InfoRow>
          <Label>닉네임</Label> 
          {isEditingName ? (
            <input
              type="text"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              style={{ 
                border: '1px solid #ccc', 
                padding: '2px 5px', 
                borderRadius: '3px',
                width: '80px'
              }}
            />
          ) : (
            <Value>{user.name}</Value>
          )}
          <EditButton onClick={handleNameEdit}>
            {isEditingName ? '저장' : '수정'}
          </EditButton>
        </InfoRow>
        <InfoRow>
          <Label>경력</Label> 
          {isEditingExperience ? (
            <input
              type="text"
              value={editExperience}
              onChange={(e) => setEditExperience(e.target.value)}
              style={{ 
                border: '1px solid #ccc', 
                padding: '2px 5px', 
                borderRadius: '3px',
                width: '80px'
              }}
            />
          ) : (
            <Value>{user.experience}</Value>
          )}
          <EditButton onClick={handleExperienceEdit}>
            {isEditingExperience ? '저장' : '수정'}
          </EditButton>
        </InfoRow>
        <InfoRow>
          <Label>레벨</Label> 
          <Value>{user.level}</Value>
        </InfoRow>
        <InfoRow>
          <Label>총 거래 횟수</Label> 
          <Value>{user.totalTrades}회</Value>
        </InfoRow>
        <InfoRow>
          <Label>가입일</Label> 
          <Value>{user.joinDate}</Value>
        </InfoRow>
      </InfoSection>
      <EquippedItems>
        <Label>현재 착용 중인 아이템</Label>
        <EquippedItemsGrid>
            <EquippedItemSlot />
            <EquippedItemSlot />
            <EquippedItemSlot />
        </EquippedItemsGrid>
      </EquippedItems>
      <ButtonGroup>
        <ActionButton className="logout">로그아웃</ActionButton>
        <ActionButton className="unregister">회원탈퇴</ActionButton>
      </ButtonGroup>
    </PanelContainer>
  );
};

export default UserInfoPanel; 