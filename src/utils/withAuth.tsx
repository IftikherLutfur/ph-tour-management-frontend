/* eslint-disable @typescript-eslint/no-unused-vars */
import type { ComponentType } from "react";
import { useUserInfoQuery } from "../redux/features/auth/auth-api";
import type { TRole } from "../types";
import { Navigate } from "react-router";

export const withAuth = (Component: ComponentType, requiredRole?: TRole) =>{
    return function AuthWrapper () {
        const {data, isLoading} = useUserInfoQuery(undefined)
        console.log("Inside the auth wrapper",data)

        if(requiredRole && !isLoading && requiredRole !== data?.data?.role){
            return <Navigate to="/unauthorize"/>
        }

        return <Component/>;
    }
}