import React from "react";

function TestimonialCard({ testimonial }) {
    return (
        <div className="flex border border-gray-300 rounded-lg overflow-hidden shadow-lg">
            {/* Image Section */}
            <img
                className="w-1/3 h-auto object-cover"
                src={testimonial.image || "default-image-url.jpg"} // Use a default image if none provided
                alt="Testimonial image"
            />
            {/* Text Section */}
            <div className="flex-1 p-4">
                <p className="text-gray-700">
                    {testimonial.description || "No testimonial text available."}
                </p>
            </div>
        </div>
    );
}

export default TestimonialCard;
