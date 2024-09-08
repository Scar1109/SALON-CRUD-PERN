import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import logo2 from "../../images/logow.png";
import homepic5 from "../../images/d.jpg";
import { useLogout } from "../pamuditha/authUtils";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import TestimonialCard from "./TestimonialCard";
import axios from "axios";
import { Flex, Rate } from 'antd';

const desc = ['Terrible', 'Bad', 'Normal', 'Good', 'Wonderful'];

// Navbar Component
function Navbar() {
  // const [dropdownOpen, setDropdownOpen] = useState(false);
  const logout = useLogout(); // Using the custom hook
  const navigate = useNavigate();

  const [cookieExists, setCookieExists] = React.useState(false);

  React.useEffect(() => {
    const cookie = Cookies.get("diamond");
    setCookieExists(!!cookie);
  }, []);

  // Function to smoothly scroll to a section or navigate to another page
  const scrollToSection = (sectionId, pageUrl = null) => {
    if (pageUrl) {
      // Navigate to another page and scroll to the section
      window.location.href = `/${pageUrl}#${sectionId}`;
    } else {
      // Smooth scroll to the section on the same page
      document.getElementById(sectionId).scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      className="bg-black fixed top-0 left-1/2 transform -translate-x-1/2 w-[97%] z-50 shadow-md mt-2"
      style={{ borderRadius: 40 }}
    >
      <div className="w-full pr-5">
        <div className="flex flex-row h-20 justify-between">
          {/* Left side with Logo */}

          <div className="flex-shrink-0 content-start pl-4">
            <a href="/home">
              <img
                src={logo2}
                alt="Logo"
                className="h-full start content-start"
              />
            </a>
          </div>
          <div className="flex items-center content-end">
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <button
                  onClick={() => scrollToSection("home", "home")}
                  className="julius-sans-one-regular text-white hover:bg-pink-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Home
                </button>
                <button
                  onClick={() => scrollToSection("gallery", "home")}
                  className="julius-sans-one-regular text-white hover:bg-pink-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Gallery
                </button>
                <button
                  onClick={() => scrollToSection("testimonials", "home")}
                  className="julius-sans-one-regular text-white hover:bg-pink-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Testimonials
                </button>
                <button
                  onClick={() => scrollToSection("about", "home")}
                  className="julius-sans-one-regular text-white hover:bg-pink-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  About Us
                </button>
                <button
                  onClick={() => scrollToSection("profile", "home")}
                  className="julius-sans-one-regular text-white hover:bg-pink-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Profile
                </button>
                <Link
                  to="/services"
                  className="julius-sans-one-regular text-white hover:bg-red-500 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Appointments
                </Link>
                <Link
                  to="/products"
                  className="julius-sans-one-regular text-white hover:bg-red-500 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Products
                </Link>

                <div>
                  <a
                    className="nav-link text-white julius-sans-one-regular dropdown-toggle"
                    href="http://example.com"
                    id="dropdown07"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Menu
                  </a>
                  <div className="dropdown-menu" aria-labelledby="dropdown07">
                    {cookieExists ? (
                      <>
                        <a
                          className="dropdown-item julius-sans-one-regular"
                          href="#"
                        >
                          Cart
                        </a>
                        <a
                          className="dropdown-item julius-sans-one-regular"
                          href="/userp"
                        >
                          Profile
                        </a>
                        <a
                          className="dropdown-item julius-sans-one-regular"
                          href="/supporthome"
                        >
                          Support
                        </a>
                        <a
                          className="dropdown-item julius-sans-one-regular"
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            logout();
                          }}
                        >
                          Logout
                        </a>
                      </>
                    ) : (
                      <>
                        <a
                          className="dropdown-item julius-sans-one-regular"
                          href="/"
                        >
                          Login
                        </a>
                        <a
                          className="dropdown-item julius-sans-one-regular"
                          href="/register"
                        >
                          Register
                        </a>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

function TestimonialPage() {
    const [testimonials, setTestimonials] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [value, setValue] = useState();

    

  // Fetch all testimonials function
    const fetchAllTestimonials = async () => {
        try {
        const response = await axios.get(
            "http://localhost:3001/api/testimonials"
        );
        console.log(response.data);
        setTestimonials(response.data);
        } catch (err) {
        console.error("Error fetching testimonials:", err);
        }
    };

    useEffect(() => {
        fetchAllTestimonials();
    }, []);

    // Toggle modal visibility
    const toggleModal = () => {
        setIsModalOpen(prev => !prev); // Toggle modal state
    };

    return (
        <div>
        <div
            className="homepage1 felx flex-col"
            style={{ backgroundColor: "#E8ECEF", height: "100vh" }}
        >
            <div className="flex">
            <Navbar />
            </div>
            <div
            className=" h-[] flex flex-col space-x-5 bg-pink-500 "
            id="testimonials"
            style={{
                backgroundImage: `url(${homepic5})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                paddingTop: "100px",
            }}
            >
                <div>
            {/* Modal toggle button */}
            <div className="flex flex-row justify-end items-end -mt-9 -mb-6">
            <button
                onClick={toggleModal}
                className="bg-black/30 backdrop-blur-md text-white font-semibold py-2 px-6 rounded-lg shadow-lg border border-black/20 hover:bg-black/40 transition duration-300 mb-4 mt-5 mr-xl-5"
                type="button"
            >
                ADD NEW
            </button>
            </div>
            {/* Modal component */}
            {isModalOpen && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-50 backdrop-blur-sm" // Applied backdrop-blur-sm for background blur effect
                    onClick={toggleModal}
                >
                    <div
                        className="relative p-4 w-full max-w-2xl max-h-full rounded-lg shadow-lg"
                        style={{ backgroundColor: '#e3cdd8', opacity: 0.8 }} // Custom pink color with opacity
                        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
                    >
                        {/* Modal header */}
                        <div className="flex items-center justify-between p-4 border-b rounded-t">
                            <div className="flex flex-col items-center">
                                <h3 className="text-xl font-semibold text-gray-900 ml-24 mb-4 -mt-6 font-extrabold: 800">Rate Our Beauty Salon </h3>
                                <h className="ml-20">We highly value your option. Feel free to share your experience.</h>
                            </div>
                            <button
                                onClick={toggleModal}
                                className="text-black-400 hover:bg-gray-200 rounded-lg p-1"
                            >
                                <svg
                                    className="w-6 h-6"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    ></path>
                                </svg>
                            </button>
                        </div>

                        {/* Modal body */}
                        <div className="p-4">
                            <form className="p-4 md:p-5">
                                <div className="grid gap-4 mb-4 grid-cols-2">
                                <div className="col-span-2 w-1/3">
                                        <label htmlFor="rating" className="block mb-2 text-sm font-medium text-gray-900">Rate Your Choice</label>
                                        <Flex gap="middle" vertical>
                                            <Rate
                                                tooltips={desc}
                                                onChange={setValue}
                                                value={value}
                                                style={{ backgroundColor: 'white', padding: '5px', borderRadius: '5px' }} // Set background to white
                                                className="custom-rate"
                                            />
                                            {value ? <span>{desc[value - 1]}</span> : null}
                                        </Flex>
                                    </div>
                                    <div className="col-span-2">
                                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">Title</label>
                                        <input
                                            type="text"
                                            name="name"
                                            id="name"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                            placeholder="Type feedback title"
                                            required
                                        />
                                    </div>
                                    <div className="col-span-2">
                                        <label htmlFor="feedback" className="block mb-2 text-sm font-medium text-gray-900">Your Feedback</label>
                                        <textarea
                                            id="feedback"
                                            rows="4"
                                            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                                            placeholder="Write your feedback here"
                                        ></textarea>
                                    </div>
                                </div>
                            </form>
                        </div>
                        {/* Modal footer */}
                        <div className="flex items-center justify-end p-4 border-t">
                            <button
                                onClick={toggleModal}
                                className="ml-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={toggleModal}
                                className="bg-blue-700 hover:bg-blue-900 text-white px-4 py-2 rounded-lg ml-3"
                            >
                                Accept
                            </button>
                        </div>
                    </div>
                </div>
            )}
            </div>
            <div className="p-4">
                <div className="grid grid-cols-3 gap-4">
                {testimonials.map((testimonial, index) => (
                    <TestimonialCard key={index} testimonial={testimonial} />
                ))}
                </div>
            </div>
            </div>
        </div>
        </div>
    );
}

export default TestimonialPage;
