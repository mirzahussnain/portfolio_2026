import { setCredentials } from "@/src/redux/features/AuthSlice";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { cleanErrorMessage, loginUser } from "../firebase/auth";

const SignIn: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  const onSubmit = async (data: any) => {
    setLoginError(null);
    setLoading(true);

    try {
      const user = await loginUser(data.email, data.password);
      const token = await user?.getIdToken();
      if (user && token) {
        alert("Login Successful!");
        dispatch(
          setCredentials({
            user: {
              name: user?.displayName,
              email: user?.email,
            },
            token: token || null,
          })
        );
        navigateTo("/dashboard");
      }
    } catch (error) {
     
      const errorMessage = cleanErrorMessage(error.message);
     
      setLoginError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background-dark p-6 relative">
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary/5 blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-primary/10 blur-[100px]"></div>
      </div>

      <div className="relative z-10 w-full max-w-110">
        <div className="glass-card w-full rounded-2xl border border-glass-border p-8 sm:p-10 shadow-2xl">
          <div className="flex flex-col items-center mb-8 text-center">
            <div className="size-12 rounded-full bg-primary/20 flex items-center justify-center mb-4 text-primary shadow-[0_0_15px_rgba(13,185,242,0.3)]">
              <span className="material-symbols-outlined text-3xl">
                lock_person
              </span>
            </div>
            <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">
              Welcome Back
            </h1>
            <p className="text-slate-400 text-sm leading-relaxed">
              Enter your credentials to access your developer dashboard.
            </p>
          </div>

          {loginError && (
            <div className="mb-4 p-3 bg-red-500/10 border border-red-500/50 rounded-lg flex items-center gap-2">
              <span className="material-symbols-outlined text-red-500 text-sm">
                error
              </span>
              <span className="text-red-400 text-sm font-medium">
                {loginError}
              </span>
            </div>
          )}

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-5 w-full"
          >
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300 ml-1">
                Email Address
              </label>
              <div className="relative flex items-center w-full rounded-lg bg-white/5 border border-white/10 transition-colors focus-within:border-primary">
                <span className="material-symbols-outlined absolute left-4 text-slate-500 text-[20px]">
                  mail
                </span>
                <input
                  type="email"
                  {...register("email", { required: "Email is required" })}
                  className="w-full bg-transparent border-none text-white placeholder:text-slate-600 text-sm h-12 pl-12 pr-4 focus:ring-0 rounded-lg"
                  placeholder="name@example.com"
                />
              </div>
              {errors.email && (
                <span className="text-xs text-red-400">Email required</span>
              )}
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <label className="text-sm font-medium text-slate-300">
                  Password
                </label>
                <button
                  type="button"
                  className="text-xs font-medium text-primary hover:text-primary/80 transition-colors"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative flex items-center w-full rounded-lg bg-white/5 border border-white/10 transition-colors focus-within:border-primary">
                <span className="material-symbols-outlined absolute left-4 text-slate-500 text-[20px]">
                  lock
                </span>
                <input
                  type="password"
                  {...register("password", {
                    required: "Password is required",
                  })}
                  className="w-full bg-transparent border-none text-white placeholder:text-slate-600 text-sm h-12 pl-12 pr-12 focus:ring-0 rounded-lg"
                  placeholder="••••••••"
                />
              </div>
              {errors.password && (
                <span className="text-xs text-red-400">Password required</span>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`${
                loading && "opacity-50 cursor-not-allowed"
              } mt-2 w-full h-12 rounded-lg bg-primary hover:bg-[#0aa6da] text-background-dark font-bold text-sm transition-all transform active:scale-[0.98] shadow-lg shadow-primary/30 flex items-center justify-center gap-2 cursor-pointer`}
            >
              <span>{loading ? "Signing In..." : "Sign In"}</span>
              <span className="material-symbols-outlined text-[18px]">
                arrow_forward
              </span>
            </button>

            <button
              type="button"
              onClick={() => navigateTo("/#home")}
              className={`text-slate-500 text-sm font-medium hover:text-slate-300 transition-colors cursor-pointer`}
            >
              Back to Portfolio
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-white/5 text-center">
            <p className="text-xs text-slate-600">© 2026 Hussnain-Ali.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
