// Create a new project or edit an existing project

import { useEffect, useState } from "react";
// useState hook that lets you add a state variable to your component [ https://react.dev/reference/react/useState ]
// useEffect hook to synchronize components [ https://react.dev/reference/react/useEffect ]

import { useParams, useNavigate } from "react-router-dom";
// useParams - object of key/value pairs of URL parameters. [ https://v5.reactrouter.com/web/api/Hooks/useparams ]
// useNavigate - hook go to the specific URL, and forward or backward pages  [ https://www.geeksforgeeks.org/reactjs-usenavigate-hook/ ]

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

const technologies = [
  "HTML5",
  "CSS3",
  "JavaScript",
  "React.js",
  "Bootstrap",
  "Tailwind CSS",
  "Sass/SCSS",
  "Node.js",
  "PHP",
  "Laravel",
  "MySQL",
  "MongoDB",
  "Express.js",
  "Netlify Functions",
  "Git",
  "GitHub",
  "Visual Studio Code",
  "Vite",
  "Chrome DevTools",
  "Postman",
  "Netlify",
  "Next.js",
];

// Create - Update Project start
export default function Project() {
  // set state empty value for each category
  const [form, setForm] = useState({
    name: "",
    category: "",
    description: "",
    tech_stack: "",
    repository: "",
    url: "",
    image: "",
  });

  const [isNewProject, setIsNewProject] = useState(true); // set a state to check if new project

  // set check status for checkbox tech stack [ https://www.freecodecamp.org/news/how-to-work-with-multiple-checkboxes-in-react/ ]
  const [checkedState, setCheckedState] = useState(
    Array(technologies.length).fill(false) // create a new array for all checkboxs checkState with the length of the technologies array and fill it with false values
  );

  const params = useParams(); // get url params

  const navigate = useNavigate(); // get url navigation history

  const localhostPath = "http://localhost:5050"; // select this for localhost
  const netlifyPath = "https://brilliant-strudel-b8b3ca.netlify.app/projects"; // select this for netlify
  const URL = netlifyPath; // select the netlify custom API

  const homePath = "/react-projects/projects"; // select this if hosted on github pages

  // start useEffect
  useEffect(() => {
    // Connect to the database [ https://react.dev/reference/react/useEffect#connecting-to-an-external-system ]
    async function fetchProject() {
      // [ https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch ]
      /* The optional chaining (?.) operator accesses an object's property or calls a function. 
              If the object accessed or function called using this operator is undefined or null, 
              the expression short circuits and evaluates to undefined instead of throwing an error.
               [ https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining ]

              || undefined - if id don't exist return undefined 
              */

      const id = params.id?.toString() || undefined; // if update project id exists else if create a new project id doesn't exist - convert it to string
      if (!id) return; // if id doesn't exist return
      setIsNewProject(false); // else if update project set NewProject state as false because it is not a new project
      try {
        const URL_ID = `${URL}/${params.id.toString()}`; // get the id from the params object and convert it to string
        const response = await fetch(URL_ID); // await to fetch the url id
        // check if response is ok
        if (!response.ok) {
          throw new Error(
            `HTTP error! status: ${response.status} - ${response.statusText}`
          );
        }
        const fetchedProject = await response.json(); // store the data
        if (!fetchedProject) {
          // if project with specific doesn't exist
          const message = `Project with id ${id} not found`; // set error message
          console.warn(message); // make a warning
          navigate(`${homePath}`); // return to home
          return;
        }
        setForm(fetchedProject); // fill the form with the project data
      } catch (error) {
        // catch error
        const message = error.message;
        console.error(message);
      }
    }
    fetchProject(); // get project data
    return;
  }, [params.id, navigate]); // repeat for a project id change - navigation change
  // end useEffect

  /*  checkboxes update handler
    parameter checkbox index
    index map over the checkboxes and if the index is same with the checkbox index  toggle between checked and not checked
    get the selected technologies
    map over the selected technologies and return the technology if it is checked else return undefined
    exclude the falsy values [ https://mikebifulco.com/posts/javascript-filter-boolean ]  
  */
  const handleOnChangeCheckbox = (checkboxIndex) => {
    const updatedCheckedState = checkedState.map((checked, index) =>
      index === checkboxIndex ? !checked : checked
    );

    setCheckedState(updatedCheckedState);

    const selectedTechnologies = updatedCheckedState
      .map((checked, index) => checked && technologies[index])
      .filter(Boolean);
    updateForm({ tech_stack: selectedTechnologies });
  };

  //  start method to update project data
  function updateForm(currentValue) {
    /* get previous value to use it for next render 
        [ https://www.geeksforgeeks.org/how-to-get-previous-state-in-reactjs-functional-component/ ]
        https://react.dev/reference/react/useState#updating-state-based-on-the-previous-state
        */

    return setForm((previousValue) => {
      return {
        ...previousValue,
        ...currentValue,
      };
    });
    //setForm( (previousValue) => { return {...previousValue, ...currentValue }; });
  } //  end method to update project data

  //  start method handler to submit data

  async function onSubmit(event) {
    event.preventDefault(); // prevent default event action https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault
    const formProject = { ...form }; // create a project object including the form data
    try {
      let response; // create a response object
      if (isNewProject) {
        // if creating a new project post to /project
        const POST_URL = `${URL}/create`;
        response = await fetch(POST_URL, {
          method: "POST", // add post method // [ https://www.freecodecamp.org/news/javascript-post-request-how-to-send-an-http-post-request-in-js/ ]
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formProject), // request body passing data from form
        }); // await to fetch the url
      } else {
        // if updating a project patch to /project/:id
        const PATCH_URL = `${URL}/${params.id}`;
        response = await fetch(PATCH_URL, {
          method: "PATCH", // add patch method
          headers: {
            "Content-Type": "application/json charset=UTF-8", // [ https://blog.stackademic.com/demystifying-fetch-a-guide-to-get-post-patch-and-delete-da8514f041e4 ]
          },
          body: JSON.stringify(formProject), // request body passing data from form
        }); // await to fetch the url
      }
      // check if response is ok
      if (!response.ok) {
        throw new Error(
          `HTTP error! status: ${response.status} - ${response.statusText}`
        );
      }
    } catch (error) {
      // catch error
      const message = error.message;
      console.error(message);
    } finally {
      // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch
      // reset form values for next use
      if (isNewProject) {
        setForm({
          name: "",
          category: "",
          description: "",
          tech_stack: "",
          repository: "",
          url: "",
          image: "",
        });
      }
      navigate(`${homePath}`); // return home
    }
  }
  //  end method handler to submit data

  //  start user input form
  return (
    <>
      <h3 className="text-lg font-semibold p-4">Create Project</h3>
      <form
        onSubmit={onSubmit} // [ https://react.dev/reference/react-dom/components/input#reading-the-input-values-when-submitting-a-form ]
        className="border rounded-lg overflow-hidden p-4"
      >
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-slate-900/10 pb-12 md:grid-cols-2">
          <div>
            <h2 className="text-base font-semibold leading-7 text-slate-900">
              Project Info
            </h2>
            <p className="mt-1 text-sm leading-6 text-slate-600">
              A collection of the projects i have created over the years
              learning about several technologies.
            </p>
          </div>

          <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8">
            {categories &&
              categories.map((category) => (
                <div key={category} className="sm:col-span-4">
                  <label
                    htmlFor={category}
                    className="block text-sm font-medium leading-6 text-slate-900"
                  >
                    {category}
                  </label>

                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-slate-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                      {category === "description" ? (
                        <textarea
                          rows="10"
                          cols="50"
                          type="text"
                          name="description"
                          id="description"
                          className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-slate-900 placeholder:text-slate-400 focus:ring-0 sm:text-sm sm:leading-6"
                          placeholder="Project description"
                          value={form.description || ""}
                          onChange={(e) =>
                            updateForm({ description: e.target.value })
                          }
                        />
                      ) : (
                        <input
                          type="text"
                          name={category}
                          id={category}
                          className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-slate-900 placeholder:text-slate-400 focus:ring-0 sm:text-sm sm:leading-6"
                          placeholder={`Project ${category}`}
                          value={form[category] || ""}
                          onChange={(e) =>
                            updateForm({ [category]: e.target.value })
                          }
                        />
                      )}
                    </div>
                  </div>
                </div>
              ))}

            <div>
              <p>Select Project technology</p>
              <fieldset className="mt-4">
                <legend className="sr-only">Select Technologies</legend>

                <div className="space-y-4 sm:flex sm:items-center sm:space-x-10 sm:space-y-0">
                  <div className="flex flex-wrap items-center">
                    {technologies &&
                      technologies.map((technology, index) => (
                        <div key={technology} className="flex items-center">
                          <input
                            id={technology}
                            name="tech_stack"
                            type="checkbox"
                            value={technology}
                            className="h-4 w-4 border-slate-300 text-slate-600 focus:ring-slate-600 cursor-pointer"
                            checked={checkedState[index]}
                            onChange={() => handleOnChangeCheckbox(index)}
                          />
                          <label
                            htmlFor={technology}
                            className="ml-3 block text-sm font-medium leading-6 text-slate-900 mr-4"
                          >
                            {technology}
                          </label>
                        </div>
                      ))}
                  </div>
                </div>
              </fieldset>
            </div>
          </div>
        </div>

        <input
          type="submit"
          value="Save Project"
          className="inline-flex items-center justify-center whitespace-nowrap text-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-lime-400  text-zinc-900 bg-background hover:bg-green-400 hover:text-gray-800 hover:text-accent-foreground h-9 rounded-md px-3 cursor-pointer mt-4"
        />
      </form>
    </>
  );
  //  end user input form
} // Create - Update Project end
