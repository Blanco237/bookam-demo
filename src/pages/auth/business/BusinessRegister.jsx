import React, { useEffect, useState } from "react";
import Input from "../../../components/input/Input";
import Button from "../../../components/button/Button";
import API from "../../../api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const BusinessRegister = () => {
  const [bizData, setBizData] = useState({
    name: "",
    location: "",
    owner: "",
    email: "",
    phone: "",
    password: "",
  });
  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const updateData = (val, field) => {
    setBizData({ ...bizData, [field]: val });
  };

  useEffect(() => {
    if (bizData.owner && bizData.name && bizData.email && bizData.password) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [bizData]);

  const registerBusiness = async () => {
    setLoading(true);
    await API.post("/business/register", bizData);
    setLoading(false);
    toast.success("Registration Successful");
    setTimeout(() => {
      navigate("/business/login");
    }, 1500);
  };

  return (
    <section className="grid place-items-center h-screen">
      <div className="rounded-lg shadow-md bg-slate-400 flex flex-col gap-4 items-center px-3 py-4">
        <h2 className="text-3xl font-semibold">Business Registration</h2>
        <Input
          setValue={(val) => updateData(val, "name")}
          value={bizData.name}
          label={"Name"}
          type="text"
          placeholder={"Business Name"}
        />
        <Input
          setValue={(val) => updateData(val, "location")}
          value={bizData.location}
          label={"Location"}
          type="text"
          placeholder={"Business Location"}
        />
        <Input
          setValue={(val) => updateData(val, "owner")}
          value={bizData.owner}
          label={"Owner"}
          type="text"
          placeholder={"Business Owner"}
        />
        <Input
          setValue={(val) => updateData(val, "phone")}
          value={bizData.phone}
          label={"Phone Number"}
          type="tel"
          placeholder={"Business Phone Number"}
        />
        <span>Login info</span>
        <Input
          setValue={(val) => updateData(val, "email")}
          value={bizData.email}
          label={"Email"}
          type="email"
          placeholder={"Business Email"}
        />
        <Input
          setValue={(val) => updateData(val, "password")}
          value={bizData.password}
          label={"Password"}
          type="password"
          placeholder={"Business Account Password"}
        />
        <Button
          text={"Submit"}
          loading={loading}
          disabled={disabled}
          onClick={registerBusiness}
        />
      </div>
    </section>
  );
};

export default BusinessRegister;
