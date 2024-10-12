import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import BusinessRegister from "./pages/auth/business/BusinessRegister";
import { ToastContainer } from "react-toastify";
import BusinessLogin from "./pages/auth/business/BusinessLogin";
import 'react-toastify/dist/ReactToastify.css';
import BusinessHome from "./pages/home/business/BusinessHome";
import BusinessServices from "./pages/services/business/BusinessServices";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Navigate to={"/business/register"} />} />
        <Route path="/business/register" element={<BusinessRegister />} />
        <Route path="/business/login" element={<BusinessLogin />} />
        <Route path="/business/home" element={<BusinessHome />} />
        <Route path="/business/services" element={<BusinessServices />} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
