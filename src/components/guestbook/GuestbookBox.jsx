import React, { useState } from "react";
import { useGuestbookStore } from "../../store/useGuestbookStore";
import GuestbookModal from "./GuestbookModal";

const GuestbookBox = ({ targetUserId = "me", author = "me" }) => {
  const [message, setMessage] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const addGuestbook = useGuestbookStore((state) => state.addGuestbook);
  const guestbooks = useGuestbookStore(
    (state) => state.guestbooks[targetUserId] || []
  );

  const handleSend = () => {
    if (!message.trim()) return;
    addGuestbook(targetUserId, {
      id: Date.now(),
      author,
      content: message,
      date: new Date().toISOString().slice(0, 10),
    });
    setMessage("");
  };

  // 최근 3개만 보여주기
  const recent = guestbooks.slice(-3).reverse();

  return (
    <div
      style={{
        border: "4px solid #7b5c44",
        borderRadius: 12,
        padding: 16,
        background: "#f6f0e2",
      }}
    >
      <div
        style={{
          fontWeight: "bold",
          fontSize: 20,
          textAlign: "center",
          marginBottom: 8,
        }}
      >
        방명록
      </div>
      <div style={{ display: "flex", gap: 8 }}>
        <input
          style={{
            flex: 1,
            padding: 8,
            borderRadius: 4,
            border: "1px solid #bcae9e",
          }}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="메시지를 입력하세요..."
        />
        <button onClick={handleSend} style={{ padding: "8px 16px" }}>
          전송
        </button>
        <button
          onClick={() => setModalOpen(true)}
          style={{ padding: "8px 16px" }}
        >
          전체보기
        </button>
      </div>
      {/* 최근 방명록 3개 미리보기 */}
      <ul style={{ marginTop: 12, paddingLeft: 0, listStyle: "none" }}>
        {recent.length === 0 && (
          <li style={{ color: "#aaa" }}>아직 방명록이 없습니다.</li>
        )}
        {recent.map((entry) => (
          <li
            key={entry.id}
            style={{
              marginBottom: 8,
              borderBottom: "1px solid #e0d6c3",
              paddingBottom: 4,
            }}
          >
            <span style={{ fontWeight: "bold" }}>{entry.author}</span>:{" "}
            {entry.content}
            <span style={{ float: "right", color: "#bcae9e", fontSize: 12 }}>
              {entry.date}
            </span>
          </li>
        ))}
      </ul>
      {modalOpen && (
        <GuestbookModal
          targetUserId={targetUserId}
          onClose={() => setModalOpen(false)}
        />
      )}
    </div>
  );
};

export default GuestbookBox;
