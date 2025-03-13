import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import '../screens/Login.css';

export default function Login() {
    const [credentials, setCredentials] = useState({ parentName: "", patientName: "", email: "", password: "" });
    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("https://paediprime-4chb.onrender.com/api/loginuser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                parentName: credentials.parentName,
                patientName: credentials.patientName,
                email: credentials.email,
                password: credentials.password,
            })
        });

        const json = await response.json();
        console.log(json);

        if (!json.success) {
            alert("Enter valid credentials");
        } else {
            localStorage.setItem("authToken", json.authToken);
            localStorage.setItem("patientName", json.patientName); // Store patient's name
            console.log(localStorage.getItem("authToken"));
            alert("Login successful!");
            navigate("/");
        }
    };

    const onChange = (event) => {
        setCredentials({ ...credentials, [event.target.name]: event.target.value });
    };

    return (
        <div className='login-background'>
            <div className="wrapper">
                <form onSubmit={handleSubmit}>
                    <h1>Users Login</h1>
                    <div className="input-box2">
                        <input 
                           type="text" 
                           placeholder="Parent's Name" 
                           name="parentName"
                           value={credentials.parentName}
                           onChange={onChange}
                           required 
                        />
                        <i className='bx bxs-user'></i>
                    </div>
                    <div className="input-box">
                        <input 
                            type="text" 
                            placeholder="Patient's Name" 
                            name="patientName"
                            value={credentials.patientName}
                            onChange={onChange}
                            required 
                        />
                    </div>

                    <div className="input-box2">
                        <input 
                            type="email" 
                            placeholder="Email" 
                            name="email"
                            value={credentials.email}
                            onChange={onChange}
                            required 
                        />
                    </div>

                    <div className="input-box2">
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

                    <div className="register-link">
                        <p>Don't have an account? 
                            <Link to="/createuser">Register</Link>
                        </p>
                    </div>
                    <div className="register-link">
                        <p>Are you a doctor? 
                            <Link to="/logindoctor">Login doctor's profile</Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}