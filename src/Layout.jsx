import { Outlet } from "react-router-dom";
import PropTypes from "prop-types";
import Navigation from "./components/Navigation";

function Layout({ onSignOut }) {
  return (
    <>
      <header>
        <Navigation onSignOut={onSignOut} />
      </header>
      <main>
        <div className="row justify-content-center">
          <div className="col-10 col-md-8">
            <Outlet />
          </div>
        </div>
      </main>
      <footer className="text-center py-4">
        <div className="row justify-content-center">
          <div className="col-12 col-md-10">
            Copyright © 2023 - All right reserved by Abdillah Mufki Auzan Mubin
          </div>
        </div>
      </footer>
    </>
  );
}

Layout.propTypes = {
  onSignOut: PropTypes.func.isRequired,
};

export default Layout;
