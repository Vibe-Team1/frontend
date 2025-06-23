import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const scaleUp = keyframes`
  from {
    transform: scale(0.5);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  animation: ${fadeIn} 0.3s ease-in-out;
`;

const ModalContent = styled.div`
  background-color: #f3e9d3;
  border: 10px solid #4a2e2a;
  border-radius: 15px;
  box-shadow: inset 0 0 0 5px #8d6e63;
  padding: 30px;
  text-align: center;
  max-width: 400px;
  width: 90%;
  font-family: monospace;
  color: #5d4037;
  animation: ${scaleUp} 0.3s ease-in-out;
`;

const Icon = styled.div`
  font-size: 4rem;
  margin-bottom: 20px;
  color: ${props => props.type === 'success' ? '#2e7d32' : '#c62828'};
`;

const Title = styled.h2`
  font-size: 1.8rem;
  margin: 0 0 15px 0;
  color: #5d4037;
`;

const Message = styled.p`
  font-size: 1.2rem;
  margin: 0 0 25px 0;
  color: #6d5b4f;
`;

const Button = styled.button`
  background-color: #8d6e63;
  color: white;
  border: 4px solid #5d4037;
  padding: 12px 30px;
  border-radius: 10px;
  font-size: 1.2rem;
  font-weight: bold;
  cursor: pointer;
  font-family: monospace;

  &:hover {
    background-color: #a1887f;
  }
`;

const NotificationModal = ({ isOpen, onClose, type = 'success', title, message }) => {
  if (!isOpen) return null;

  const getIcon = () => {
    switch (type) {
      case 'success':
        return '✅';
      case 'error':
        return '❌';
      case 'warning':
        return '⚠️';
      default:
        return 'ℹ️';
    }
  };

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <Icon type={type}>{getIcon()}</Icon>
        <Title>{title}</Title>
        <Message>{message}</Message>
        <Button onClick={onClose}>확인</Button>
      </ModalContent>
    </ModalOverlay>
  );
};

export default NotificationModal; 