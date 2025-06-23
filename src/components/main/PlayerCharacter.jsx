import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import useUserStore from '../../store/useUserStore';

const CharacterContainer = styled.div.attrs(props => ({
  style: {
    top: props.top,
    left: props.left,
    transform: props.direction === 'right' ? 'scaleX(-1)' : 'scaleX(1)',
  },
}))`
  position: absolute;
  width: 200px; /* 80px * 2.5 */
  height: 200px; /* 80px * 2.5 */
  transition: top 6s ease-in-out, left 6s ease-in-out; /* Even slower transition */
  
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    /* Optional: add a little shadow to make it pop */
    filter: drop-shadow(3px 5px 2px rgb(0 0 0 / 0.4));
  }
`;

const TestCharacterContainer = styled.div.attrs(props => ({
  style: {
    top: props.top,
    left: props.left,
    transform: props.direction === 'right' ? 'scaleX(-1)' : 'scaleX(1)',
  },
}))`
  position: absolute;
  width: 200px; /* 80px * 2.5 */
  height: 200px; /* 80px * 2.5 */
  transition: top 6s ease-in-out, left 6s ease-in-out; /* Even slower transition */
  z-index: 10; /* Make sure it appears above other elements */
  
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    /* Optional: add a little shadow to make it pop */
    filter: drop-shadow(3px 5px 2px rgb(0 0 0 / 0.4));
  }
`;

const TestCharacter = ({ position, direction }) => {
  // Add small offset to make it visible next to the main character
  const offsetTop = parseFloat(position.top) + 5; // 5% offset
  const offsetLeft = parseFloat(position.left) + 5; // 5% offset
  
  console.log('TestCharacter rendering with:', { position, direction, offsetTop, offsetLeft });
  
  return (
    <TestCharacterContainer 
      top={`${offsetTop}%`}
      left={`${offsetLeft}%`}
      direction={direction}
    >
      <img src="/characters/1001.gif" alt="Test Character" onError={(e) => console.error('Failed to load test character image:', e)} />
    </TestCharacterContainer>
  );
};

const IndependentTestCharacter = () => {
  const [testPosition, setTestPosition] = useState({ top: '45%', left: '45%' });
  const [testDirection, setTestDirection] = useState('left');

  useEffect(() => {
    const moveTestCharacter = () => {
      // Wander within a box around the center (e.g., 35% to 65% of viewport)
      const newTop = 35 + Math.random() * 30;
      const newLeft = 35 + Math.random() * 30;
      
      // Determine direction based on current and new position
      const currentLeft = parseFloat(testPosition.left);
      const newLeftValue = parseFloat(newLeft);
      const newDirection = newLeftValue > currentLeft ? 'right' : 'left';
      
      setTestDirection(newDirection);
      setTestPosition({ top: `${newTop}%`, left: `${newLeft}%` });
    };

    const intervalId = setInterval(moveTestCharacter, 8000); // Move every 8 seconds (slightly different timing)

    return () => clearInterval(intervalId);
  }, [testPosition.left]);

  return (
    <>
    
    <TestCharacterContainer 
      top={testPosition.top}
      left={testPosition.left}
      direction={testDirection}
    >
      <img src="/characters/501.gif" alt="Test Character" onError={(e) => console.error('Failed to load test character image:', e)} />
    </TestCharacterContainer>
    <TestCharacterContainer 
      top={testPosition.top}
      left={testPosition.left}
      direction={testDirection}
    >
      <img src="/characters/601.gif" alt="Test Character" onError={(e) => console.error('Failed to load test character image:', e)} />
    </TestCharacterContainer>
    </>
  );
};

const PlayerCharacter = () => {
  const avatar = useUserStore((state) => state.user.avatar);
  const [position, setPosition] = useState({ top: '50%', left: '50%' });
  const [direction, setDirection] = useState('left'); // 'left' or 'right'

  useEffect(() => {
    const moveCharacter = () => {
      // Wander within a box around the center (e.g., 40% to 60% of viewport)
      const newTop = 40 + Math.random() * 20;
      const newLeft = 40 + Math.random() * 20;
      
      // Determine direction based on current and new position
      const currentLeft = parseFloat(position.left);
      const newLeftValue = parseFloat(newLeft);
      const newDirection = newLeftValue > currentLeft ? 'right' : 'left';
      
      setDirection(newDirection);
      setPosition({ top: `${newTop}%`, left: `${newLeft}%` });
    };

    const intervalId = setInterval(moveCharacter, 7000); // Move every 7 seconds

    return () => clearInterval(intervalId); // Cleanup on component unmount
  }, [position.left]); // Add position.left as dependency

  console.log('PlayerCharacter rendering with:', { position, direction, avatar });

  return (
    <>
      <CharacterContainer 
        top={position.top} 
        left={position.left}
        direction={direction}
      >
        <img src={avatar} alt="Player Character" />
      </CharacterContainer>
      <IndependentTestCharacter />
    </>
  );
};

export default PlayerCharacter; 