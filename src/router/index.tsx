import { Route, Routes } from "react-router";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";

const Routers = () => {
  return (
    <Routes>
      <Route index element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
};

export default Routers;
