import React from "react";
import useGuestbookStore from "../../store/useGuestbookStore";
import styled from "styled-components";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: #fffbe9;
  border-radius: 12px;
  padding: 24px;
  width: 400px;
  position: relative;
  border: 3px solid #4a2e2a;
`;

const ModalHeader = styled.div`
  font-weight: bold;
  font-size: 22px;
  margin-bottom: 24px;
  color: #4a2e2a;
  text-align: center;
`;

const CloseButton = styled.button`
  position: absolute;
  right: 24px;
  top: 24px;
  background: #8d6e63;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background: #a1887f;
  }
`;

const MessageList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const MessageItem = styled.div`
  padding: 16px;
  background: white;
  border-radius: 8px;
  border: 1px solid #c9b79c;
`;

const MessageHeader = styled.div`
  margin-bottom: 8px;
  color: #5d4037;
  font-size: 0.9em;

  b {
    color: #4a2e2a;
  }
`;

const MessageContent = styled.div`
  color: #5d4037;
  line-height: 1.4;
`;

const EmptyMessage = styled.div`
  text-align: center;
  color: #8d6e63;
  padding: 20px;
  background: white;
  border-radius: 8px;
  border: 1px dashed #c9b79c;
`;

const GuestbookModal = ({ targetUserId, onClose }) => {
  const getRecentMessages = useGuestbookStore(
    (state) => state.getRecentMessages
  );
  const messages = getRecentMessages(targetUserId);

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalHeader>발자국 보기</ModalHeader>
        <CloseButton onClick={onClose}>닫기</CloseButton>
        <MessageList>
          {messages.length === 0 ? (
            <EmptyMessage>아직 방명록이 없습니다.</EmptyMessage>
          ) : (
            messages.map((entry) => (
              <MessageItem key={entry.id}>
                <MessageHeader>
                  <b>{entry.author}</b> (
                  {new Date(entry.timestamp).toLocaleDateString()})
                </MessageHeader>
                <MessageContent>{entry.content}</MessageContent>
              </MessageItem>
            ))
          )}
        </MessageList>
      </ModalContent>
    </ModalOverlay>
  );
};

export default GuestbookModal;
