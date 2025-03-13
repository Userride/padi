import React, { useState } from 'react';
import './DoctorProfileForm.css'; // Import your CSS file here
import profileIcon from './profile1.png'; // Importing the image

function DoctorProfileForm() {
    const [clinicCount, setClinicCount] = useState(1);

    const handleAddClinic = () => {
        setClinicCount(clinicCount + 1);
    };

    const handleImageChange = (event) => {
        const reader = new FileReader();
        reader.onload = function () {
            const preview = document.getElementById('doctor-image-preview');
            preview.src = reader.result;
            document.getElementById('upload-text').style.display = 'none';
            document.getElementById('plus-icon').style.display = 'none';
        };
        reader.readAsDataURL(event.target.files[0]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Collect form data
        const formData = new FormData(e.target);
        let emailBody = 'Doctor Profile Details:\n\n';
        for (const [key, value] of formData.entries()) {
            emailBody += `${key}: ${value}\n`;
        }

        // Construct mailto link
        const mailtoLink = `mailto:amitmandhana1@gmail.com,sekekamapal@gmail.com?subject=Doctor Profile Submission&body=${encodeURIComponent(emailBody)}`;

        // Open default email client with mailto link
        window.location.href = mailtoLink;
    };

    return (
        <div className="wrapper">
            <form onSubmit={handleSubmit}>
                <h1>Create Doctor's Profile</h1>
                <div className="image-upload">
                    <label htmlFor="doctor-image">
                        <img src={profileIcon} id="plus-icon" alt="Plus Icon" />
                        <img src="placeholder.jpg" id="doctor-image-preview" alt="" />
                        <span id="upload-text">Upload Doctor's Image</span>
                    </label>
                    <input type="file" id="doctor-image" accept="image/*" onChange={handleImageChange} />
                </div>
                <div className="input-box">
                    <input type="text" name="doctorName" placeholder="Doctor's Name" required />
                    <box-icon type='solid' name='user'></box-icon>
                </div>
                <div className="input-box">
                    <input type="text" name="registrationNumber" placeholder="Doctor's Registration Number" required />
                </div>
                <div className="input-box">
                    <input type="text" name="qualification" placeholder="Doctor's Qualification" required />
                </div>
                <div className="input-box">
                    <input type="text" name="specialization" placeholder="Doctor's Specialization" required />
                </div>
                <div className="input-box">
                    <input type="tel" name="contactNumber1" placeholder="Contact Number 1" required />
                </div>
                <div className="input-box">
                    <input type="tel" name="contactNumber2" placeholder="Contact Number 2" />
                </div>
                <div className="input-box">
                    <input type="tel" name="whatsappNumber" placeholder="WhatsApp Number" />
                </div>
                <div className="input-box">
                    <input type="email" name="emailAddress" placeholder="Email Address" />
                </div>
                <div className="input-box">
                    <input type="text" name="medicalCouncil" placeholder="Recognised Medical Council" />
                </div>
                <div className="clinic-group">
                    <div className="input-box">
                        <select name="clinic1" id="clinic-dropdown-1" className="clinic-dropdown" required>
                            <option value="" disabled selected>Select Clinic</option>
                            <option value="Kolkata">Kolkata Clinic</option>
                            <option value="Arambagh">Arambagh Clinic</option>
                            <option value="Bangalore">Bangalore Clinic</option>
                            <option value="Chennai">Chennai Clinic</option>
                            <option value="Mumbai">Mumbai Clinic</option>
                            <option value="Delhi">Delhi Clinic</option>
                        </select>
                    </div>
                    <div className="input-box">
                        <input type="tel" name="consultationFees1" placeholder="Consultation Fees Clinic 1" />
                    </div>
                </div>
                {[...Array(clinicCount)].map((_, index) => (
                    <div className="clinic-group" key={index}>
                        <div className="input-box">
                            <select name={`clinic${index + 2}`} id={`clinic-dropdown-${index + 2}`} className="clinic-dropdown" required>
                                <option value="" disabled selected>Select Clinic</option>
                                <option value="Kolkata">Kolkata Clinic</option>
                                <option value="Arambagh">Arambagh Clinic</option>
                                <option value="Bangalore">Bangalore Clinic</option>
                                <option value="Chennai">Chennai Clinic</option>
                                <option value="Mumbai">Mumbai Clinic</option>
                                <option value="Delhi">Delhi Clinic</option>
                            </select>
                        </div>
                        <div className="input-box">
                            <input type="tel" name={`consultationFees${index + 2}`} placeholder={`Consultation Fees Clinic ${index + 2}`} />
                        </div>
                    </div>
                ))}
                <div className="add-clinic" onClick={handleAddClinic}>
                    <i className='bx bx-plus-circle'></i>
                    <span>Add More Clinic Information</span>
                </div>
                <button type="submit" className="btn">Submit</button>
            </form>
        </div>
    );
}

export default DoctorProfileForm;
