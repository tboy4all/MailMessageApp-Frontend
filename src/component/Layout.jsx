import { Outlet } from "react-router-dom";
import Nav from "./Nav";
import TogglePage from "./TogglePage";

const Layout = () => {
  const allowed = localStorage.getItem("SavedToken");
  return (
    <div>
      {allowed ? (
        <>
          <Nav />
          <Outlet />
        </>
      ) : (
        <TogglePage />
      )}
    </div>
  );
};

export default Layout;
