/*******************************************************************************
 * common interface
 *******************************************************************************/
interface SuccessResponse {
    code: number;
    message: string;
    responseTime: string;
}

export interface ErrorResponse {
    code: number;
    message: string;
    responseTime: string;
    response: undefined;
}

/*******************************************************************************
 * login
 *******************************************************************************/
/**
 * checkLogin API interface
 */
export interface CheckLoginResult {
    gid: string;
    uid: string;
    user_account: string;
    user_name: string;
    mobile_num?: string;
}

export interface CheckLoginResponse extends SuccessResponse {
    response: CheckLoginResult;
}

/**
 * get user auth 사용자 권한 정보 API interface
 */
export interface GetUserAuthParams {
    uid: string;
}

export interface MenuRole {
    p_menu_code: string;
    menu_code: string;
    auth_delete: boolean;
    auth_approval: boolean;
}

export interface GetUserAuthResult {
    gid: string;
    group_name: string;
    is_root: boolean;
    npk_cds: string[];
    uid: string;
    auth_code: string;
    auth_name: string;
    user_account: string;
    user_name: string;
    email: string;
    mobile_num: string;
    dept: string;
    team: string;
    login_date: string;
    pw_changed_date: string;
    reg_date: string;
    upd_date: string;
    is_keep_session: boolean;
    is_multi_login: boolean;
    is_sleeper_account: boolean;
    user_menu_role: MenuRole[];
}

export interface GetUserAuthResponse extends SuccessResponse {
    response: GetUserAuthResult;
}
