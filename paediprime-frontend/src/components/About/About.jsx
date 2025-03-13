import React from 'react';
import "./About.css";
import Img2 from "./images/baby-with-doctor-vision.webp";
import Img1 from "./images/about-us-picture.jpg";
import Img3 from "./images/picture-happy-baby.jpg"
import video1 from "./images/video.mp4";
export default function About() {
  return (
      <div className="py-16 bg-white">
        <div className="About-container">
          <div className="container m-auto px-6 text-gray-600 md:px-12 xl:px-6">
              <div className="space-y-6 md:space-y-0 md:flex md:gap-6 lg:items-center lg:gap-12">
                  <div className="md:5/12 lg:w-6/12">
                      <img
                          src={Img1}
                          alt="image" 
                      />
                  </div>
                  <div className="md:7/12 lg:w-6/12 title">
                      <h2 className="text-2xl text-gray-900 font-bold md:text-4xl heading ">
                      India’s First Affordable Next Generation Pediatrics Clinic Services
                      </h2>
                      <p className="mt-6 text-gray-600">
                      Welcome to Paediprime, where your child's health and happiness are our top priorities. As a leading chain of pediatric clinics, we are dedicated to providing exceptional medical care tailored specifically for infants, children, and adolescents.
                      </p>
                      <p className="mt-4 text-gray-600">
                      At Paediprime, our mission is to ensure every child receives the best possible care in a nurturing and supportive environment. We understand that a child's smile is a reflection of their well-being, and we strive to make every visit a positive experience. Our team of highly skilled pediatricians and healthcare professionals are committed to delivering personalized care with compassion and expertise.
                      </p>
                  </div>

              </div>
              
          </div>

          <div className="container m-auto px-6 text-gray-600 md:px-12 xl:px-6">
              <div className=" container1 space-y-6 md:space-y-0 md:flex md:gap-6 lg:items-center lg:gap-12">
                  
                  <div className="md:7/12 lg:w-6/12 title">
                      <h2 className="text-2xl text-gray-900 font-bold md:text-4xl heading ">
                      Our Commitment :
                      </h2>
                      <p className="mt-6 text-gray-600">
                      At Paediprime, we are more than just a clinic – we are your partners in your child's health journey. We are committed to building lasting relationships with our patients and their families, fostering trust, and providing the highest standard of care. Your child's smile is the ultimate reward for us, and we work tirelessly to keep it bright and healthy
                      </p>
                      {/* <p className="mt-4 text-gray-600">
                      At Paediprime, our mission is to ensure every child receives the best possible care in a nurturing and supportive environment. We understand that a child's smile is a reflection of their well-being, and we strive to make every visit a positive experience. Our team of highly skilled pediatricians and healthcare professionals are committed to delivering personalized care with compassion and expertise.
                      </p> */}
                  </div>
                  <div className="md:5/12 lg:w-6/12">
                  <video
                src={video1}
                autoPlay
                loop
                muted 
                 />
                  </div>
              </div>
              
            </div>
          <div className="vision-banner">
                <div className="banner-image">
                    <img src={Img2}alt="Image2" />
                </div>
                <div className="vision-text">Vision<p>To be the kind of leader in the space of child health that <br></br>India has not witnessed yet, by providing next-generation<br></br> premier quality healthcare to children.</p></div>
            </div>
            <div className="mission-banner">
                
                <div className="mission-text">Mission <p>The measure of our success is in<br></br> the number of smiling faces</p></div>
                {/* <div className="mission-text-p">The measure of our success is in<br></br> the number of smiling faces</div> */}
                <div className="mission-image">
                    <img src={Img3}alt="Image3" />
                </div>
            </div>
            <div className="whychoose">
                <h1 className='hd'>Why Choose Pediprime?</h1>
                <div className="text-about-choose"><p>At our pediatric clinic, we prioritize the health and well-being of your child through our comprehensive and family-centered approach to healthcare. Our board-certified pediatricians bring extensive experience in child healthcare, ensuring that your child receives the highest standard of care. We have created a welcoming and comfortable atmosphere for both children and parents, making visits to our clinic a positive experience. Our state-of-the-art facilities are equipped with the latest medical technology, allowing for accurate diagnosis and effective treatment. We believe in treating the whole child by addressing not only their physical health but also their emotional and social well-being. Furthermore, we involve parents and caregivers in every step of the care process, ensuring that you are informed and empowered to make the best decisions for your child’s health.</p></div>
            </div>
            <div className="thank-you">Thank you for choosing Paediprime .</div>
      </div>
      </div>
      
  );
}