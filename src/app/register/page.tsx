"use client";
import axios from "axios";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { ClipLoader } from "react-spinners";

const Register = () => {
  const [show, setShow] = useState(false);
  const navigate = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [user, setUser] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignUp = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("/api/auth/register", user);
      console.log(res.data);
      setLoading(false);
      setUser({ fullName: "", email: "", password: "" });
      navigate.push("/login");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div className="relative flex-1 min-h-screen flex flex-col items-center justify-center bg-linear-to-tr from-slate-950 via-slate-900 to-slate-950 text-slate-100 font-sans selection:bg-indigo-500 selection:text-white overflow-hidden py-12 px-4">
      {/* Decorative gradient background glows */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl pointer-events-none animate-pulse [animation-delay:2s]"></div>

      {/* Main content wrapper */}
      <div className="relative flex flex-col items-center z-10 w-full max-w-3xl">
        <div className="text-4xl sm:text-5xl font-extrabold tracking-tight bg-linear-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent text-center drop-shadow-sm">
          MultiVendor ECOMMERCE
        </div>

        <div className="text-slate-400 text-sm mt-3 tracking-widest uppercase font-semibold text-center mb-10">
          Create Your Account
        </div>

        {!show ? (
          <div className="flex flex-col sm:flex-row gap-5 w-full justify-center px-4">
            {[
              { label: "User", value: "User" },
              { label: "Admin", value: "Admin" },
              { label: "Vendor", value: "Vendor" },
            ].map((item) => (
              <div
                key={item.label}
                onClick={() => setShow(true)}
                className="flex-1 cursor-pointer py-8 px-6 text-center font-bold text-xl rounded-2xl bg-slate-900/40 border border-slate-800/80 backdrop-blur-md shadow-xl text-slate-300 hover:text-white hover:border-indigo-500/50 hover:bg-slate-900/70 hover:shadow-indigo-500/5 hover:-translate-y-1.5 transition-all duration-300 active:scale-98 flex flex-col items-center justify-center min-h-[140px] group relative overflow-hidden"
              >
                {/* Glow border overlay effect on hover */}
                <div className="absolute inset-0 bg-linear-to-b from-indigo-500/0 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                {/* Icon wrapper badge */}
                <div className="w-10 h-10 rounded-full bg-slate-950/60 border border-slate-850 flex items-center justify-center mb-3 group-hover:border-indigo-500/30 group-hover:bg-indigo-950/30 transition-all duration-300">
                  <span className="text-sm font-bold text-slate-400 group-hover:text-indigo-400 transition-colors duration-300">
                    {item.value[0]}
                  </span>
                </div>

                <span className="relative z-10 transition-colors duration-250">
                  {item.value}
                </span>

                <span className="text-xs font-normal text-slate-500 mt-1.5 group-hover:text-slate-400 transition-colors duration-250">
                  Join as {item.value}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className="w-full max-w-md bg-slate-900/40 backdrop-blur-xl border border-slate-800/80 rounded-3xl p-8 sm:p-10 shadow-2xl transition-all duration-300 hover:border-slate-700/50">
            <form onSubmit={handleSignUp} className="space-y-5">
              <div className="flex flex-col space-y-4">
                <div className="text-center mb-2">
                  <h3 className="text-2xl font-bold text-slate-200">
                    Register
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Please enter your credentials to register
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    required
                    placeholder="Full Name"
                    onChange={handleChange}
                    value={user.fullName}
                    className="w-full px-4 py-3 bg-slate-950/40 border border-slate-800 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-200"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    required
                    onChange={handleChange}
                    value={user.email}
                    className="w-full px-4 py-3 bg-slate-950/40 border border-slate-800 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-200"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="Password"
                      required
                      onChange={handleChange}
                      value={user.password}
                      className="w-full px-4 py-3 pr-12 bg-slate-950/40 border border-slate-800 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-200"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors cursor-pointer text-xs font-semibold select-none"
                    >
                      {showPassword ? "HIDE" : "SHOW"}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 mt-6 bg-linear-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-semibold rounded-xl shadow-lg shadow-indigo-600/30 hover:shadow-indigo-600/40 transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                >
                  {loading ? <ClipLoader size={20} /> : "Register"}
                </button>

                <div className="relative flex py-2 items-center">
                  <div className="grow border-t border-slate-800/80"></div>
                  <span className="shrink mx-4 text-xs text-slate-500 font-semibold uppercase tracking-wider">
                    or
                  </span>
                  <div className="grow border-t border-slate-800/80"></div>
                </div>

                <button
                  onClick={() => signIn("google", { callbackUrl: "/" })}
                  type="button"
                  className="w-full py-3.5 px-4 bg-slate-950/60 hover:bg-slate-950/80 border border-slate-800 hover:border-slate-700/60 rounded-xl text-sm font-semibold text-slate-200 hover:text-white flex items-center justify-center gap-3 transition-all duration-300 shadow-md cursor-pointer hover:-translate-y-0.5 active:translate-y-0"
                >
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                      fill="#EA4335"
                    />
                  </svg>
                  Continue With Google
                </button>

                <p className="mt-6 text-center text-sm text-slate-400">
                  Already Have an Account? Try{" "}
                  <span
                    onClick={() => navigate.push("/login")}
                    className="font-semibold text-indigo-400 hover:text-indigo-300 transition-colors duration-250 cursor-pointer underline decoration-indigo-500/30 underline-offset-4 hover:decoration-indigo-400/80"
                  >
                    Login
                  </span>
                </p>

                <button
                  type="button"
                  onClick={() => setShow(false)}
                  className="mt-6 text-xs font-semibold text-slate-450 hover:text-slate-355 transition-all duration-200 cursor-pointer flex items-center justify-center gap-1.5 self-center hover:-translate-x-0.5"
                >
                  ← Back to Selection
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Register;
