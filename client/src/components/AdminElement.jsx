import { useNavigate } from "react-router-dom";
import RedirectPage from "./RedirectPage";

const AdminElement = ({ children }) => {
  const adminLogin = localStorage.getItem("adminLogin");
  const navigate = useNavigate();
  if (adminLogin) {
    return <>{children}</>;
  } else {
    return <RedirectPage />;
  }
};

export default AdminElement;