import {
    createBrowserRouter,
} from "react-router-dom";
import {Main, About, NotFound} from "../pages";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main/>,
        errorElement: <NotFound/>
    },
    {
        path: '/about',
        element: <About.withRole/>
    }
]);