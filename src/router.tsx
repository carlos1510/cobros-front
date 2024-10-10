import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./routes/Home"
import ThemeProvider from "./utils/ThemeContext";
import Client from "./routes/Client";
import Loan from "./routes/Loan";
import Collention from "./routes/Collention";
import User from "./routes/User";

export const router = createBrowserRouter(
    [
        {
            id: "app",
            path: "/home?",
            element: <ThemeProvider><Home /></ThemeProvider>,
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
        },
    // Add more routes here...
 
]);