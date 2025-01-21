import { ChangeEvent, FormEvent, useState } from "react";
import { useMutation } from "react-query";
import { useDispatch } from "react-redux";
import { AxiosError } from "axios";
import { NavLink, useNavigate } from "react-router";
import "react-toastify/dist/ReactToastify.css";
import Logo from "../../../assets/logo.svg";
import { setUser } from "../../../store/authSlice";
import { login } from "../../../service/service";
import { toast, ToastContainer } from "react-toastify";

const Login = () => {
  const [formData, setFormData] = useState({
    login: "",
    password: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const mutation = useMutation(login, {
    onSuccess: (data: any) => {
      console.log("Tizimga muvaffaqiyatli kirdingiz:", data);

      dispatch(setUser(data));

      toast.success("Tizimga muvaffaqiyatli kirdingiz!");
      navigate("/home");
    },
    onError: (error: AxiosError) => {
      console.error("Kirishda xatolik yuz berdi:", error);
      toast.error(
        (error?.response?.data as unknown as { error: string }).error ||
          "Login yoki parol noto'g'ri"
      );
    },
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    mutation.mutate(formData);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-50">
      <ToastContainer />
      <div className="flex flex-col items-center bg-white p-6 border border-gray-300 rounded shadow-sm w-full max-w-sm">
        <img className="w-32 mb-6" src={Logo} alt="Logo" />
        <form onSubmit={handleSubmit} className="w-full">
          <div className="mb-4">
            <input
              type="text"
              name="login"
              value={formData.login}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded bg-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Телефон, имя пользователя или эл. адрес"
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded bg-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Пароль"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-3 rounded font-semibold text-sm disabled:bg-blue-300"
            disabled={mutation.isLoading}
          >
            {mutation.isLoading ? "Доступ..." : "Войти"}
          </button>
        </form>
        <div className="flex items-center justify-center mt-4">
          <div className="h-[1px] w-full bg-gray-300"></div>
          <span className="px-4 text-sm text-gray-400">ИЛИ</span>
          <div className="h-[1px] w-full bg-gray-300"></div>
        </div>
        <div className="mt-4 text-center">
          <NavLink to="/register" className="text-blue-500 font-medium">
            Зарегистрироваться
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Login;
