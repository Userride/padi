import React, { useEffect } from "react";
import "./Home.css";
import banner_image1 from "./images/banner_image.png"; // Rename to avoid spaces
import banner_image2 from "./images/banner_image2.png";
import banner_image3 from "./images/banner_image3.png";
import findDoctor from "./images/newdoctorimage.png"; // Rename to avoid spaces
import findClinic from "./images/newfindclinic.png";
import treatmentData from "./images/newtreatmentdata.png"; // Rename to avoid spaces
import trackAppointment from "./images/newtrackappointment.png";
import doctorInterface from "./images/newdoctorinterface.png"; // Rename to avoid spaces
import healthCoins from "./images/newhealthcoins.png";
import medicalArticle from "./images/riskanalysis.png"; // Rename to avoid spaces
import childrenWithDoctor from "./images/children picture with doctor.jpg";
import patient_list from "./images/newpatientlist.png"; // Rename to avoid spaces
import appointment from "../../../images/ba.jpg";
import ehr from "../../../images/ehr.jpg";
import children from "../../../images/children.jpg";
import hexagon from "../../../images/hexagon.jpg";
import map from "../../../images/map.jpg";
import heart from "../../../images/heart.jpg";
import AlertSlider from '../../screens/Alert'
import PatientReviews from './PatientReviews';

