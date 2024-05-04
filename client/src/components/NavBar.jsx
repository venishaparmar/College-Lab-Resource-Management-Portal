import { Link, useNavigate } from "react-router-dom";
import "../styles/navbar.css";
import MuLogo from "../assets/images/mu-logo.png";
import IctLogo from "../assets/images/ictlogo.png";
import { useState } from "react";
import { IoPower } from 'react-icons/io5';


export default function NavBar() {
  const user = localStorage.getItem("currentUser");
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const navigate = useNavigate();
  const [showSidebar, setShowSidebar] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
  };
  return (
    <>
      <header className="header top-0 bg-white shadow-md flex flex-col sm:flex-row items-center justify-between px-4 sm:px-6 lg:px-8 py-1 sticky top-0 z-50">
        <div className="flex items-center">
          <img src={MuLogo} alt="logo" className="w-50 sm:mr-0" />
          <img
            src={IctLogo}
            alt="ICT"
            id="ict-logo"
            className="w-30 lg:mr-0" // Set margin-right to 0
          />
          <button
            className="sm:hidden block text-white-500 focus:outline-none w-10 h-14 mb-6 ml-4"
            onClick={() => setShowSidebar(!showSidebar)}
            style={{ backgroundColor: '#14a2b9', borderColor: '#14a2b9', color: 'white' }}
          >
            <svg
              className="w-8 h-15"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              {showSidebar ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              )}
            </svg>
          </button>
        </div>
        <nav className={`nav font-semibold text-lg flex-grow ${showSidebar ? 'block' : 'hidden'} sm:block mt-6 sm:mt-0`}>
          <ul className="flex flex-col sm:flex-row items-center sm:items-start sm:gap-4">
            <li className="p-4 b-2 flex-shrink-0">
              <Link to="/home" className="ml-0">Home</Link>
            </li>
            <li className="p-4 b-2 flex-shrink-0">
              <Link to="/component-issue" className="ml-0">Component Issue</Link>
            </li>
            <li className="p-4 b-2 flex-shrink-0">
              <Link to="/lab-availability" className="ml-0">Lab Availability</Link>
            </li>
            <li className="p-4 b-2 flex-shrink-0">
              <Link to="/lab-overview" className="ml-0">Lab Explore</Link>
            </li>
            <li className="p-4 b-2 flex-shrink-0">
              <Link to="/request-show" className="ml-0">My Requests</Link>
            </li>
            <li className="p-4 b-2 flex-shrink-0">
              <Link to="/complaint" className="ml-0">Add Complaint</Link>
            </li>
          </ul>
        </nav>
        {isLoggedIn && (
          <button
            onClick={handleLogout}
            type="button"
            className="btn btn-info mb-3 mr-3 sm:mb-0 sm:mr-0"
            style={{ backgroundColor: '#14a2b9', borderColor: '#14a2b9', color: 'white' }}
          >
            <span className="hidden sm:inline">Logout</span>
            <IoPower className="sm:hidden" />
          </button>
        )}
      </header>
    </>
  );
}
