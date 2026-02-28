import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Clock, Eye, EyeOff } from "lucide-react";

function Signup() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const res = await fetch(
        "http://localhost:5000/api/auth/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fullName,
            email,
            password,
            confirmPassword,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Signup failed");
        return;
      }

      alert("Account created successfully!");
      navigate("/login");
    } catch (error) {
      alert("Server error. Try again.");
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
              Create Account
            </h1>
            <p className="mt-2 text-sm text-gray-400">
              Start preserving your memories today
            </p>
          </div>

          <form
            className="flex flex-col gap-4"
            onSubmit={handleSignup}
          >
            {/* Full Name */}
            <input
              type="text"
              required
              placeholder="Full Name"
              value={fullName}
              onChange={(e) =>
                setFullName(e.target.value)
              }
              className="h-11 rounded-xl border border-gray-700 bg-black px-4 text-sm focus:border-yellow-400 focus:outline-none"
            />

            {/* Email */}
            <input
              type="email"
              required
              placeholder="Email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              className="h-11 rounded-xl border border-gray-700 bg-black px-4 text-sm focus:border-yellow-400 focus:outline-none"
            />

            {/* Password */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                placeholder="Password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                className="h-11 w-full rounded-xl border border-gray-700 bg-black px-4 pr-11 text-sm focus:border-yellow-400 focus:outline-none"
              />
              <button
                type="button"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>

            {/* Confirm Password */}
            <div className="relative">
              <input
                type={
                  showConfirmPassword
                    ? "text"
                    : "password"
                }
                required
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) =>
                  setConfirmPassword(
                    e.target.value
                  )
                }
                className="h-11 w-full rounded-xl border border-gray-700 bg-black px-4 pr-11 text-sm focus:border-yellow-400 focus:outline-none"
              />
              <button
                type="button"
                onClick={() =>
                  setShowConfirmPassword(
                    !showConfirmPassword
                  )
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="mt-2 h-11 rounded-xl bg-gradient-to-r from-yellow-400 to-orange-500 font-semibold text-black transition hover:brightness-110"
            >
              Create Account
            </button>
          </form>

          {/* Link */}
          <p className="mt-6 text-center text-sm text-gray-400">
            Already have an account?{" "}
            <button
              onClick={() => navigate("/login")}
              className="text-yellow-400 hover:text-orange-400"
            >
              Sign In
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;