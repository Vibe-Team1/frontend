import styled from 'styled-components';

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
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const ChatHeader = styled.h4`
  margin: 0 0 10px 0;
  text-align: center;
  font-size: 1.5rem;
  padding-bottom: 10px;
  border-bottom: 2px dashed #c9b79c;
`;

const ChatMessages = styled.div`
  flex-grow: 1;
  overflow-y: auto;
  padding: 5px;
`;

const ChatInputContainer = styled.div`
  display: flex;
  margin-top: 10px;
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
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #a1887f;
  }
`;

const Chat = () => {
  return (
    <ChatContainer>
      <ChatHeader>채팅</ChatHeader>
      <ChatMessages>
        {/* Messages will go here */}
      </ChatMessages>
      <ChatInputContainer>
        <ChatInput type="text" placeholder="메시지를 입력하세요..." />
        <SendButton>전송</SendButton>
      </ChatInputContainer>
    </ChatContainer>
  );
};

export default Chat; 