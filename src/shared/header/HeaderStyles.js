import styled from "styled-components";
import { Link } from "react-router-dom";

export const LogoImg = styled.img`
  height: 30px;
  background: transparent;
`;

export const LogoWrapper = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const LogoLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
`;

export const MapImg = styled.img`
  height: 20px;
  background: transparent;
  margin-top: 3px;
`;

export const TopWrapper = styled.div`
  position: relative;
  height: 80px;
  display: flex;
  align-items: center;
  padding-left: 30px;
`;

export const Nav = styled.nav`
  display: flex;
  justify-content: space-around;
  padding: 10px;
  font-size: 14px;
  background-color: #ffffff;
  border-bottom: 1px solid #d0d0d0;
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
      bottom: -23px;
      left: 0;
      width: 100%;
      height: 3px;
      background-color: black;
    }
  }
`;

export const HeaderWrapper = styled.header`
  position: fixed;
  width: 390px;
  top: 0;
  z-index: 100;
  background-color: #ffffff;
  transform: ${({ $visible }) => ($visible ? "translateY(0)" : "translateY(-100%)")};
  transition: transform 0.25s ease;
`;
