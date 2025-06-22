import styled from 'styled-components';

// TODO: 이 경로에 실제 프로필 사진 파일을 넣어주세요. 예: /src/assets/profile-pic.png
const profilePicUrl = '/src/assets/stockIcon/005930.png';

const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  background-color: #f3e9d3; /* 양피지 느낌의 배경색 */
  border: 7px solid #4a2e2a; /* 어두운 나무 색상의 테두리 */
  border-radius: 12px;
  padding: 8px;
  width: 300px;
  height: 120px;
  box-sizing: border-box;
  box-shadow: inset 0 0 0 4px #8d6e63; /* 안쪽 테두리 효과 */
`;

const ProfileImage = styled.div`
  width: 85px;
  height: 85px;
  background-image: url(${profilePicUrl});
  background-size: cover;
  background-position: center;
  border-radius: 6px;
  flex-shrink: 0;
  border: 3px solid #c9b79c; /* 이미지 주변의 밝은 테두리 */
`;

const ProfileName = styled.p`
  /* '둥근모꼴' 같은 픽셀 폰트 사용을 권장합니다. */
  font-family: monospace;
  font-size: 1.5rem;
  font-weight: bold;
  color: #5d4037;
  margin: 0;
  text-align: center;
  flex-grow: 1;
`;

const Profile = () => {
  return (
    <ProfileContainer>
      <ProfileImage />
      <ProfileName>폴리텍</ProfileName>
    </ProfileContainer>
  );
};

export default Profile; 