import styled from "styled-components";
import { Link } from "react-router-dom";

export const Logo = styled.h1`
  color: #1c1c1c;
  text-align: center;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  padding: 20px;
  background-color: #f2f2f2;
`;

export const Nav = styled.nav`
  display: flex;
  justify-content: space-around;
  padding: 10px;
  font-size: 14px;
  background-color: #ffffff;
  border-bottom: 0.5 solid #e5e5e5;
`;

export const NavItem = styled(Link)`
  position: relative;
  color: #a7a7a7;
  text-decoration: none;
  font-weight: 500;
  margin: 10px 0px;
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
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;