import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    let currentIndex = 0;
    const slides = document.querySelector(".slides");
    const totalSlides = slides.children.length;

    const showNextSlide = () => {
      currentIndex++;
      slides.style.transition = "transform 1s ease";
      slides.style.transform = `translateX(-${currentIndex * 100}%)`;

      // Loop back to the first slide seamlessly
      if (currentIndex === totalSlides - 1) {
        setTimeout(() => {
          slides.style.transition = "none";
          slides.style.transform = "translateX(0)";
          currentIndex = 0;
          // Force reflow to reset transition
          void slides.offsetWidth;
          slides.style.transition = "transform 1s ease";
        }, 1000); // This timeout should match the transition duration
      }
    };

    const interval = setInterval(showNextSlide, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  const handleNavigation = (path) => {
    if (path === "/doctor-interface") {
      navigate("/logindoctor");
    } else {
      if (!localStorage.getItem("authToken")) {
        navigate("/loginuser");
      } else {
        navigate(path);
      }
    }
  };

  //6 cards

  return (
    <div className="home">
      <AlertSlider />
      {/* <div className="banner-card">
        <img src={childrenWithDoctor} alt="Children with Doctor" />
        <div className="banner-text">
          <h1>
            India's First
            <br /> Affordable Next <br /> Generation Pediatrics
            <br /> Clinic Services
            <br />
          </h1>
          <p>
            A baby's smile is one of the <br /> most beautiful treasures in{" "}
            <br /> the world, so their happiness <br /> is most vital to us. We
            treat <br /> your child as if they were our <br /> own little
            brother or sister.
          </p>
        </div>
      </div> */}
      <div className="hero-section">
        <img
          src={childrenWithDoctor}
          alt="Children with Doctor"
          className="hero-image"
        />
        <div className="hero-overlay">
          <div className="hero-content">
            <h1 className="hero-title">
              India's First Affordable Next Generation Pediatrics Clinic Services
            </h1>
            <p className="hero-description">
              A baby's smile is one of the most beautiful treasures in the world.
              We treat your child as if they were our own family.
            </p>
            <button
              onClick={() => navigate("/loginuser")}
              className="signup-login-btn"
            >
              Get Started
            </button>
          </div>
        </div>
      </div>

      <div className="banner">
        <div className="slider">
          <div className="slides">
            <div className="slide">
              <img src={banner_image1} alt="Image 1" />
            </div>
            <div className="slide">
              <img src={banner_image2} alt="Image 2" />
            </div>
            <div className="slide">
              <img src={banner_image3} alt="Image 3" />
            </div>
            <div className="slide">
              <img src={banner_image1} alt="Image 4" />
            </div>
          </div>
        </div>
      </div>

      <div className="icon-container">
        <div className="icon" onClick={() => navigate("/finddoctor")}>
          <img src={findDoctor} alt="Doctor Icon" />
          <div className="icon-label">Find Doctor</div>
        </div>

        <div className="icon" onClick={() => navigate("/map")}>
          <img src={findClinic} alt="Clinic Icon" />
          <div className="icon-label">Book Appointment</div>
        </div>

        <div className="icon" onClick={() => handleNavigation("/profile2")}>
          <img src={treatmentData} alt="Treatment Data Icon" />
          <div className="icon-label">Your Treatment Data</div>
        </div>

        <div
          className="icon"
          onClick={() => handleNavigation("/trackAppointment")}
        >
          <img src={trackAppointment} alt="Track Appointment Icon" />
          <div className="icon-label">Track Your Appointment</div>
        </div>

        <div
          className="icon"
          onClick={() => handleNavigation("/doctor-interface")}
        >
          <img src={doctorInterface} alt="Doctor Interface Icon" />
          <div className="icon-label">Doctor's Interface</div>
        </div>
        <div className="icon" onClick={() => handleNavigation("#")}>
          <img src={patient_list} alt="Patient List" />
          <div className="icon-label">Patient List</div>
        </div>

        <div className="icon" onClick={() => handleNavigation("/healthcoins")}>
          <img src={healthCoins} alt="Health Coins Icon" />
          <div className="icon-label">Health Coins</div>
        </div>

        <div
          className="icon"
          onClick={() => handleNavigation("/medicalarticle")}
        >
          <img src={medicalArticle} alt="Medical Article Icon" />
          <div className="icon-label">Risk Factor Analysis</div>
        </div>
        <div
          style={{
            margin: "0",
            fontFamily: "Arial, sans-serif",
            backgroundColor: "#f0f8ff",
            textAlign: "center",
            color: "#003366",
            padding: "50px",
          }}
        >
          <h1
            style={{
              fontSize: "2.5em",
              fontWeight: "bold",
              color: "#00509e",
            }}
          >
            Paediprime Is The Best Place For Your Baby
          </h1>
          <p
            style={{
              fontSize: "1.2em",
              color: "#003366",
              marginTop: "10px",
            }}
          >
            If you are looking for the best care for your baby, you are at the
            right place.
          </p>
        </div>
        <div className="card-container">
          <div class="flex flex-col bg-blue-50 shadow-lg border border-blue-200 rounded-lg my-4 w-72 items-center">
            <div class="m-4 overflow-hidden rounded-full h-48 w-48 flex justify-center items-center bg-blue-100 border-4 border-blue-300">
              <img
                class="w-full h-full object-cover"
                src={appointment}
                alt="profile-picture"
              />
            </div>

            <div class="p-6 text-center bg-white rounded-b-lg">
              <p class="text-sm font-semibold text-blue-600 uppercase tracking-wide">
                Appointment Time Prediction
              </p>
              <p class="text-sm text-blue-700 mt-3 font-medium">
                Our AI algorithm predicts when you will be called based on your
                serial number and the time doctors spend with each patient.
              </p>
            </div>
          </div>

          <div class="flex flex-col bg-blue-50 shadow-lg border border-blue-200 rounded-lg my-4 w-72 items-center">
            <div class="m-4 overflow-hidden rounded-full h-48 w-48 flex justify-center items-center bg-blue-100 border-4 border-blue-300">
              <img
                class="w-full h-full object-cover"
                src={ehr}
                alt="profile-picture"
              />
            </div>

            <div class="p-6 text-center bg-white rounded-b-lg">
              <p class="text-sm font-semibold text-blue-600 uppercase tracking-wide">
                Smart EHR tracking
              </p>
              <p class="text-sm text-blue-700 mt-3 font-medium">
                Smart EHR dashboard with risk factor analysis to detect any
                chance of developing fatal chronic diseases at earliest.
              </p>
            </div>
          </div>

          <div class="flex flex-col bg-blue-50 shadow-lg border border-blue-200 rounded-lg my-4 w-72 items-center">
            <div class="m-4 overflow-hidden rounded-full h-48 w-48 flex justify-center items-center bg-blue-100 border-4 border-blue-300">
              <img
                class="w-full h-full object-cover"
                src={heart}
                alt="profile-picture"
              />
            </div>

            <div class="p-6 text-center bg-white rounded-b-lg">
              <p class="text-sm font-semibold text-blue-600 uppercase tracking-wide">
                Screening Services
              </p>
              <p class="text-sm text-blue-700 mt-3 font-medium">
                Continuous monitoring of data retrieved from E-prescriptions,
                EHR and vaccination reports and clinical examinations to detect
                any abnormality at its earliest possible point of diagnosis and
                start preventive treatment.
              </p>
            </div>
          </div>

          <div class="flex flex-col bg-blue-50 shadow-lg border border-blue-200 rounded-lg my-4 w-72 items-center">
            <div class="m-4 overflow-hidden rounded-full h-48 w-48 flex justify-center items-center bg-blue-100 border-4 border-blue-300">
              <img
                class="w-full h-full object-cover"
                src={children}
                alt="profile-picture"
              />
            </div>

            <div class="p-6 text-center bg-white rounded-b-lg">
              <p class="text-sm font-semibold text-blue-600 uppercase tracking-wide">
                Children-Friendly Environment:
              </p>
              <p class="text-sm text-blue-700 mt-3 font-medium">
                Provide a kid-friendly play area with all the necessities to
                make every visit enjoyable and stress-free.
              </p>
            </div>
          </div>

          <div class="flex flex-col bg-blue-50 shadow-lg border border-blue-200 rounded-lg my-4 w-72 items-center">
            <div class="m-4 overflow-hidden rounded-full h-48 w-48 flex justify-center items-center bg-blue-100 border-4 border-blue-300">
              <img
                class="w-full h-full object-cover"
                src={hexagon}
                alt="profile-picture"
              />
            </div>

            <div class="p-6 text-center bg-white rounded-b-lg">
              <p class="text-sm font-semibold text-blue-600 uppercase tracking-wide">
                24/7 support:
              </p>
              <p class="text-sm text-blue-700 mt-3 font-medium">
                The clinic remains open for 24/7 emergency support and 24/7
                chatting support with experts.
              </p>
            </div>
          </div>

          <div class="flex flex-col bg-blue-50 shadow-lg border border-blue-200 rounded-lg my-4 w-72 items-center">
            <div class="m-4 overflow-hidden rounded-full h-48 w-48 flex justify-center items-center bg-blue-100 border-4 border-blue-300">
              <img
                class="w-full h-full object-cover"
                src={map}
                alt="profile-picture"
              />
            </div>

            <div class="p-6 text-center bg-white rounded-b-lg">
              <p class="text-sm font-semibold text-blue-600 uppercase tracking-wide">
                Google Map Integration:
              </p>
              <p class="text-sm text-blue-700 mt-3 font-medium">
                Shows the nearest and most conveniently reachable clinics
                according to your location
              </p>
            </div>
          </div>
        </div>
      </div>
      <PatientReviews />
      <div className="join-us">
        <p>Join us today and experience the future of healthcare.</p>
        <a href="/loginuser" className="signup-login-btn">
          Login
        </a>
      </div>
    </div>
  );
};

export default Home;
