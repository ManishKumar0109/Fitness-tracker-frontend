import { useState } from "react";
import { User, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { SIGNUP_ROUTE, HOST } from "../../constants";
import { api } from "@/lib/api-client";
import validator from "validator";
import useStore from "../../store/store"

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [isValid, setIsValid] = useState(true);
  const [errormsg,setErrormsg]=useState(false)

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const {saveUserInfo}=useStore();

  const handlesignup = async (e) => {
    e.preventDefault();

    const usernameError = !validator.isAlphanumeric(username);
    const emailError = !validator.isEmail(email);
    const passwordError = !validator.isStrongPassword(password);

    if (!usernameError && !emailError && !passwordError) {
      try {
        const res = await api.post(`${HOST}${SIGNUP_ROUTE}`, {
          username,
          password,
          email,
        });
        console.log(res.data , res)
        if (res.data.success) {
          saveUserInfo(res.data.data)
          return navigate("/");
        }
        else {
          setErrormsg(true)
        }
      } catch (error) {
        if (!error.response) {
           return navigate('/coldstart')
        }
        setErrormsg(true)  
      }
    } else {
      alert(
        "Password must be at least 8 characters and include a lowercase letter, uppercase letter, number, and symbol.\n" +
          "Username can only contain letters and numbers.",
      );

      setIsValid(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#020617] px-4">
      <div className="w-full max-w-md">
        {/* Heading */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-white">Sign up</h1>
          <p className="mt-2 text-sm text-slate-400">
            Please enter your details to create an account.
          </p>
        </div>

        {/* Form */}
        <form
          className="space-y-5"
          onSubmit={handlesignup}
          onClick={() => setIsValid(true)}
        >
          {/* Username */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Username
            </label>

            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />

              <input
                type="text"
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
                className="h-11 w-full rounded-md border border-slate-700 bg-slate-900 pl-10 pr-4 text-sm text-white outline-none placeholder:text-slate-500 focus:border-green-500"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Email
            </label>

            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />

              <input
                type="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                className="h-11 w-full rounded-md border border-slate-700 bg-slate-900 pl-10 pr-4 text-sm text-white outline-none placeholder:text-slate-500 focus:border-green-500"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Password
            </label>

            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />

              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                className="h-11 w-full rounded-md border border-slate-700 bg-slate-900 pl-10 pr-10 text-sm text-white outline-none placeholder:text-slate-500 focus:border-green-500"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          {!isValid ? (
            <p className="text-red-400 pl-1">client side : Invalid credentials</p>
          ) : (
            <span></span>
          )}
          {
            errormsg?<p className="text-red-400 pl-1">server side error</p>:<span></span>
          }

          {/* Button */}
          <button
            type={"submit"}
            className="h-11 w-full rounded-md bg-green-600 text-sm font-medium text-white transition hover:bg-green-500"
          >
            Sign up
          </button>
        </form>

        {/* Login */}
        <p className="mt-6 text-center text-sm text-slate-400">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-green-500 hover:text-green-400"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
