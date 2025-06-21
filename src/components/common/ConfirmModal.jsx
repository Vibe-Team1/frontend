import styled from 'styled-components';

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
  z-index: 2000; /* Higher z-index to appear above other modals if needed */
`;

const ModalContainer = styled.div`
  width: 500px;
  background-color: #f3e9d3;
  border: 10px solid #4a2e2a;
  border-radius: 15px;
  box-shadow: inset 0 0 0 5px #8d6e63;
  padding: 40px;
  box-sizing: border-box;
  font-family: monospace;
  color: #5d4037;
  text-align: center;
`;

const Message = styled.p`
  font-size: 1.5rem;
  margin: 0;
  margin-bottom: 30px;
  line-height: 1.5;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
`;

const ActionButton = styled.button`
  padding: 10px 40px;
  font-family: monospace;
  font-size: 1.2rem;
  font-weight: bold;
  border-radius: 8px;
  cursor: pointer;
  border: 3px solid;
  transition: all 0.2s;

  &.confirm {
    border-color: #e65100;
    background-color: #ffab40;
    color: #5d4037;
    &:hover {
        background-color: #ffb74d;
    }
  }

  &.cancel {
    border-color: #a1887f;
    background-color: transparent;
    color: #5d4037;
    &:hover {
        background-color: rgba(0,0,0,0.05);
    }
  }
`;

const ConfirmModal = ({ message, onConfirm, onCancel }) => {
  return (
    <ModalOverlay onClick={onCancel}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <Message>{message}</Message>
        <ButtonGroup>
          <ActionButton className="confirm" onClick={onConfirm}>네</ActionButton>
          <ActionButton className="cancel" onClick={onCancel}>아니오</ActionButton>
        </ButtonGroup>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default ConfirmModal; 