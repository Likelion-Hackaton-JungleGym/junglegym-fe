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
  padding: 10px;
  font-size: 14px;
  background-color: #e9e9e9;
`;

export const NavItem = styled(Link)`
  color: #a7a7a7;
  font-weight: 500;
  margin: 10px;
  cursor: pointer;

  &.active1 {
    color: black;
    font-weight: bold;
  }
  &.active2 {
    color: black;
    font-weight: bold;
  }
  &.active3 {
    color: black;
    font-weight: bold;
  }
  &.active4 {
    color: black;
    font-weight: bold;
  }
`;
