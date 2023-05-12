import styled, { css } from "styled-components";

export const StyledVerticalListWrap = styled.div`
    height: 100%;
    padding: 0 8px;
    overflow-y: auto;
`;
export const StyledVerticalListUl = styled.ul`
    padding: 8px 0;
`;
export const StyledVerticalListLi = styled.li<{ active?: boolean }>`
    margin-bottom: 8px;
    cursor: pointer;
    &:hover {
        background: ${({ theme }) => theme.contentHoverColor};
    }
    ${(props) =>
        props.active &&
        css`
            box-shadow: 0 0 4px 2px ${({ theme }) => theme.colorRed};
        `}
`;

export const StyledHorizontalListWrap = styled.div`
    width: 100%;
    padding: 8px 0;
    overflow-x: auto;
`;
export const StyledHorizontalListUl = styled.ul`
    padding: 0 8px;
    white-space: nowrap;
`;
export const StyledHorizontalListLi = styled.li<{ active?: boolean }>`
    display: inline-block;
    padding: 8px;
    border-right: 1px solid ${({ theme }) => theme.proSideBarBorderColor};
    cursor: pointer;
    &:hover {
        background: ${({ theme }) => theme.contentHoverColor};
    }
    ${(props) =>
        props.active &&
        css`
            box-shadow: 0 0 4px 2px ${({ theme }) => theme.colorRed};
        `}
`;
