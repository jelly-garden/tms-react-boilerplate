import styled from "styled-components";

export const StyledCard = styled.div`
    display: flex;
    flex-direction: column;
    border: 1px solid ${({ theme }) => theme.proSideBarBorderColor};
`;
export const StyledCardHeader = styled.div`
    padding: 8px;
    font-size: 14px;
    line-height: 20px;
    display: inline-flex;
    position: relative;
`;
export const StyledCardContent = styled.div``;
export const StyledCardFooter = styled.div`
    padding: 8px;
    font-size: 14px;
`;
