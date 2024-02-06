import { FC } from "react";
import { NavBar } from "../../shared";
import { Outlet } from "react-router-dom";


export const StoreLayout: FC = () => {
    return (
        <div className="flex flex-col min-h-screen pb-10">
            <NavBar />

            <div className="flex px-10">
                <Outlet />
            </div>
        </div>
    );
};