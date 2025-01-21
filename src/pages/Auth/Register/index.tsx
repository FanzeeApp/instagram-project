import { ChangeEvent, FormEvent, useState } from "react";
import { useMutation } from "react-query";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { AxiosError } from "axios";
import { NavLink, useNavigate } from "react-router";
import Logo from "../../../assets/logo.svg";
import { setUser } from "../../../store/authSlice";
import { register } from "../../../service/service";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    birthDate: "",
    gender: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const mutation = useMutation(register, {
    onSuccess: (data: any) => {
      console.log("success bo'ldi");

      dispatch(setUser(data));

      toast.success("Muvaffiqiyatli ro'yxatdan o'tdingiz");
      navigate("/");
    },
    onError: (error: AxiosError) => {
      console.log("error bo'ldi", error);
      toast.error(
        (error?.response?.data as unknown as { error: string }).error ||
          "Xatolik yuz berdi"
      );
    },
  });

  const handleChange = (e: ChangeEvent) => {
    const { name, value } = e.target as unknown as {
      name: string;
      value: string;
    };

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    mutation.mutate(formData);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <ToastContainer />

      <form onSubmit={handleSubmit} className="border p-6  w-full max-w-sm">
        <div className="flex justify-center mb-4">
          <img className="w-[175px] h-[51px]" src={Logo} alt="Logo" />
        </div>
        <div className="mb-4">
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded text-sm bg-gray-100 focus:outline-none focus:ring-1 focus:ring-gray-400"
            placeholder="Моб. телефон или эл. адрес"
            required
          />
        </div>
        <div className="mb-4">
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded text-sm bg-gray-100 focus:outline-none focus:ring-1 focus:ring-gray-400"
            placeholder="Пароль"
            required
          />
        </div>
        <div className="mb-4">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded text-sm bg-gray-100 focus:outline-none focus:ring-1 focus:ring-gray-400"
            placeholder="Емаил"
            required
          />
        </div>
        <div className="mb-4">
          <input
            type="date"
            name="birthDate"
            value={formData.birthDate}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded text-sm bg-gray-100 focus:outline-none focus:ring-1 focus:ring-gray-400"
            placeholder="Birth Date"
            required
          />
        </div>
        <div className="mb-4">
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded text-sm bg-gray-100 focus:outline-none focus:ring-1 focus:ring-gray-400"
            required
          >
            <option value="" disabled selected>
              Select Gender
            </option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded mt-4 disabled:bg-slate-400"
          disabled={mutation.isLoading}
        >
          {mutation.isLoading ? "Registering..." : "Register"}
        </button>
        <div className="mt-4 text-center">
          <NavLink to="/">
            <span>
              Есть аккаунт? <span className="text-blue-400"> Вход</span>
            </span>
          </NavLink>
        </div>
      </form>
    </div>
  );
};

export default Register;
