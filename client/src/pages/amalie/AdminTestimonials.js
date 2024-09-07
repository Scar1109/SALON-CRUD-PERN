import React from "react";
import Sidebar from '../com/admindash'; 

function AdminTestimonials() {
    return (
        <div className="flex h-screen">
            <div className="w-[20%] h-full bg-gray-800 text-white">
                <Sidebar />
            </div>
            <div className="w-[80%] h-full bg-pink-500 p-4 julius-sans-one-regular">
                //content goes here
            </div>
        </div>
    );
}

export default AdminTestimonials;
