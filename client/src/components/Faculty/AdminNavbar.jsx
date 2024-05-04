import { Link } from "react-router-dom";
import "../../styles/navbar.css";
import MuLogo from "../../assets/images/mu-logo.png";
import IctLogo from "../../assets/images/ictlogo.png";
import { useNavigate } from "react-router-dom";

const AdminNavbar = () => {
  const adminLogin = localStorage.getItem("adminLogin");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminLogin");
    navigate("/login");
  };
  return (
    <div>
      <header className="header top-0 bg-white shadow-md flex flex-col sm:flex-row items-center justify-between px-4 sm:px-6 lg:px-8 py-1 sticky top-0 z-50">
        <div className="w-full sm:w-4/12 sm:mb-0">
          <img src={MuLogo} alt="logo" className="w-40 mr-4 sm:mr-0" />
        </div>
        <nav className="nav font-semibold text-lg flex-grow">
          <ul className="flex items-center justify-center sm:justify-end ml-40">
            <li className="p-4 b-2 flex-shrink-0">
              <Link to="/component-request-review">Issue Request</Link>
            </li>
            <li className="p-4 b-2 flex-shrink-0">
              <Link to="/lab-entry-review">Lab Entries</Link>
            </li>
            <li className="p-4 b-2 flex-shrink-0">
              <Link to="/complaint-review">Complaint Review</Link>
            </li>
            <li className="p-4 b-2 flex-shrink-0">
              <Link to="/dead-stock">DeadStock</Link>
            </li>
            <li className="p-4 b-2 flex-shrink-0">
              <Link to="/add-subject">Add Subject</Link>
            </li>
            <li className="p-4 b-2 flex-shrink-0">
              <Link to="/add-component">Add Component</Link>
            </li>

            {adminLogin === "chandrasinh.parmar@marwadieducation.edu.in" ? (
              <li className="p-4 b-2 flex-shrink-0">
                <Link to="/faculty-signup">Add User</Link>
              </li>
            ) : (
              <></>
            )}
          </ul>
        </nav>

        <div className="w-full sm:w-3/12 flex justify-center  sm:justify-end">
          {adminLogin && (
            <button
              onClick={handleLogout}
              type="button"
              className="btn btn-info mb-3 mr-3"
              style={{
                backgroundColor: "#14a2b9",
                borderColor: "#14a2b9",
                color: "white",
              }}
            >
              Logout
            </button>
          )}
          <img
            src={IctLogo}
            alt="ICT"
            id="ict-logo"
            className="w-30  lg:mr-30"
          />
        </div>
      </header>
    </div>
  );
};

export default AdminNavbar;
