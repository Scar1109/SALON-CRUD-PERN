import React from "react";
import { Rate } from 'antd';
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
            <div className="flex-1 ml-1 mt-2">
                <div className="flex flex-row ml-[-7]">
                    <img class="w-10 h-10 rounded-full" src="https://cdn-icons-png.flaticon.com/256/3135/3135768.png" alt="Rounded avatar"></img>
                    <div className="flex flex-col">
                    <h className="ml-2 mt-1 text-base font-bold">Reviewer Name</h>
                    <p className="ml-3">join date</p>
                    </div>
                    <div className="ml-2 mt-2">
                        <Rate disabled defaultValue={2} />
                    </div>
                </div>
                
            </div>
        </div>
    );
}

export default TestimonialCard;
