import React, { useState } from "react";
import {Flex, Rate } from 'antd';
import logo from "../../images/logo.jpeg";
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Icon } from '@iconify/react'

const desc = ['Terrible', 'Bad', 'Normal', 'Good', 'Wonderful'];

function TestimonialCard({testimonial}) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [value, setValue] = useState(0);

     // Define the handleEdit function
    const handleEdit = () => {
        setIsModalOpen(true); // Open the modal
    };
    // Function to toggle confirmation dialog
    const toggleConfirm = () => {
        setIsConfirmOpen(!isConfirmOpen);
    };
    // Define the handleDelete function
    const handleDelete = () => {
        // Define what should happen on delete confirmation
        console.log('Delete icon clicked');
        toggleConfirm(); // Close the confirmation dialog after deletion
    };
    // Toggle modal visibility
    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    return (
        <div className="flex border border-gray-300 hover:bg-pink-200 rounded-lg overflow-hidden shadow-lg">
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
                    <p className="ml-3 mb-2">7-08-2024</p>
                    </div>
                    <div className="ml-2 mt-2">
                        
                        <Rate disabled defaultValue={testimonial.rating} />
                        <div className="flex flex-row -ml-6">
                        <FaEdit 
                            className="text-black cursor-pointer hover:text-gray-700 ml-28 mt-3" 
                            onClick={handleEdit} 
                        />
                        <FaTrash
                            className="text-black cursor-pointer hover:text-gray-700 mt-3 ml-2"
                            onClick={handleDelete}
                        />
                        </div>
                    </div>
                </div>
                <div>
                    <h className="ml-2 mt-2 font-bold">{testimonial.title}</h>
                    <p className="ml-3 mt-2">{testimonial.description}</p>
                </div>
            </div>
            {/* Modal component */}
            {isModalOpen && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-50 backdrop-blur-sm"
                    onClick={toggleModal}
                >
                    <div
                        className="relative p-4 w-full max-w-2xl max-h-full rounded-lg shadow-lg"
                        style={{ backgroundColor: '#e3cdd8', opacity: 0.8 }}
                        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
                    >
                        {/* Modal header */}
                        <div className="flex items-center justify-between p-4 border-b rounded-t">
                            <div className="flex flex-col items-center">
                                <h3 className="text-xl font-semibold text-gray-900 ml-24 mb-4 -mt-6 font-extrabold">Rate Our Beauty Salon</h3>
                                <p className="ml-20">We highly value your opinion. Feel free to share your experience.</p>
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
                                Update
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Confirmation Dialog */}
            {isConfirmOpen && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-50 backdrop-blur-sm"
                    onClick={toggleConfirm}
                >
                    <div
                        className="relative p-4 w-full max-w-sm rounded-lg bg-white shadow-lg"
                        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the dialog
                    >
                        <div className="flex flex-col items-center">
                            <p className="text-gray-900 mb-4">Are you sure you want to delete this testimonial?</p>
                            <div className="flex justify-end">
                                <button
                                    onClick={handleDelete}
                                    className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
                                >
                                    Yes
                                </button>
                                <button
                                    onClick={toggleConfirm}
                                    className="ml-2 bg-gray-300 hover:bg-gray-400 text-gray-900 px-4 py-2 rounded-lg"
                                >
                                    No
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default TestimonialCard;
