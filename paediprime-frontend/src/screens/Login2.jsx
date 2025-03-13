import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import '../screens/Login.css';

export default function Login() {
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "" });
    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("https://paediprime-4chb.onrender.com/api/logindoctor", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: credentials.name,
                email: credentials.email,
                password: credentials.password,
            })
        });

        const json = await response.json();
        console.log(json);

        if (!json.success) {
            alert(json.errors || "Enter valid credentials");
        } else {
            localStorage.setItem("authToken", json.authToken);
            console.log(localStorage.getItem("authToken"));
            alert("Login successful!");
            navigate("/doctor-interface");
        }
    };

    const onChange = (event) => {
        setCredentials({ ...credentials, [event.target.name]: event.target.value });
    };

    return (
        <div className="login-background">
            <div className="wrapper">
                <form onSubmit={handleSubmit}>
                    <h1>Doctor's Login</h1>
                    <div className="input-box">
                        <input
                            type="text"
                            placeholder="Name"
                            name="name"
                            value={credentials.name}
                            onChange={onChange}
                            required
                        />
                        <i className='bx bxs-user'></i>
                    </div>

                    <div className="input-box">
                        <input
                            type="email"
                            placeholder="Email"
                            name="email"
                            value={credentials.email}
                            onChange={onChange}
                            required
                        />
                    </div>

                    <div className="input-box">
                        <input
                            type="password"
                            placeholder="Password"
                            name="password"
                            value={credentials.password}
                            onChange={onChange}
                            required
                        />
                        <i className='bx bxs-lock'></i>
                    </div>

                    <div className="remember-forget">
                        <label>
                            <input type="checkbox" /> Remember me
                        </label>
                        <a href="#">Forgot Password?</a>
                    </div>

                    <button type="submit" className="btn">Login</button>
                </form>
            </div>
        </div>
    );
}