/**
 * content(본문)를 감싸는 부모 content 레이아웃 부모 컴포넌트
 */
import React, { ReactNode } from "react";

import styled from "styled-components";

/**
 * styled-components 및 styled interface 정의 영역
 */
const StyledContentLayout = styled.div`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    height: 100%;
    min-width: 0;
`;

export const ContentLayout = (props: { children?: ReactNode }): JSX.Element => {
    const { children, ...rest } = props;
    return <StyledContentLayout {...rest}>{!children ? undefined : children}</StyledContentLayout>;
};
