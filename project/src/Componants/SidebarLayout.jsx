import BotRouter from "./BotRoutes";
import Sidebar from "./sidebar/Sidebar";
import '../assets/Styles.css';
import { Outlet } from "react-router-dom";

export default function SidebarLayout()
{

    return(
        <div className="flex flex-col h-screen bg-gray-50">
            <main className="flex-grow flex max-sm:flex-col overflow-hidden">
            <Sidebar />
            <div className="flex-grow overflow-y-auto">
                <Outlet />
            </div>
            </main>
        </div>
    );
}