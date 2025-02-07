import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const Login = ({ setToken }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  axios.defaults.withCredentials = true;
  const apiKey = import.meta.env.VITE_API_KEY;

  //Axios.defaults.withCredentials = true;

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post(`${apiKey}/auth/login`, { email, password })
      .then((response) => {
        if (response.data.status) {
          const to = localStorage.setItem("token", response.data.token);
          const tok = localStorage.getItem("token");

          setToken(tok);

          navigate("/dashboard");
        }
        // console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <div className="flex flex-col justify-center font-[sans-serif] sm:h-screen p-4">
        <div className="max-w-md w-full mx-auto border border-gray-300 rounded-2xl p-8">
          <div className="text-center mb-12">
            <a href="#">
              <img
                src="https://readymadeui.com/readymadeui.svg"
                alt="logo"
                className="w-40 inline-block"
              />
            </a>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <div>
                <label className="text-gray-800 text-sm mb-2 block">
                  Email Id
                </label>
                <input
                  name="email"
                  required
                  type="email"
                  className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500"
                  placeholder="Enter email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label className="text-gray-800 text-sm mb-2 block">
                  Password
                </label>
                <input
                  name="password"
                  type="password"
                  required
                  className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500"
                  placeholder="Enter password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div className="!mt-8">
              <button
                type="submit"
                className="w-full py-3 px-4 text-sm tracking-wider font-semibold rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
              >
                Login
              </button>
            </div>
            <Link
              className="bg-red-500 text-sm mt-6 font-semibold text-blue-100 text-center py-2 rounded hover:underline block"
              to={"/forgot-password"}
            >
              Forgot Password ?
            </Link>
            <p className="text-gray-800 text-sm mt-6 text-center">
              Don't have an account?{" "}
              <Link
                to={"/signup"}
                className="text-blue-600 font-semibold hover:underline ml-1"
              >
                Signup here
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
