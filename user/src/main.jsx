import * as React from "react"; // import everything from react package to React object. (example use React.useState )
import * as ReactDOM from "react-dom/client"; // import methods for rendering React components to the DOM from react-dom/client package to ReactDOM object. (example use ReactDOM.createRoot() )
/*
import createBrowserRouter and routerProvider exports
  createBrowserRouter function: creates a browser router navigation between different views in a single-page React application.
  RouterProvider component : provides routing logic and state that allows React to understand which components to render based on the current URL based on current route path, using the router from createBrowserRouter.
*/
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App"; // import App component [ root component of the application ]
import Project from "./components/Project"; // import Project component
import ProjectList from "./components/ProjectList"; // import ProjectsList component
import "./index.css"; // import css

// router setup [ https://blog.logrocket.com/react-router-dom-tutorial-examples/ ]
const localhostPath = "/"; // select this if localhost
const githubpagesPath = "/react-projects/"; // select this if hosted on github pages
const browserRouterPath = githubpagesPath; // choose the path

const router = createBrowserRouter([
  // show all projects route
  {
    path: `${browserRouterPath}` /*  root path */,
    element: <App />, // main app
    children: [
      {
        // children of main app
        path: `${browserRouterPath}`, // root path
        element: <ProjectList />, // all of the projects
      },
    ],
  },
  // edit project route
  {
    path: "/edit/:id", // edit path with added id
    element: <App />, // main app
    children: [
      {
        // children of main app
        path: "/edit/:id",
        element: <Project />, // single project
      },
    ],
  },
  // create project route
  {
    path: "/create", // create path
    element: <App />, // main app
    children: [
      {
        // children of main app
        path: "/create",
        element: <Project />, // single project
      },
    ],
  },
]);

// Create the application root [ https://react.dev/reference/react-dom/client/createRoot ]
ReactDOM.createRoot(
  document.getElementById("root") // select the root element my id
).render(
  // The render() method is then called to define the React component that should be rendered [ https://www.w3schools.com/react/react_render.asp ]
  // show errors for common bugs components during development [ https://react.dev/reference/react/StrictMode ]
  <React.StrictMode>
    <RouterProvider router={router} basename="/react-projects" />
    {/*  set the base url to /react-projects 
    [ https://v5.reactrouter.com/web/api/BrowserRouter/basename-string ]
    The base URL for all locations. 
    If your app is served from a sub-directory on your server (github pages),set this to the sub-directory
    */}
    {/*https://dev.to/thevinitgupta/react-router-dom-v6-tutorial-for-everyone-4i0k */}
  </React.StrictMode>
);
