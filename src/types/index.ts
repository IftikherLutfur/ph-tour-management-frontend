import type { ComponentType } from "react";

export type { ISentotp } from "./auth.types";
export type {IVerifyOTP} from "./auth.types"

export interface IResponse<T>{
    statsuCode: number;
    succes: boolean;
    message: string;
    data: T
}

 export interface ISidebarItem {
    title: string;
    items: {
        title: string;
        url:string;
        component: ComponentType
    }[]
 }