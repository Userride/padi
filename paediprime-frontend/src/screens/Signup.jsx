import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Signup.css';

export default function Signup() {
    const [credentials, setCredentials] = useState({parentName: "", patientName: "", mobile: "", email: "", password: "", confirmPassword: "" });
    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (credentials.password !== credentials.confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        if (!/^\d{10}$/.test(credentials.mobile)) {
            toast.error("Mobile number must be exactly 10 digits");
            return;
        }
        
        const response = await fetch("https://paediprime-4chb.onrender.com/api/createuser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                parentName: credentials.parentName,
                patientName: credentials.patientName,
                mobile: credentials.mobile,
                email: credentials.email,
                password: credentials.password,
            })
        });

        const json = await response.json();
        console.log(json);

        if (!json.success) {
            json.errors.forEach(error => toast.error(error.msg));
        } else {
            toast.success("OTP sent successfully!");
            setTimeout(() => {
                navigate('/loginuser');  // Navigate to the login page after a delay
            }, 2000); // 2 seconds delay
        }
    };

    const onChange = (event) => {
        setCredentials({ ...credentials, [event.target.name]: event.target.value });
    };

    return (
        <div className='signup-background'>
            <div className="wrapper">
                <form onSubmit={handleSubmit}>
                    <h1>Sign Up</h1>
                    <div className="input-box">
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
                    <div className="input-box">
                        <input 
                            type="number" 
                            placeholder="Mobile Number" 
                            name="mobile"
                            value={credentials.mobile}
                            onChange={onChange}
                            required
                        />
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
                            placeholder="Create Password" 
                            name="password"
                            value={credentials.password}
                            onChange={onChange}
                            required
                        />
                        <i className='bx bxs-lock'></i>
                    </div>
                    <div className="input-box">
                        <input 
                            type="password" 
                            placeholder="Confirm Password" 
                            name="confirmPassword"
                            value={credentials.confirmPassword}
                            onChange={onChange}
                            required
                        />
                        <i className='bx bxs-lock'></i>
                    </div>
                    <div className="remember-forget">
                        <label>
                            <input type="checkbox" required />
                            Receive relevant information from Paediprime
                        </label>
                    </div>
                    <button type="submit" className="btn">Send OTP</button>
                </form>
                <ToastContainer />
            </div>
        </div>
    );
}
