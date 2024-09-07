import React from "react";
import logo from "../../images/logo.jpeg";

function TestimonialCard() {
    return (
        <div className="flex border border-gray-300 rounded-lg overflow-hidden shadow-lg">
            {/* Image Section */}
            <img
                className="w-1/3 h-auto object-cover"
                src={logo}
                alt="Testimonial image"
            />
            {/* Text Section */}
            <div className="flex-1 p-4">
                <p className="text-gray-700">
                    "This is a testimonial text that highlights the service or
                    product experience. It's an example of how users might
                    review or comment on the service."
                </p>
            </div>
        </div>
    );
}

export default TestimonialCard;
