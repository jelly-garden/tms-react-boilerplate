/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ReactElement } from "react";

import { AiFillHome } from "react-icons/ai";
import { MdOutlineAccountTree } from "react-icons/md";
import { RouteComponentProps } from "react-router-dom";

import { MENU_CHILD1, MENU_CHILD2, MENU_CODE, MENU_HOME, MENU_PARENT } from "../../../services/interfaces";
import { HomePage, RootRoutePage, Child1Page, Child2Page } from "../../pages";
import { Child1, Child2 } from "../hierarchy";
import { Home } from "../home";

export interface Menu {
    name: string;
    code: MENU_CODE | "";
    icon?: ReactElement;
    path: string;
    component?: React.ComponentType<RouteComponentProps<any>>;
    children?: Menu[];
    hideChildren?: boolean;
    isLeafMenu?: boolean;
}

const HomeMenu: Menu = {
    name: "홈",
    code: MENU_HOME,
    icon: <AiFillHome />,
    path: "/home",
    component: HomePage,
    children: [
        {
            name: "",
            code: "",
            path: "/home",
            component: Home,
            isLeafMenu: true,
        },
    ],
    hideChildren: true,
};

const HierarchyMenu: Menu = {
    name: "계층구조",
    code: MENU_PARENT,
    icon: <MdOutlineAccountTree />,
    path: "/parent",
    component: RootRoutePage,
    children: [
        {
            name: "자식1",
            code: MENU_CHILD1,
            path: "/parent/child1",
            component: Child1Page,
            children: [
                {
                    name: "",
                    code: "",
                    path: "/parent/child1",
                    component: Child1,
                    isLeafMenu: true,
                },
            ],
        },
        {
            name: "자식2",
            code: MENU_CHILD2,
            path: "/parent/child2",
            component: Child2Page,
            children: [
                {
                    name: "",
                    code: "",
                    path: "/parent/child2",
                    component: Child2,
                    isLeafMenu: true,
                },
            ],
        },
    ],
};

export const MENUS: Menu[] = [HomeMenu, HierarchyMenu];
