import styled from "styled-components";
import { Link } from "react-router-dom";

export const LogoImg = styled.img`
  height: 30px;
  background: transparent;
`;
export const LogoWrapper = styled.div`
  padding: 20px;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Nav = styled.nav`
  display: flex;
  justify-content: space-around;
  padding: 10px;
  font-size: 14px;
  background-color: #ffffff;
  border-bottom: 0.5px solid #e5e5e5;
`;

export const NavItem = styled(Link)`
  position: relative;
  color: #a7a7a7;
  text-decoration: none;
  font-weight: 500;
  margin: 0px 0px 10px 0px;
  cursor: pointer;

  &.active {
    color: black;
    font-weight: bold;

    &::after {
      content: "";
      position: absolute;
      bottom: -22px;
      left: 0;
      width: 100%;
      height: 2px;
      background-color: black;
    }
  }
`;

export const HeaderWrapper = styled.header`
  position: fixed;
  width: 390px;
  top: 0;
  //left: 0;
  //right: 0;
  z-index: 100;
  background-color: white;
  transform: ${({ $visible }) => ($visible ? "translateY(0)" : "translateY(-100%)")};
  transition: transform 0.25s ease;
`;
