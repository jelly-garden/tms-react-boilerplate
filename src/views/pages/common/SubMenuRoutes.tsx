import React, { useMemo } from "react";

import { Redirect, Route, Switch } from "react-router-dom";

import { InitDataState } from "../../../services/store/common/init-data-slice";
import { useAppSelector } from "../../../services/store/hooks";
import { Menu } from "../../components/common";

interface SubMenuRoutesProps {
    parentPath: string;
}

export const SubMenuRoutes = (props: SubMenuRoutesProps) => {
    const { parentPath } = props;

    const storedInitData = useAppSelector((state) => state.initData) as InitDataState;
    const { authMenus } = storedInitData;

    const subMenus: Menu[] = useMemo(() => {
        const parentPathArr = parentPath.split("/");
        if (parentPathArr.length === 2) {
            const parentMenu = authMenus.find((menu) => menu.path === parentPath);
            if (parentMenu && parentMenu.children) {
                return parentMenu.children;
            }
            return [];
        } else {
            const grandParentMenu = authMenus.find((menu) => menu.path === `/${parentPathArr[1]}`);
            if (grandParentMenu && grandParentMenu.children) {
                const parentMenu = grandParentMenu.children.find((menu) => menu.path === parentPath);
                if (parentMenu && parentMenu.children) {
                    return parentMenu.children;
                }
            }
            return [];
        }
    }, [authMenus, parentPath]);

    return (
        <Switch>
            {subMenus.map((subMenu, index) => (
                <Route key={index} path={subMenu.path} component={subMenu.component} exact={subMenu.isLeafMenu} />
            ))}
            {subMenus.length > 0 && <Redirect from="*" to={subMenus[0].path}></Redirect>}
        </Switch>
    );
};
