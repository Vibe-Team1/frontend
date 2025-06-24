import styled from "styled-components";
import { useState } from "react";
import useGuestbookStore from "../../store/useGuestbookStore";
import GuestbookModal from "../guestbook/GuestbookModal";

const ChatContainer = styled.div`
  background-color: #f3e9d3;
  border: 7px solid #4a2e2a;
  border-radius: 12px;
  padding: 20px;
  box-sizing: border-box;
  box-shadow: inset 0 0 0 4px #8d6e63;
  color: #5d4037;
  font-family: monospace;
  flex-grow: 1;
  margin: 0 20px;
  height: 80%;
  display: flex;
  flex-direction: column;
`;

const ChatHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 0 10px 0;
  padding-bottom: 10px;
  border-bottom: 2px dashed #c9b79c;
`;

const HeaderTitle = styled.h4`
  margin: 0;
  font-size: 1.5rem;
`;

const ViewAllButton = styled.button`
  background-color: #8d6e63;
  color: white;
  border: 2px solid #5d4037;
  padding: 5px 10px;
  border-radius: 5px;
  font-weight: bold;
  transition: background-color 0.2s;
  cursor: pointer;

  &:hover {
    background-color: #a1887f;
  }
`;

const ChatMessages = styled.div`
  flex-grow: 1;
  overflow-y: auto;
  padding: 5px;
`;

const Message = styled.div`
  background-color: #fff9e9;
  border: 1px solid #c9b79c;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 8px;
`;

const ChatInputContainer = styled.div`
  display: flex;
  margin-top: auto;
  gap: 10px;
`;

const ChatInput = styled.input`
  flex-grow: 1;
  border: 2px solid #c9b79c;
  background-color: #fff9e9;
  border-radius: 5px;
  padding: 10px;
  font-family: monospace;
  font-size: 1rem;
  color: #5d4037;

  &::placeholder {
    color: #a1887f;
  }
`;

const SendButton = styled.button`
  background-color: #8d6e63;
  color: white;
  border: 2px solid #5d4037;
  padding: 10px 15px;
  border-radius: 5px;
  font-weight: bold;
  transition: background-color 0.2s;
  cursor: pointer;

  &:hover {
    background-color: #a1887f;
  }
`;

const Chat = ({ targetUserId = "currentUser" }) => {
  const [message, setMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { addMessage, getRecentMessages } = useGuestbookStore();

  const recentMessages = getRecentMessages(targetUserId);

  const handleSend = () => {
    if (message.trim()) {
      addMessage(targetUserId, {
        id: Date.now(),
        content: message,
        timestamp: new Date().toISOString(),
        author: "currentUser", // 실제 로그인된 사용자 ID로 대체해야 함
      });
      setMessage("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <ChatContainer>
      <ChatHeader>
        <HeaderTitle>발자국 남기기</HeaderTitle>
        <ViewAllButton onClick={() => setIsModalOpen(true)}>
          전체보기
        </ViewAllButton>
      </ChatHeader>
      <ChatInputContainer>
        <ChatInput
          type="text"
          placeholder="메시지를 입력하세요..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <SendButton onClick={handleSend}>전송</SendButton>
      </ChatInputContainer>
      {isModalOpen && (
        <GuestbookModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          targetUserId={targetUserId}
        />
      )}
    </ChatContainer>
  );
};

export default Chat;
