import { Outlet } from "react-router";

export default function AdminLayout(){
    return(
        <>
        <h1>This is the admin layout</h1>
        <Outlet/>
        </>
    )
}