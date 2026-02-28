import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Clock, Eye, EyeOff } from "lucide-react";
import { useAuth } from "../context/AuthContext";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth(); // ✅ Correct hook usage

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ Auto redirect if already logged in
  // useEffect(() => {
  //   if (user) {
  //     navigate("/dashboard");
  //   }
  // }, [user, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(
        "https://time-capsule-backend-3ji4.onrender.com/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );
       console.log("Fetch request completed");
      const data = await res.json();
         console.log("LOGIN RESPONSE:", data);

      if (!res.ok) {
        alert(data.message || "Invalid credentials");
        setLoading(false);
        return;
      }

      // ✅ Save via AuthContext
      login(data);
      setTimeout(() => {
  navigate("/dashboard");
},100) 
      // navigate("/dashboard");
      
      // console.log("LOGIN RESPONSE:", data);
      // login(data.user);
      // console.log("After login, localStorage user:", localStorage.getItem("user"));
      // navigate("/dashboard");

    } catch (error) {
      console.error("Login error:", error);
      alert("Server error. Try again.");
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="relative flex min-h-screen items-center justify-center bg-black px-4 py-12 text-white">

      {/* Background */}
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,200,100,0.08)_0%,transparent_50%),radial-gradient(ellipse_at_bottom_right,rgba(255,150,50,0.08)_0%,transparent_40%)]" />

      <div className="relative z-10 w-full max-w-md">

        {/* Logo */}
        <div className="mb-8 flex items-center justify-center gap-2">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 hover:opacity-80"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-yellow-400/15">
              <Clock className="h-5 w-5 text-yellow-400" />
            </div>
            <span className="font-serif text-xl font-bold">
              TimeCapsule
            </span>
          </button>
        </div>

        {/* Card */}
        <div className="rounded-2xl border border-gray-800 bg-gray-900/70 p-8 shadow-2xl backdrop-blur-xl">
          <div className="mb-6 text-center">
            <h1 className="font-serif text-2xl font-bold">
              Welcome Back
            </h1>
            <p className="mt-2 text-sm text-gray-400">
              Sign in to access your time capsules
            </p>
          </div>

          <form className="flex flex-col gap-4" onSubmit={handleLogin}>

            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs text-gray-400">
                Email
              </label>
              <input
                type="email"
                required
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-11 rounded-xl border border-gray-700 bg-black px-4 text-sm focus:border-yellow-400 focus:outline-none"
              />
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs text-gray-400">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-11 w-full rounded-xl border border-gray-700 bg-black px-4 pr-11 text-sm focus:border-yellow-400 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              
              className="mt-2 h-11 rounded-xl bg-gradient-to-r from-yellow-400 to-orange-500 font-semibold text-black transition hover:brightness-110 disabled:opacity-50"
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </form>

          {/* Link */}
          <p className="mt-6 text-center text-sm text-gray-400">
            Don't have an account?{" "}
            <button
              onClick={() => navigate("/signup")}
              className="text-yellow-400 hover:text-orange-400"
            >
              Create account
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;