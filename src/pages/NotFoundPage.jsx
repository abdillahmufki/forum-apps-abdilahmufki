import React from "react";
import Image from "../assets/images/notfound.svg";

function NotFoundPage() {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div>
        <img src={Image} alt="not found" width={500} />
      </div>
    </div>
  );
}

export default NotFoundPage;
