import { useEffect, useState } from "react";
// useState hook that lets you add a state variableto the component [ https://react.dev/reference/react/useState ]
// useEffect hook to synchronize components [ https://react.dev/reference/react/useEffect ]

import { Link } from "react-router-dom"; // import link component [ https://www.geeksforgeeks.org/link-component-in-react-router/ ]

// project categories array
const categories = [
  "name",
  "category",
  "description",
  "tech_stack",
  "repository",
  "url",
  "image",
];

/*  Show project */

// [ https://react.dev/learn/passing-props-to-a-component ]

// project categories and buttons start
const Project = (props) => {
  {
    /* https://tailwindcss.com/docs/hover-focus-and-other-states#data-attributes  */
  }
  {
    /* 
    Aria role checkbox [ https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/checkbox_role ]
    :has pseudo-class selects elements that contain specific child elements. [ https://tailwindcss.com/docs/hover-focus-and-other-states#styling-based-on-descendants] 
    & refers to the current element in Tailwind arbitrary selectors. [ https://css-tricks.com/snippets/sass/caching-current-selector-sass/ , https://tailwindcss.com/docs/hover-focus-and-other-states#arbitrary-selectors ]
    &amp; is required in JSX to escape the & character properly. [ https://kamrutkar.hashnode.dev/unescaped-html-entities-in-jsx-reactno-unescaped-entities ]
    // */
  }

  return (
    <tr
      className="border-b transition-colors hover:bg-muted/50 
                   data-[state=selected]:bg-muted"
    >
      {/* [https://react.dev/learn/rendering-lists ] */}
      {categories &&
        categories.map((category) => (
          <td
            key={category}
            className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0"
          >
            ${props.project[category]}
          </td>
        ))}
      <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
        <div className="flex gap-2">
          <Link
            className="
                    inline-flex items-center justify-center 
                    whitespace-nowrap text-sm font-medium 
                    ring-offset-background transition-colors
                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
                    disabled:pointer-events-none disabled:opacity-50
                    border border-input
                    bg-background hover:bg-slate-100
                    h-9 rounded-md px-3"
            to={`/react-projects/edit/${props.project._id}`}
          >
            Edit
          </Link>
          <button
            className="
                    inline-flex items-center justify-center 
                    whitespace-nowrap text-sm font-medium 
                    ring-offset-background transition-colors
                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
                    disabled:pointer-events-none disabled:opacity-50
                    border border-input
                    bg-background hover:bg-slate-100
                    h-9 rounded-md px-3"
            color="red"
            type="button"
            onClick={
              // https://legacy.reactjs.org/docs/handling-events.html#gatsby-focus-wrapper
              () => {
                props.deleteProject(props.project._id);
              }
            }
          >
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
};

// project categories and buttons end

// Project list logic start

const localhostPath = "http://localhost:5050"; // select this for localhost
const netlifyPath = "https://brilliant-strudel-b8b3ca.netlify.app/api"; // select this for netlify
const URL = netlifyPath; // select the netlify custom API

export default function ProjectList() {
  const [projects, setProjects] = useState([]); // set usestate for project list [ https://react.dev/learn/updating-arrays-in-state ]
  const GET_URL = `${URL}/project`;
  // Connect to the database [ https://react.dev/reference/react/useEffect#connecting-to-an-external-system ]
  useEffect(() => {
    async function getProjects() {
      // [ https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch ]
      try {
        const response = await fetch(GET_URL, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            // Add any other headers if required
          },
          mode: "cors", // Ensures CORS headers are respected (if needed)
        }); // await to fetch the url
        // check if response is ok
        if (!response.ok) {
          throw new Error(
            `HTTP error! status: ${response.status} - ${response.statusText}`
          );
        }
        const fetchedProjects = await response.json(); // store the data
        setProjects(JSON.parse(fetchedProjects.data.body)); // set the projects state to the new data
        console.log(`useEffect: ${projects} ${typeof projects}`);
      } catch (error) {
        // catch error
        const message = error.message;
        console.error(message);
      }
    }
    getProjects(); // get projects on load or when projects change
    return;
  }, [projects.length]); // repeat when new project is added or project is deleted - the length of projects changes

  // delete project method start
  async function deleteProject(id) {
    // [ https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch ]
    const DELETE_URL = `${URL}/project/${id}`;
    const response = await fetch(DELETE_URL, {
      method: "DELETE", // add delete method
    }); // await to fetch the url
    const updatedProjects = projects.filter((el) => el._id !== id); // update the data using filter return the projects that don't have this id[ https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter ]
    setProjects(updatedProjects); // set the projects state to the new data
  }
  // delete project method end

  // list project method start
  // loop over the projects with map [ https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map ]
  function projectList() {
    //console.log(`projectList: ${projects} ${typeof projects}`);
    // console.log(`projectList: ${JSON.stringify(projects)} ${typeof projects}`);
    // if (!projects || projects.length === 0) {
    //   return (
    //     <tr>
    //       <td colSpan="7">No projects available</td>
    //     </tr>
    //   );
    // }

    //return Object.keys(projects).forEach((project) => {
    return projects.map((project, index) => {
      // console.log(`projectsmap: ${project} ${typeof project}`);
      //console.log(`Project ${index}:`, JSON.stringify(project.name));
      // console.log(`projectsmap: ${JSON.stringify(project.name, null, 2)}`);
      // Check if the project has a valid name
      if (project && project.name) {
        console.log(`Project ${index}: ${project.name}`);
      } else {
        console.log(`Project ${index}: Name is not available`);
      }
      // [ https://hackernoon.com/how-to-pass-a-function-via-props-in-react ]
      return (
        <tbody key={index} className="[&amp;_tr:last-child]:border-0">
          <Project
            key={project._id}
            project={project}
            deleteProject={() => {
              props.deleteProject(props.project._id);
            }}
            //deleteProject={deleteProject}
          />
        </tbody>
      );
    });
  }
  // list project method end

  // return table with the projects start
  return (
    <>
      <h3 className="text-lg font-semibold p-4">Projects</h3>
      <div className="border rounded-lg overflow-hidden">
        <div className="relative w-full overflow-auto">
          <table className="w-full caption-bottom text-sm">
            <thead className="[&amp;_tr]:border-b">
              <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                {/* loop over the categories */}
                {categories &&
                  categories.map((category) => (
                    <th
                      key={category}
                      className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0"
                    >
                      {category}
                    </th>
                  ))}
              </tr>
            </thead>
            {projectList()}
          </table>
        </div>
      </div>
    </>
  );

  // return table with the projects end
} // Project list logic end
