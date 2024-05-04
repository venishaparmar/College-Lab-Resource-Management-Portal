import { BrowserRouter, Routes, Route } from "react-router-dom";
import "../src/styles/App.css";
import HomeMain from "./components/HomeMain";
import LoginPage from "./components/LoginPage";
import ComponentIssue from "./components/ComponentIssue";
import StudentSignUp from "./components/StudentSignUp";
import ComponentPage from "./components/ComponentPage";
import RequestShow from "./components/RequestShow";
import QrReader from "./components/QrReader";
import LabEntry from "./components/LabEntry";
import { Toaster } from "react-hot-toast";
import ComponentReview from "./components/Faculty/ComponentReview";
import AddComponent from "./components/Faculty/AddComponent";
import LabOverview from "./components/LabOverview";
import LabDetail from "./components/LabDetail";
import Complaint from "./components/Complaint";
import DeadStock from "./components/Faculty/DeadStock";
import ComplainReview from "./components/ComplainReview";
import LabEntryOverview from "./components/Faculty/LabEntryOverview";
import LabAvailability from "./components/LabAvailability";
import LabLogin from "./components/LabLogin";
import StudentElement from "./components/StudentElement";
import AdminElement from "./components/AdminElement";
import AdminHome from "./components/Faculty/AdminHome";
import AddSubject from "./components/Faculty/AddSubject";
import FacultyLogin from "./components/Faculty/FacultyLogin";
import FacultySignUp from "./components/Faculty/FacultySignUp";

function App() {
  return (
    <BrowserRouter>
      <>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<StudentSignUp />} />
          <Route
            path="/home"
            element={
              <StudentElement>
                <HomeMain />
              </StudentElement>
            }
          />
          <Route
            path="/component-issue"
            element={
              <StudentElement>
                <ComponentIssue />
              </StudentElement>
            }
          />
          <Route
            path="/lab-availability"
            element={
              <StudentElement>
                <LabAvailability />
              </StudentElement>
            }
          />
          <Route
            path="/lab-entry"
            element={
              <AdminElement>
                <LabEntry />
              </AdminElement>
            }
          />
          <Route
            path="/request-show"
            element={
              <StudentElement>
                <RequestShow />
              </StudentElement>
            }
          />
          <Route
            exact
            path="/component-page/:id"
            element={
              <StudentElement>
                <ComponentPage />
              </StudentElement>
            }
          />
          <Route exact path="/qr-reader" element={<QrReader />} />
          <Route
            exact
            path="/add-component"
            element={
              <AdminElement>
                <AddComponent />
              </AdminElement>
            }
          />
          <Route
            exact
            path="component-request-review"
            element={
              <AdminElement>
                <ComponentReview />
              </AdminElement>
            }
          />
          <Route
            exact
            path="/lab-overview"
            element={
              <StudentElement>
                <LabOverview />
              </StudentElement>
            }
          />
          <Route
            exact
            path="/lab-detail/:id"
            element={
              <StudentElement>
                <LabDetail />
              </StudentElement>
            }
          />
          <Route
            exact
            path="/complaint"
            element={
              <StudentElement>
                <Complaint />
              </StudentElement>
            }
          />
          <Route
            exact
            path="/dead-stock"
            element={
              <AdminElement>
                <DeadStock />
              </AdminElement>
            }
          />
          <Route exact path="/complaint-review" element={<ComplainReview />} />
          <Route exact path="/lab-login" element={<LabLogin />} />
          <Route exact path="/faculty-login" element={<FacultyLogin />} />
          <Route exact path="/faculty-signup" element={<FacultySignUp />} />
          <Route
            exact
            path="/admin-home"
            element={
              <AdminElement>
                <AdminHome />
              </AdminElement>
            }
          />
          <Route
            exact
            path="/add-subject"
            element={
              <AdminElement>
                <AddSubject />
              </AdminElement>
            }
          />

          <Route
            exact
            path="/lab-entry-review"
            element={
              <AdminElement>
                <LabEntryOverview />
              </AdminElement>
            }
          />
        </Routes>
        <Toaster position="top-center" reverseOrder={false} />
      </>
    </BrowserRouter>
  );
}

export default App;
