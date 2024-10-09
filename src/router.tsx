import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./routes/Home"
import ThemeProvider from "./utils/ThemeContext";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
    },
    {
        path: "/home",
        element: <ThemeProvider><Home /></ThemeProvider>
    }
    // Add more routes here...
 
]);