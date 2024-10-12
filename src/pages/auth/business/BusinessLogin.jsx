import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../../api";
import { toast } from "react-toastify";
import Input from "../../../components/input/Input";
import Button from "../../../components/button/Button";

const BusinessLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (email && password) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [email, password]);

  const loginBusiness = async () => {
    try {
        setLoading(true);
        const bizData = { email, password };
        const response = await API.post("/business/login", bizData);
        localStorage.setItem("business", JSON.stringify(response.data));
        toast.success("Login successful");
        setTimeout(() => {
          window.location = "/business/home"
        }, 1500);
    } catch(e) {
        console.log(e);
        let message = "Something went wrong. Please try again";
        if(e.response.data){
            message = e.response.data;
        }
        toast.error(message);

    } finally {
        setLoading(false);
    }
    
  };

  return (
    <section className="grid place-items-center h-screen">
      <div className="rounded-lg shadow-md bg-slate-400 flex flex-col gap-4 items-center px-3 py-4">
        <h1 className="text-3xl font-semibold">Business Login</h1>
        <Input
          setValue={(val) => setEmail(val)}
          value={email}
          label={"Email"}
          type="email"
          placeholder={"Business Email"}
        />
        <Input
          setValue={(val) => setPassword(val)}
          value={password}
          label={"Password"}
          type="password"
          placeholder={"Business Account Password"}
        />
        <Button
          text={"Submit"}
          loading={loading}
          disabled={disabled}
          onClick={loginBusiness}
        />
      </div>
    </section>
  );
};

export default BusinessLogin;
