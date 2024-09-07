import React from "react";
import Cookies from "js-cookie";
import logo2 from "../../images/logow.png";
import homepic5 from "../../images/d.jpg";
import { useLogout } from "../pamuditha/authUtils";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import TestimonialCard from "./TestimonialCard";

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
            document
                .getElementById(sectionId)
                .scrollIntoView({ behavior: "smooth" });
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
                                    onClick={() =>
                                        scrollToSection("home", "home")
                                    }
                                    className="julius-sans-one-regular text-white hover:bg-pink-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                                >
                                    Home
                                </button>
                                <button
                                    onClick={() =>
                                        scrollToSection("gallery", "home")
                                    }
                                    className="julius-sans-one-regular text-white hover:bg-pink-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                                >
                                    Gallery
                                </button>
                                <button
                                    onClick={() =>
                                        scrollToSection("testimonials", "home")
                                    }
                                    className="julius-sans-one-regular text-white hover:bg-pink-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                                >
                                    Testimonials
                                </button>
                                <button
                                    onClick={() =>
                                        scrollToSection("about", "home")
                                    }
                                    className="julius-sans-one-regular text-white hover:bg-pink-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                                >
                                    About Us
                                </button>
                                <button
                                    onClick={() =>
                                        scrollToSection("profile", "home")
                                    }
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
                                    <div
                                        className="dropdown-menu"
                                        aria-labelledby="dropdown07"
                                    >
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
                    className=" h-[800px] flex flex-col space-x-5 bg-pink-500 "
                    id="testimonials"
                    style={{
                        backgroundImage: `url(${homepic5})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                        paddingTop: "100px",
                    }}
                >
                    //content
                    <div className="p-4">
                        <div className="grid grid-cols-3 gap-4">
                            {[...Array(9)].map((_, index) => (
                                <TestimonialCard key={index} />
                            ))}
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    );
}

export default TestimonialPage;
