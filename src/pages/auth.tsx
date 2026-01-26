import { useState } from "react";
import { api } from "../services/api";
import burgerImg from "../assets/burger.svg";
import FoodyOrange from "../assets/logo-orange.svg";
import { useNavigate } from "react-router-dom";

export default function Auth() {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // ===== LOGIN =====
      if (mode === "login") {
        const res = await api.post("/auth/login", {
          email: form.email,
          password: form.password,
        });

        // SIMPAN TOKEN
        localStorage.setItem("token", res.data.token);

        // TRIGGER NAVBAR UPDATE
        window.dispatchEvent(new Event("auth-change"));

        // PINDAH KE HOME
        navigate("/");
        return;
      }

      // ===== REGISTER =====
      if (form.password !== form.confirmPassword) {
        setError("Password tidak sama");
        setLoading(false);
        return;
      }

      await api.post("/auth/register", {
        name: form.name,
        email: form.email,
        phone: form.phone,
        password: form.password,
      });

      alert("Register success, silakan login");
      setMode("login");
    } catch (err: any) {
      setError(err.response?.data?.message || "Terjadi kesalahan");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* IMAGE */}
      <div className="hidden md:block md:w-1/2">
        <img
          src={burgerImg}
          alt="Burger"
          className="h-full w-full object-cover"
        />
      </div>

      {/* FORM */}
      <div className="flex w-full md:w-1/2 items-center justify-center px-6">
        <div className="w-full max-w-md">
          {/* LOGO */}
          <div className="mb-6 flex items-center gap-2">
            <img src={FoodyOrange} className="h-8 w-8" />
            <span className="text-lg font-semibold">Foody</span>
          </div>

          <h1 className="text-2xl font-bold mb-1">
            {mode === "login" ? "Welcome Back" : "Create Account"}
          </h1>
          <p className="text-gray-500 mb-6">
            {mode === "login"
              ? "Good to see you again!"
              : "Sign up to get started"}
          </p>

          {/* TOGGLE */}
          <div className="flex bg-gray-100 rounded-xl p-1 mb-6">
            <button
              type="button"
              onClick={() => setMode("login")}
              className={`w-1/2 py-2 rounded-lg font-semibold ${
                mode === "login" ? "bg-white shadow" : "text-gray-500"
              }`}
            >
              Sign in
            </button>
            <button
              type="button"
              onClick={() => setMode("register")}
              className={`w-1/2 py-2 rounded-lg font-semibold ${
                mode === "register" ? "bg-white shadow" : "text-gray-500"
              }`}
            >
              Sign up
            </button>
          </div>

          {/* ERROR */}
          {error && (
            <div className="bg-red-100 text-red-600 p-3 rounded mb-4 text-sm">
              {error}
            </div>
          )}

          {/* FORM */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === "register" && (
              <input
                name="name"
                placeholder="Name"
                onChange={handleChange}
                className="w-full border rounded-xl px-4 py-3"
              />
            )}

            <input
              name="email"
              type="email"
              placeholder="Email"
              onChange={handleChange}
              required
              className="w-full border rounded-xl px-4 py-3"
            />

            {mode === "register" && (
              <input
                name="phone"
                placeholder="Phone Number"
                onChange={handleChange}
                className="w-full border rounded-xl px-4 py-3"
              />
            )}

            <input
              name="password"
              type="password"
              placeholder="Password"
              onChange={handleChange}
              required
              className="w-full border rounded-xl px-4 py-3"
            />

            {mode === "register" && (
              <input
                name="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                onChange={handleChange}
                className="w-full border rounded-xl px-4 py-3"
              />
            )}

            <button
              disabled={loading}
              className="w-full bg-red-600 text-white py-3 rounded-xl font-semibold hover:bg-red-700 disabled:opacity-50"
            >
              {loading
                ? "Loading..."
                : mode === "login"
                ? "Login"
                : "Register"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
