import { createBrowserRouter } from "react-router-dom";
import App, { action as loginAction } from "./App";
import Home, { loader as rootLoader } from "./routes/Home/Home";
//import { loader } from "./routes/Home/Home";
import ThemeProvider from "./utils/ThemeContext";
import Client from "./routes/Client";
import Loan from "./routes/Loan";
import Collention from "./routes/Collention";
import User from "./routes/User";

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
                    path: "loans",
                    element: <Loan />
                },
                {
                    path: "collentions",
                    element: <Collention />
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
{basename: baseruta});