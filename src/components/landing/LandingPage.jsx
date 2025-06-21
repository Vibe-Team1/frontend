// src/components/landing/LandingPage.jsx

import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../common/Button';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-image: url('/src/assets/main-background2.gif');
  background-size: 50% 150%;
  background-position: center;
  background-repeat: repeat;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
`;

const LandingPage = () => {
  const navigate = useNavigate();

  const handleStartClick = () => {
    navigate('/main');
  };

  return (
    <Container>
      <Button onClick={handleStartClick}>시작하기</Button>
    </Container>
  );
};

export default LandingPage;