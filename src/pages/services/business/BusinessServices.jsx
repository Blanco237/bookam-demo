import React, { useEffect, useState } from "react";
import BusinessLayout from "../../../layouts/BusinessLayout";
import Button from "../../../components/button/Button";
import Input from "../../../components/input/Input";
import { toast } from "react-toastify";
import API from "../../../api";
import Loader from "../../../components/loader/Loader";

const BusinessServices = () => {
  const [formData, setFormData] = useState({
    name: "",
    duration: "",
    price: "",
    description: "",
  });
  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [services, setServices] = useState([]);
  const [dataLoading, setDataLoading] = useState(false);

  const updateData = (val, field) => {
    setFormData({ ...formData, [field]: val });
  };

  useEffect(() => {
    if (formData.name && formData.duration && formData.price) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [formData]);

  const fetchServices = async () => {
    setDataLoading(true);
    const response = await API.get("/business/services");
    console.log(response.data);
    setServices(response.data);
    setDataLoading(false);
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const createService = async () => {
    try {
      setLoading(true);
      const business = JSON.parse(localStorage.getItem("business"));
      const serviceData = { ...formData, businessId: business.id };
      await API.post("/business/service/create", serviceData);
      toast.success("Service Created");
      fetchServices();
      setFormData({
        name: "",
        duration: "",
        price: "",
        description: "",
      })
    } catch (e) {
      toast.error(e.response.data);
    } finally {
      setLoading(false);
    }
  };

  const deleteService = async (id) => {
    await API.delete(`/business/services/${id}`);
    toast.success('Service deleted');
    fetchServices();
  }

  return (
    <BusinessLayout>
      <section className="flex px-4 gap-10">
        {dataLoading ? (
            <div className="w-3/5">
                <Loader />
            </div>
        ) : (
          <div className="grid grid-cols-3 w-3/5 gap-4">
            {services.map((service) => {
              return (
                <div
                  key={service.id}
                  className="flex flex-col py-2 px-3 gap-2 w-full bg-slate-400 rounded shadow-lg"
                >
                  <h4 className="text-lg font-bold">Service</h4>
                  <p>Name: {service.name}</p>
                  <p>Duration: {service.duration}</p>
                  <p>Price: {service.price}FCFA</p>
                  <p>Description: {service.description}</p>
                  <button onClick={() => deleteService(service.id)}>Delete</button>
                </div>
              );
            })}
          </div>
        )}
        <div className="flex flex-col shadow-lg rounded-md py-3 px-5 w-2/5 items-center gap-3">
          <h3 className="font-bold text-lg">Create New Service</h3>
          <Input
            setValue={(val) => updateData(val, "name")}
            value={formData.name}
            label={"Name"}
            type="text"
            placeholder={"Service Name"}
          />
          <Input
            setValue={(val) => updateData(val, "duration")}
            value={formData.duration}
            label={"Duration"}
            type="text"
            placeholder={"e.g. 2hrs, 1day, 30mins"}
          />
          <Input
            setValue={(val) => updateData(val, "price")}
            value={formData.price}
            label={"Price"}
            type="number"
            placeholder={"2000"}
          />
          <Input
            setValue={(val) => updateData(val, "description")}
            value={formData.description}
            label={"Description"}
            type="text"
            placeholder={"Service Description"}
          />
          <Button
            text={"Submit"}
            loading={loading}
            disabled={disabled}
            onClick={createService}
          />
        </div>
      </section>
    </BusinessLayout>
  );
};

export default BusinessServices;
