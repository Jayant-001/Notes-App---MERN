import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Signup = () => {
  const [user, setUser] = useState({ name: "", email: "", password: ""});
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5000/api/auth/createuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    const json = await response.json();
    console.log(json);

    if(json.success) {
        localStorage.setItem("token", json.authToken);
        navigate('/')
    }
    else {
        alert('User already exists')
    }

  };

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value })
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="my-3">
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            User name
          </label>
          <input type="text" onChange={handleChange} value={user.name} required minLength={5} className="form-control" id="name" placeholder="user_123" name="name" aria-describedby="emailHelp" />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input type="email" onChange={handleChange} value={user.email} required minLength={5} className="form-control" id="email" placeholder="user@gmail.com" name="email" aria-describedby="emailHelp" />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input type="password" onChange={handleChange} value={user.password} required minLength={5} className="form-control" id="password" placeholder="abc@123!" name="password" />
        </div>

        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
    </>
  );
};
