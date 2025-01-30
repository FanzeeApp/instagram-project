import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "react-query";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { AxiosError } from "axios";
import { NavLink, useNavigate } from "react-router";
import * as yup from "yup";
import Logo from "../../../assets/logo.svg";
import { setUser } from "../../../store/authSlice";
import { register as registerUser } from "../../../service/service";

const schema = yup.object().shape({
  username: yup.string().min(4, "Username kamida 4 harfdan iborat bo'lishi kerak!").required("Ism majburiy!"),
  email: yup.string().email("Noto‘g‘ri email!").required("Email majburiy!"),
  password: yup.string().min(6, "Parol kamida 6 ta belgidan iborat bo‘lishi kerak!").required("Parol majburiy!"),
  birthDate: yup.string().required("Tug‘ilgan sana majburiy!"),
  gender: yup.string().oneOf(["male", "female"], "Jinsni tanlang!").required("Jins majburiy!"),
});

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const mutation = useMutation(registerUser, {
    onSuccess: (data: any) => {
      dispatch(setUser(data));
      toast.success("Muvaffaqiyatli ro‘yxatdan o‘tildi!");
      navigate("/");
    },
    onError: (error: AxiosError) => {
      toast.error(
        (error?.response?.data as unknown as { error: string }).error ||
          "Xatolik yuz berdi"
      );
    },
  });

  const onSubmit = (data: any) => {
    mutation.mutate(data);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <ToastContainer />
      <form onSubmit={handleSubmit(onSubmit)} className="border p-6 w-full max-w-sm">
        <div className="flex justify-center mb-4">
          <img className="w-[175px] h-[51px]" src={Logo} alt="Logo" />
        </div>

        <div className="mb-4">
          <input
            {...register("username")}
            className="w-full p-2 border border-gray-300 rounded text-sm bg-gray-100 focus:outline-none focus:ring-1 focus:ring-gray-400"
            placeholder="Моб. телефон или эл. адрес"
          />
          <p className="text-red-500">{errors.username?.message}</p>
        </div>

        <div className="mb-4">
          <input
            type="password"
            {...register("password")}
            className="w-full p-2 border border-gray-300 rounded text-sm bg-gray-100 focus:outline-none focus:ring-1 focus:ring-gray-400"
            placeholder="Пароль"
          />
          <p className="text-red-500">{errors.password?.message}</p>
        </div>

        <div className="mb-4">
          <input
            type="email"
            {...register("email")}
            className="w-full p-2 border border-gray-300 rounded text-sm bg-gray-100 focus:outline-none focus:ring-1 focus:ring-gray-400"
            placeholder="Емаил"
          />
          <p className="text-red-500">{errors.email?.message}</p>
        </div>

        <div className="mb-4">
          <input
            type="date"
            {...register("birthDate")}
            className="w-full p-2 border border-gray-300 rounded text-sm bg-gray-100 focus:outline-none focus:ring-1 focus:ring-gray-400"
          />
          <p className="text-red-500">{errors.birthDate?.message}</p>
        </div>

        <div className="mb-4">
          <select
            {...register("gender")}
            className="w-full p-2 border border-gray-300 rounded text-sm bg-gray-100 focus:outline-none focus:ring-1 focus:ring-gray-400"
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          <p className="text-red-500">{errors.gender?.message}</p>
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
