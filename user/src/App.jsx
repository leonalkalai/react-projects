import { Outlet } from "react-router-dom"; // [ https://api.reactrouter.com/v7/functions/react_router.Outlet.html ]
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <div className="w-full p-6">
      <Navbar /> {/*  navbar for all pages */}
      <Outlet />{" "}
      {/*  
      all children components from main.jsx 
        {
          path:"/", // root path
          element: <App/>, // main app
          children:[ // children of main app
            path:"/", // root path
            element: <ProjectList/>, this is the child rendered to the outlet
          ],
        },
      */}
    </div>
  );
};
export default App;
