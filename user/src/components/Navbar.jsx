import React from "react";

import { NavLink } from "react-router-dom"; // Add NavLink component, special version of the <Link> that will add styling attributes to the rendered element when it matches the current URL. [ https://v5.reactrouter.com/web/api/NavLink ]

import Logo from "../assets/images/logo.svg"; // import logo from the images

/*  Create navbar component [ https://react.dev/learn/your-first-component ]

Using a React Fragment (<> and </>) as a wrapper [ https://react.dev/reference/react/Fragment ]
to group multiple elements without adding extra nodes to the DOM.
<> and </> shorthand for <React.Fragment>.

*/

export default function Navbar() {
  return (
    <>
      <nav className="flex justify-between items-center mb-6">
        <NavLink to="./">
          <img className="h-10 min-h-28 inline" src={Logo} alt="logo" />
        </NavLink>
        <NavLink
          className="
          inline-flex items-center justify-center 
          whitespace-nowrap text-md font-medium 
          ring-offset-background transition-colors
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
          disabled:pointer-events-none disabled:opacity-50
          border border-input
          bg-background hover:bg-slate-100
          h-9 rounded-md px-3"
          to="./create"
        >
          Create Project
        </NavLink>
      </nav>
    </>
  );
}
