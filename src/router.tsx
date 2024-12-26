import { createBrowserRouter } from "react-router-dom";
import App, { action as loginAction } from "./App";
import Home, { loader as rootLoader } from "./routes/Home/Home";
//import { loader } from "./routes/Home/Home";
import ThemeProvider from "./utils/ThemeContext";
import Client from "./routes/Client";
import Loan from "./routes/Loan";
import Collention from "./routes/Collention";
import User from "./routes/User";
import Dashboard from "./routes/Dashboard/Dashboard";
import Service from "./routes/Service/Service";
import { action as logoutAction } from "./routes/Logout/logout";
// nuevos

const baseruta = '/cobros';

export const router = createBrowserRouter(
    [
        {
            id: "app",
            path: "/home?",
            element: <ThemeProvider><Home /></ThemeProvider>,
            loader: rootLoader,
            children: [
                // Add more routes here...
                {
                    index: true,
                    element: <Client />
                },
                {
                    path: "dashboard",
                    element: <Dashboard />
                },
                {
                    path: "loans",
                    element: <Loan />
                },
                {
                    path: "collentions",
                    element: <Collention />
                },
                {
                    path: "services",
                    element: <Service />
                },
                {
                    path: "users",
                    element: <User />
                }
            ],
        },
        {
            path: "/login",
            element: <App />,
            action: loginAction,
        },
    // Add more routes here...
 
], 
{basename: baseruta}
);