import { useEffect, useState } from "react";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { GET_PROFILE_ROUTE, LOGIN_ROUTE } from "../../constants";
import { useNavigate } from "react-router-dom";
import { api } from "@/lib/api-client";
import validator from "validator";
import useStore from "../../store/store.js"

const Login = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [isValid, setIsValid] = useState(true);
  const [errormsg, setErrormsg] = useState(false);
  const saveUserInfo=useStore((store)=>store.saveUserInfo);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const handlelogin = async (e) => {
    e.preventDefault();

    const emailError = !validator.isEmail(email);
    const passwordError = password.length === 0;

    if (!emailError && !passwordError) {
      try {
        const res = await api.post(LOGIN_ROUTE, {
          email,
          password,
        });
        
        if (res.data.success) {
          saveUserInfo(res.data.data)
          return navigate("/");
        }
      } catch (error) {
        if (!error.response) {
           return navigate('/coldstart')
        }
        setErrormsg(true);
      }
    } else {
      setIsValid(false);
    }
  };



  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Heading */}
        <div className="mb-7">
          <h1 className="text-3xl font-bold text-white">Welcome back</h1>

          <p className="mt-2 text-sm text-slate-400">
            Please enter your details to login.
          </p>
        </div>

        <form className="space-y-5" onSubmit={handlelogin}>
          {/* Email */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Email
            </label>

            <div className="relative">
              <Mail
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
              />

              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setIsValid(true);
                  setErrormsg(false);
                }}
                className="h-11 w-full rounded-md border border-slate-700
                bg-slate-900 pl-10 pr-4 text-sm text-white
                outline-none placeholder:text-slate-500
                focus:border-green-500 focus:ring-1 focus:ring-green-500"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Password
            </label>

            <div className="relative">
              <Lock
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
              />

              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setIsValid(true);
                  setErrormsg(false);
                }}
                className="h-11 w-full rounded-md border border-slate-700
                bg-slate-900 pl-10 pr-10 text-sm text-white
                outline-none placeholder:text-slate-500
                focus:border-green-500 focus:ring-1 focus:ring-green-500"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2
                text-slate-500 hover:text-slate-300"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Forgot password */}
          <div className="flex justify-end">
            <a
              href="/forgot-password"
              className="text-sm text-green-500 hover:text-green-400"
            >
              Forgot password?
            </a>
          </div>

          {/* Client side error */}
          {!isValid && (
            <p className="text-red-400 pl-1">
              Please enter a valid email and password.
            </p>
          )}

          {/* Server side error */}
          {errormsg && (
            <p className="text-red-400 pl-1">Invalid email or password.</p>
          )}

          {/* Login button */}
          <button
            type="submit"
            className="h-11 w-full rounded-md bg-green-600
            text-sm font-medium text-white
            transition hover:bg-green-500"
          >
            Login
          </button>
        </form>

        {/* Sign up */}
        <p className="mt-6 text-center text-sm text-slate-400">
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="text-green-500 hover:text-green-400 cursor-pointer"
          >
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
  