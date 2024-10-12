import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import API from "../../../api";
import BusinessLayout from "../../../layouts/BusinessLayout";

const BusinessHome = () => {
  const [counts, setCounts] = useState({
    appointments: 0,
    payments: 0,
    reviews: 0,
    services: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDataCounts = async () => {
      const response = await API.get("/business/data-count");
      setCounts(response.data);
      setLoading(false);
    };

    fetchDataCounts();
  }, []);

  

  return (
    <BusinessLayout>
        {loading ? (
          <div className="text-center text-5xl text-blue-700">Loading...</div>
        ) : (
          <div className="grid grid-cols-2 gap-4 px-4">
            <div className="flex flex-col py-2 px-3 gap-2 w-full bg-slate-400 rounded shadow-lg">
              <h4 className="text-base font-medium">Appointments</h4>
              <span className="text-5xl font-bold self-end text-zinc-700">
                {counts.appointments}
              </span>
            </div>
            <div className="flex flex-col py-2 px-3 gap-2 w-full bg-slate-400 rounded shadow-lg">
              <h4 className="text-base font-medium">Services</h4>
              <span className="text-5xl font-bold self-end text-zinc-700">
                {counts.services}
              </span>
            </div>
            <div className="flex flex-col py-2 px-3 gap-2 w-full bg-slate-400 rounded shadow-lg">
              <h4 className="text-base font-medium">Reviews</h4>
              <span className="text-5xl font-bold self-end text-zinc-700">
                {counts.reviews}
              </span>
            </div>
            <div className="flex flex-col py-2 px-3 gap-2 w-full bg-slate-400 rounded shadow-lg">
              <h4 className="text-base font-medium">Payments</h4>
              <span className="text-5xl font-bold self-end text-zinc-700">
                {counts.payments}
              </span>
            </div>
          </div>
        )}
    </BusinessLayout>
  );
};

export default BusinessHome;
