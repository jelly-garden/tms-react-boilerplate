import React, { useCallback, useEffect, useState } from "react";

import "./i18n/i18n";

import axios, { AxiosResponse } from "axios";
import moment from "moment";
import { ThemeProvider } from "styled-components";

import { CheckLoginResponse, GetUserAuthResponse, MenuRole } from "./services/api/mockup/MockupInterface";
import { THEME_LIGHT } from "./services/interfaces";
import { CommonState } from "./services/store/common/common-slice";
import { InitDataState, setStoredLoginUserInfo, setStoredInitData } from "./services/store/common/init-data-slice";
import { useAppDispatch, useAppSelector } from "./services/store/hooks";
import { GlobalFonts, GlobalOverrideStyle, GlobalStyle, themeDark, themeLight } from "./styles";
import { LoadingSpinner, Menu, MENUS } from "./views/components/common";
import { Layout } from "./views/layouts";

// import "react-pro-sidebar/dist/css/styles.css";
// import "react-tabulator/lib/styles.css";
// import "react-tabulator/lib/css/tabulator_semanticui.min.css";
import "./styles.scss";

const App = (): JSX.Element => {
    const storedCommon = useAppSelector((state) => state.common) as CommonState;
    const { locale, themeMode } = storedCommon;

    const storedInitData = useAppSelector((state) => state.initData) as InitDataState;
    const { loginUserInfo } = storedInitData;

    const dispatch = useAppDispatch();

    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);

    /**
     * @private
     * @description [useEffect hooks] 다국어 변경 처리
     */
    useEffect(() => {
        if (locale) {
            moment.locale(locale);
        }
    }, [locale]);

    /**
     * @name checkLogin
     * @async
     * @function
     * @description 로그인 여부 확인
     * @return {Promise<CheckLoginResponse>}
     */
    const checkLogin = useCallback(async (): Promise<CheckLoginResponse> => {
        const res = (await axios.get("/checkLogin.json")) as AxiosResponse;
        return new Promise((resolve, reject) => {
            if (res?.data.code === 200) {
                resolve(res.data as CheckLoginResponse);
            } else {
                reject(res?.data.message);
            }
        });
    }, []);

    /**
     * @private
     * @description [useEffect hook] 로그인 여부 확인 useCallback 호출
     */
    useEffect(() => {
        let isComponentMounted = true;
        checkLogin().then((checkLoginResponse) => {
            if (isComponentMounted) {
                dispatch(setStoredLoginUserInfo(checkLoginResponse.response));
                setIsAuthenticated(true);
            }
        });
        return () => {
            isComponentMounted = false;
        };
    }, [checkLogin, dispatch]);

    /**
     * @name getUserAuth
     * @async
     * @function
     * @description 사용자 권한 정보 조회
     * @return {Promise<GetUserAuthResponse>}
     */
    const getUserAuth = useCallback(async (uid: string): Promise<GetUserAuthResponse> => {
        const res = (await axios.get("/getUserAuth.json", {
            params: {
                uid: uid,
            },
        })) as AxiosResponse;
        return new Promise((resolve, reject) => {
            if (res?.data.code === 200) {
                resolve(res.data as GetUserAuthResponse);
            } else {
                reject(res?.data.message);
            }
        });
    }, []);

    /**
     * @name filterMenusByRoles
     * @function
     * @description 권한을 기반으로 메뉴 정보 필터링
     * @return {Menu[]}
     */
    const filterMenusByRoles = useCallback((menus: Menu[], roles: MenuRole[]): Menu[] => {
        return menus.filter((menu) => {
            if (menu.isLeafMenu) {
                return true;
            }

            const hasRole = roles.find((role) => role.menu_code === menu.code);

            if (hasRole && menu.children) {
                menu.children = filterMenusByRoles(menu.children, roles);
            }
            return hasRole;
        });
    }, []);

    /**
     * @private
     * @description [useEffect hook] 로그인 후 공통 데이터 조회 useCallback 호출
     */
    useEffect(() => {
        let isComponentMounted = true;
        if (isAuthenticated && loginUserInfo) {
            getUserAuth(loginUserInfo.uid).then((getUserAuthResponse) => {
                if (isComponentMounted) {
                    const _userAuth = getUserAuthResponse.response;

                    // 권한을 기반으로 메뉴 정보 필터링
                    const _authMenus = filterMenusByRoles(MENUS, _userAuth.user_menu_role);

                    dispatch(
                        setStoredInitData({
                            userAuth: _userAuth,
                            authMenus: _authMenus,
                        })
                    );
                    setLoading(false);
                }
            });
        }
        return () => {
            isComponentMounted = false;
        };
    }, [dispatch, filterMenusByRoles, getUserAuth, isAuthenticated, loginUserInfo]);

    return (
        <ThemeProvider theme={themeMode === THEME_LIGHT ? themeLight : themeDark}>
            {!loading ? (
                <>
                    <GlobalStyle />
                    <GlobalFonts />
                    <GlobalOverrideStyle />
                    <Layout />
                </>
            ) : (
                <LoadingSpinner />
            )}
        </ThemeProvider>
    );
};

export default App;
