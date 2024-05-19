import { withAuthenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import { NavLink, Outlet } from "react-router-dom";

function App({ signOut, user }) {
  return (
    <div className="min-h-screen grid grid-rows-[70px_1fr] gap-0">
      <header className="flex justify-between items-center px-5">
        <img src="/logo.png" alt="drobox logo" className="h-[40px]" />

        <div className="flex items-center justify-between gap-3">
          <NavLink to="/" className="[&.active]:bg-green-400 [&.active]:text-white bg-gray-300 px-5 py-2 rounded no-underline uppercase transition-all duration-500">All files</NavLink>
          <NavLink to="/add" className="[&.active]:bg-green-400 [&.active]:text-white bg-gray-300 px-5 py-2 rounded no-underline uppercase transition-all duration-500">Add files</NavLink>
          <div className="bg-gray-200 px-4 py-1 border rounded">Welcome {user.username}</div>
          <button
            onClick={signOut}
            className="bg-red-600 text-white px-5 py-2 rounded"
          >
            Sign out
          </button>
        </div>

      </header>
      <div className="flex flex-col p-3">
        <Outlet/>
        {/* <h3>Welcome to DropBox 2.0</h3> */}
        {/* <FileUploader /> */}
      </div>
    </div>
  );
}

export default withAuthenticator(App);
