import React, { useState, useEffect } from 'react';
import "./patient.css";
import children from "../../../images/d3.jpg";
import bacchu from  "./images/bacchu.jpg";
import bacchu2 from "./images/bacchu2.jpg";
import sigmaboy from "./images/sigmaboy.jpg";
// import React, { useState, useEffect } from 'react';

const PatientReviews = () => {
  const [currentReview, setCurrentReview] = useState(0);

  const reviews = [
    {
      parentName: "Ganesh Garai",
      childName: "Suchitra Garai",
      childAge: 10,
      location: "Bankura, West Bengal",
      image: bacchu2,
      review: "We stay away from the town and taking a doctor's appointment is very hectic for us. If this kind of system is implemented it will save us a lot of time money and effort. Also we mishandled the prescriptions earlier but keeping them online seems a better option. Great work!",
      relation: "Father"
    },
    {
      parentName: "Sambhu Garai",
      childName: "Shreyashi Garai",
      childAge: 8,
      location: "Bankura, West Bengal",
      image: bacchu,
      review: "The idea is amazing especially the track your appointment feature.It was very frustrating to wait for hours for an appointment, this seems much easier.Overall this will help us a lot!",
      relation: "Father"
    },
    {
      parentName: "Priya Mondal",
      childName: "Anish Mondal",
      childAge: 5,
      location: "Kolkata, West Bengal",
      image: sigmaboy,
      review: "The teleconsultation feature helped us get quick medical advice during our child's fever at night. The doctors are very patient and understanding. Really appreciate the 24/7 support.",
      relation: "Mother"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentReview((prev) => (prev + 1) % reviews.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [reviews.length]);

  return (
    <div className="w-full bg-gradient-to-r from-blue-50 to-indigo-50 py-16">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
          What Parents Say About Us
        </h2>
        
        <div className="relative overflow-hidden">
          <div 
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentReview * 100}%)` }}
          >
            {reviews.map((review, index) => (
              <div key={index} className="w-full flex-shrink-0 px-4">
                <div className="bg-white rounded-xl shadow-lg p-8 mx-auto max-w-3xl">
                  <div className="flex items-start gap-6">
                    <div className="w-20 h-20 rounded-full overflow-hidden flex-shrink-0">
                      <img
                        src={review.image}
                        alt={review.parentName}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <div className="flex-grow">
                      <h3 className="text-xl font-bold text-gray-800">
                        {review.parentName}
                      </h3>
                      <p className="text-gray-600 mt-1">
                        {review.relation} of {review.childName}, (age - {review.childAge} yrs)
                      </p>
                      <p className="text-blue-600 font-medium mt-1">
                        {review.location}
                      </p>
                      <div className="mt-4 text-gray-700 italic leading-relaxed">
                        "{review.review}"
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Navigation Dots */}
          <div className="flex justify-center mt-8 space-x-3">
            {reviews.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentReview(index)}
                className={`w-3 h-3 rounded-full transition-colors duration-200 
                  ${currentReview === index ? 'bg-blue-600' : 'bg-gray-300'}`}
                aria-label={`Go to review ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientReviews;