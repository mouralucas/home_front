import styled from '@emotion/styled';
import React from 'react';
import { Github } from '../../Images/icons/Github';
import {Typography} from "../Typography";
import {useProSidebar} from "react-pro-sidebar";

interface SidebarFooterProps extends React.HTMLAttributes<HTMLDivElement> {
    children?: React.ReactNode;
    collapsed?: boolean;
}


const StyledButton = styled.a`
  padding: 5px 16px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  display: inline-block;
  background-color: #fff;
  color: #484848;
  text-decoration: none;
`;

const StyledSidebarFooter = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  border-radius: 8px;
  color: white;
  background: linear-gradient(45deg, rgb(21 87 205) 0%, rgb(90 225 255) 100%);
  /* background: #0098e5; */
`;

const StyledCollapsedSidebarFooter = styled.a`
  width: 40px;
  height: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 50%;
  color: white;
  background: linear-gradient(45deg, rgb(21 87 205) 0%, rgb(90 225 255) 100%);
  /* background: #0098e5; */
`;

const codeUrl =
    'https://github.com/azouaoui-med/react-pro-sidebar/blob/master/storybook/Playground.tsx';

export const SidebarFooter: React.FC<SidebarFooterProps> = ({ children, collapsed, ...rest }) => {

    const {collapseSidebar} = useProSidebar();

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                paddingBottom: '20px',
            }}
        >
            <button onClick={() => collapseSidebar()}>Collapse</button>
        </div>
    );
};
