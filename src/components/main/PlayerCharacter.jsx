import React, { useState, useEffect } from "react";
import styled from "styled-components";
import useUserStore from "../../store/useUserStore";

const CharacterContainer = styled.div.attrs((props) => ({
  style: {
    top: props.top,
    left: props.left,
    transform: props.direction === "right" ? "scaleX(-1)" : "scaleX(1)",
  },
}))`
  position: absolute;
  width: 200px; /* 80px * 2.5 */
  height: 200px; /* 80px * 2.5 */
  transition: top 15s ease-in-out, left 8s ease-in-out; /* 더 느린 transition */

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    /* Optional: add a little shadow to make it pop */
    filter: drop-shadow(3px 5px 2px rgb(0 0 0 / 0.4));
  }
`;

// 개별 캐릭터 컴포넌트
const Character = ({ characterUrl, index }) => {
  const [position, setPosition] = useState(() => {
    // 초기 위치를 무작위로 설정
    const randomTop = 15 + Math.random() * 40; // 15% ~ 45% 범위
    const randomLeft = 20 + Math.random() * 50; // 20% ~ 60% 범위
    return { 
      top: `${randomTop}%`, 
      left: `${randomLeft}%` 
    };
  });
  const [direction, setDirection] = useState("left");

  useEffect(() => {
    const moveCharacter = () => {
      // 각 캐릭터마다 다른 움직임 패턴을 위해 index 활용
      const baseTop = 15 + (index * 4); // 위쪽으로 올림 (기존 30에서 15로)
      const baseLeft = 30 + (index * 5);
      const range = 25 + (index * 3); // 범위를 조금 늘림
      
      const newTop = baseTop + Math.random() * range;
      const newLeft = baseLeft + Math.random() * range;

      // Determine direction based on current and new position
      const currentLeft = parseFloat(position.left);
      const newLeftValue = parseFloat(newLeft);
      const newDirection = newLeftValue > currentLeft ? "right" : "left";

      setDirection(newDirection);
      setPosition({ top: `${newTop}%`, left: `${newLeft}%` });
    };

    // 각 캐릭터마다 다른 간격으로 움직이도록 설정 (더 느리게)
    const intervalTime = 2000 + (index * 1500); // 12초 ~ 21초 (기존 6초~15초에서 늘림)
    const intervalId = setInterval(moveCharacter, intervalTime);

    return () => clearInterval(intervalId);
  }, [position.left, index]);

  return (
    <CharacterContainer
      top={position.top}
      left={position.left}
      direction={direction}
    >
      <img src={characterUrl} alt={`Character ${index + 1}`} />
    </CharacterContainer>
  );
};

const PlayerCharacter = () => {
  const user = useUserStore((state) => state.user);
  const customization = useUserStore((state) => state.customization);
  const isFriendView = useUserStore((state) => state.isFriendView);
  const friendViewCharacters = useUserStore((state) => state.friendViewCharacters);
  const avatar = user?.avatar || "/characters/101.gif";
  const [position, setPosition] = useState({ top: "50%", left: "50%" });
  const [direction, setDirection] = useState("left");

  useEffect(() => {
    const moveCharacter = () => {
      // Wander within a box around the center (e.g., 40% to 60% of viewport)
      const newTop = 40 + Math.random() * 20;
      const newLeft = 40 + Math.random() * 20;

      // Determine direction based on current and new position
      const currentLeft = parseFloat(position.left);
      const newLeftValue = parseFloat(newLeft);
      const newDirection = newLeftValue > currentLeft ? "right" : "left";

      setDirection(newDirection);
      setPosition({ top: `${newTop}%`, left: `${newLeft}%` });
    };

    const intervalId = setInterval(moveCharacter, 7000); // Move every 7 seconds

    return () => clearInterval(intervalId); // Cleanup on component unmount
  }, [position.left]); // Add position.left as dependency

  console.log("PlayerCharacter rendering with:", {
    position,
    direction,
    avatar,
    characterUrls: customization.characterUrls,
  });

  return (
    <>
      {/* 메인 플레이어 캐릭터 */}
      {/* <CharacterContainer
        top={position.top}
        left={position.left}
        direction={direction}
      >
        <img src={avatar} alt="Player Character" />
      </CharacterContainer> */}
      
      {/* 보유한 모든 캐릭터들 (친구 뷰면 친구 캐릭터, 아니면 내 캐릭터) */}
      {(isFriendView ? friendViewCharacters : (customization.characterUrls || [])).slice(-5).map((characterUrl, index) => (
        <Character 
          key={`character-${index}`} 
          characterUrl={characterUrl} 
          index={index} 
        />
      ))}
    </>
  );
};

export default PlayerCharacter;
