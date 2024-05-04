import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const RedirectPage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/login");
  }, []);
  return (
    <>
      <h1> You dont have access to this page</h1>
    </>
  );
};

export default RedirectPage;