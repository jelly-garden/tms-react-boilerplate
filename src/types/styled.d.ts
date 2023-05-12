/**
 * styled-components 테마 처리 관련 definition type 정의 파일
 */
import "styled-components";

declare module "styled-components" {
    export interface DefaultTheme {
        colorScheme: string;
        colorWhite: string;
        colorRed: string;
        colorBlue: string;
        contentColor: string;
        contentBgColor: string;
        contentBorderColor: string;
        contentHoverColor: string;
        contentHeaderBgColor: string;
        proSideBarColor: string;
        proSideBarActiveColor: string;
        proSideBarBgColor: string;
        proSideBarBorderColor: string;
        tableColor: string;
        tableHeaderBgColor: string;
        tableRowOddBgColor: string;
        tableRowEvenBgColor: string;
        layoutHeaderColor: string;
        layoutHeaderBgColor: string;
        layoutHeaderBorderColor: string;
        iconButtonColor: string;
        iconButtonHoverBgColor: string;
        labelColor: string;
    }
}
