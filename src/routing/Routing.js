import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "../App";
import AllFile from "../pages/AllFile";
import AddFiles from "../pages/AddFiles";

const router = createBrowserRouter([
    {
        path : "/",
        element : <App/>,
        children : [
            {
                path : 'add',
                element : <AddFiles/>
            },
            {
                path : '/',
                element : <AllFile/>
            }
        ]
    }
])

const Routing = () => {
    return (
        <RouterProvider router={router}/>
    );
}
export default Routing;
