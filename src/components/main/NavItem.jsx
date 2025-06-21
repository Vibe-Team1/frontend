import styled from 'styled-components';

const NavItemContainer = styled.div`
  background-color: #f3e9d3;
  border: 7px solid #4a2e2a;
  border-radius: 12px;
  padding: 15px 10px;
  box-sizing: border-box;
  width: 130px;
  height: 160px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  box-shadow: inset 0 0 0 4px #8d6e63;
  color: #5d4037;
  font-family: monospace;
  cursor: pointer;
  transition: all 0.1s ease-in-out;

  &:hover {
    background-color: #e8dcc5;
    transform: translateY(-2px);
  }
`;

const Icon = styled.div`
  width: 70px;
  height: 70px;
  background-color: ${(props) => (props.iconUrl ? 'transparent' : 'rgba(0,0,0,0.1)')};
  background-image: url(${(props) => props.iconUrl});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  border-radius: 4px;
`;

const Label = styled.span`
  font-size: 1.3rem;
  font-weight: bold;
`;

const NavItem = ({ label, iconUrl, onClick }) => {
  return (
    <NavItemContainer onClick={onClick}>
      <Icon iconUrl={iconUrl} />
      <Label>{label}</Label>
    </NavItemContainer>
  );
};

export default NavItem; 