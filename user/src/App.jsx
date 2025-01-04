import { Outlet } from "react-router-dom"; // [ https://api.reactrouter.com/v7/functions/react_router.Outlet.html ]
import { useState } from "react";
import Navbar from "./components/Navbar";

// const App = () => {
//   const [isNewProject, setIsNewProject] = useState(true); check and set if new project at parent component
//   return (
//     <div className="w-full p-6">
//       <Navbar isNewProject={isNewProject} /> {/*  navbar for all pages */}
//        set context for isNewProject [ https://phantodev.hashnode.dev/using-useoutletcontext-hook-reactjs ]
//       <Outlet context={{ isNewProject, setIsNewProject }} />

//       all children components from main.jsx
//         {
//           path:"/", // root path
//           element: <App/>, // main app
//           children:[ // children of main app
//             path:"/", // root path
//             element: <ProjectList/>, this is the child rendered to the outlet
//           ],
//         },

//     </div>
//   );
// };

const App = () => {
  const [isNewProject, setIsNewProject] = useState(true);
  return (
    <div className="w-full p-6">
      <Navbar isNewProject={isNewProject} />
      <Outlet context={{ isNewProject, setIsNewProject }} />
    </div>
  );
};
export default App;
