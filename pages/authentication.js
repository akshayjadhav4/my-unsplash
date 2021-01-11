import React, { useState } from "react";
import { useAuth } from "../utils/auth";
import Router from "next/router";

export default function Authentication() {
  const { signin, signup, loading, user } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = (e) => {
    e.preventDefault();
    signin(email, password);
  };
  const register = (e) => {
    e.preventDefault();
    signup(email, password);
  };
  if (user) {
    Router.push("/");
  }
  return (
    <div className="grid place-items-center">
      <h1 className="mt-4 font-bold text-4xl">Login</h1>
      {loading && <span className="font-semibold">Processing...</span>}
      <form>
        <label htmlFor="Label">Email</label>
        <div className="mb-3 pt-0">
          <input
            type="email"
            required
            placeholder="example@domain.com"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="px-3 py-3 placeholder-gray-400 text-gray-700 relative bg-white rounded-lg text-sm border border-gray-400 outline-none focus:outline-none focus:shadow-outline w-full sm:w-80"
          />
        </div>
        <label htmlFor="Label">Password</label>
        <div className="mb-3 pt-0">
          <input
            type="password"
            required
            placeholder="****************"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="px-3 py-3 placeholder-gray-400 text-gray-700 relative bg-white rounded-lg text-sm border border-gray-400 outline-none focus:outline-none focus:shadow-outline w-full sm:w-80"
          />
        </div>
        <button
          className="w-full bg-green-500  text-white active:bg-green-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
          type="submit"
          disabled={loading}
          onClick={login}
        >
          Login
        </button>
        <p className="text-center mt-1 mb-1">Don't have an account?</p>
        <button
          className="w-full bg-green-400 text-white active:bg-gray-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none  mb-1"
          type="submit"
          disabled={loading}
          onClick={register}
        >
          Create an account
        </button>
      </form>
    </div>
  );
}
