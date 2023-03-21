import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PURGE } from "redux-persist";

import { Menu } from "../../../views/components/common";
import { CheckLoginResult, GetUserAuthResult } from "../../api/mockup/MockupInterface";

export interface InitDataState {
    loginUserInfo?: CheckLoginResult;
    userAuth?: GetUserAuthResult;
    authMenus: Menu[];
}

const initialState: InitDataState = {
    authMenus: [],
};

export const initDataSlice = createSlice({
    name: "initData",
    initialState: initialState,
    reducers: {
        setStoredLoginUserInfo: (state, action: PayloadAction<CheckLoginResult>) => {
            state.loginUserInfo = action.payload;
        },
        setStoredInitData: (state, action: PayloadAction<InitDataState>) => {
            state.userAuth = action.payload.userAuth;
            state.authMenus = action.payload.authMenus;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(PURGE, () => initialState);
    },
});
export const { setStoredLoginUserInfo, setStoredInitData } = initDataSlice.actions;

export default initDataSlice.reducer;
