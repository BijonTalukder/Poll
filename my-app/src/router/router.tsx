import { createBrowserRouter } from "react-router-dom";
import Main from "../page/Main";
import CreatePoll from "../page/CreatePoll";
import ViewPoll from "../page/ViewPoll";


const router = createBrowserRouter([
   
    {
        path: "/",
        element:<Main/>
    },
    {
        path:"/create-poll",
        element:<CreatePoll/>
    },
    {
        path:"/poll/:id",
        element:<ViewPoll/>
    }

])
export default router