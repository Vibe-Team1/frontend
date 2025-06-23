import styled from 'styled-components';

const StyledPixelButton = styled.button`
  background-color: #5a6988; /* A color that fits the blue theme */
  color: white;
  padding: 15px 30px;
  border: 4px solid #2d364b;
  box-shadow: 8px 8px 0 #2d364b;
  font-family: monospace; /* Using a generic monospace font */
  font-size: 24px;
  text-transform: uppercase;
  transition:
    transform 0.1s ease-in-out,
    box-shadow 0.1s ease-in-out;
  text-align: center;
  user-select: none;

  &:hover {
    background-color: #6e7e9b;
    transform: translate(4px, 4px);
    box-shadow: 4px 4px 0 #2d364b;
  }

  &:active {
    transform: translate(8px, 8px);
    box-shadow: 0px 0px 0 #2d364b;
  }
`;

const Button = ({ children, onClick, type = 'button' }) => {
  return (
    <StyledPixelButton type={type} onClick={onClick}>
      {children}
    </StyledPixelButton>
  );
};

export default Button; 