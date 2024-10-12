import React from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";

const BusinessLayout = ({ children }) => {
  const navigate = useNavigate();

  const business = JSON.parse(localStorage.getItem("business"));

  if (!business) {
    return <Navigate to={"/business/login"} />;
  }

  const logout = () => {
    localStorage.removeItem("business");
    if (confirm("Do you want to logout")) {
      navigate("/business/login");
    }
  };

  return (
    <section className="h-screen flex items-stretch">
      <aside className="flex flex-col gap-4 border-r pl-3 py-4 border-gray-600 min-w-52">
        <Link to={'/business/home'} className="text-3xl font-medium w-full border-b-2 pb-1">
          {business.name}
        </Link>
        <nav className="flex flex-col gap-2">
          <Link
            className="text-lg font-medium text-blue-600"
            to={"/business/appts"}
          >
            Appointments
          </Link>
          <Link
            className="text-lg font-medium text-blue-600"
            to={"/business/services"}
          >
            Services
          </Link>
          <Link
            className="text-lg font-medium text-blue-600"
            to={"/business/reviews"}
          >
            Reviews
          </Link>
          <Link
            className="text-lg font-medium text-blue-600"
            to={"/business/reviews"}
          >
            Payments
          </Link>
        </nav>
      </aside>
      <section className="flex flex-col w-full">
        <div className="flex justify-between w-full items-center py-4 px-4">
          <h3 className="text-3xl font-medium">Welcome, {business.owner}</h3>
          <button
            onClick={logout}
            className="text-lg font-medium py-1 px-4 bg-red-500 rounded text-white"
          >
            Logout
          </button>
        </div>
        {children}
      </section>
    </section>
  );
};

export default BusinessLayout;
