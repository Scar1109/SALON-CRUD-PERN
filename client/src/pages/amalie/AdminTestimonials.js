import React, { useState, useEffect } from "react";
import Sidebar from "../com/admindash";
import axios from "axios";

function AdminTestimonials() {
    const [testimonials, setTestimonials] = useState([]);
    const [filteredTestimonials, setFilteredTestimonials] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    // Fetch all testimonials function
    const fetchAllTestimonials = async () => {
        try {
            const response = await axios.get("http://localhost:3001/api/testimonials");
            console.log(response.data);
            setTestimonials(response.data);
        } catch (err) {
            console.error("Error fetching testimonials:", err);
            alert("Failed to fetch testimonials. Please try again later.");
        }
    };

    // Update filtered testimonials when search term or testimonials data changes
    useEffect(() => {
        const tempList = testimonials.filter(
            (testimonial) =>
                (testimonial.id &&
                    testimonial.id
                        .toString()
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase())) || // Filter by testimonial ID
                (testimonial.description &&
                    testimonial.description
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase())) || // Filter by description
                (testimonial.rating &&
                    testimonial.rating
                        .toString()
                        .includes(searchTerm)) // Filter by rating
        );
        setFilteredTestimonials(tempList);
    }, [searchTerm, testimonials]);

    // Handle search input change
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    useEffect(() => {
        fetchAllTestimonials();
    }, []);

    // Function to convert testimonials to CSV format
    const convertToCSV = (data) => {
        if (data.length === 0) return "";

        const header = Object.keys(data[0]).join(",");
        const rows = data.map((item) =>
            Object.values(item)
                .map((value) => `"${value.toString().replace(/"/g, '""')}"`)
                .join(",")
        );
        return [header, ...rows].join("\n");
    };

    // Function to trigger CSV download
    const downloadCSV = () => {
        if (testimonials.length === 0) {
            alert("No testimonials to download.");
            return;
        }

        const csv = convertToCSV(testimonials);
        const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.setAttribute("download", "testimonials.csv");
        document.body.appendChild(a); // Append to body to work in some browsers
        a.click();
        document.body.removeChild(a); // Clean up
    };

    // Function to handle testimonial deletion
    const handleDelete = async (id) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this testimonial?"
        );
        if (confirmDelete) {
            try {
                await axios.delete(`http://localhost:3001/api/testimonials/${id}`);
                // Optimistically remove the testimonial from the state
                setTestimonials((prevTestimonials) =>
                    prevTestimonials.filter((testimonial) => testimonial.id !== id)
                );
            } catch (err) {
                console.error("Error deleting testimonial:", err);
                alert("Failed to delete testimonial. Please try again later.");
            }
        }
    };

    // Function to handle testimonial approval
    const handleApprove = async (id) => {
        try {
            await axios.put(`http://localhost:3001/api/testimonials/${id}`, {
                status: "approved",
            });
            // Optimistically update the testimonial's status in the state
            setTestimonials((prevTestimonials) =>
                prevTestimonials.map((testimonial) =>
                    testimonial.id === id
                        ? { ...testimonial, status: "approved" }
                        : testimonial
                )
            );
        } catch (err) {
            console.error("Error approving testimonial:", err);
            alert("Failed to approve testimonial. Please try again later.");
        }
    };

    return (
        <div className="flex h-screen">
            <div className="w-[20%] h-full bg-gray-800 text-white">
                <Sidebar />
            </div>
            <div className="w-[80%] h-full bg-pink-500 p-4 julius-sans-one-regular">
                <button
                    onClick={downloadCSV}
                    className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
                >
                    Download Testimonials as CSV
                </button>
                <input
                    type="text"
                    placeholder="Search by ID, description, or rating"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="p-2 mb-4 border border-gray-300 rounded"
                />
                <div>
                    {/* Display filtered testimonials */}
                    {filteredTestimonials.map((testimonial) => (
                        <div
                            key={testimonial.id}
                            className="border p-4 mb-2 bg-white rounded"
                        >
                            <h3 className="text-lg font-bold">ID: {testimonial.id}</h3>
                            <p className="text-gray-700">
                                Description: {testimonial.description}
                            </p>
                            <p className="text-gray-700">Rating: {testimonial.rating}</p>
                            <p className="text-gray-700">Status: {testimonial.status}</p>
                            <div className="mt-2">
                                <button
                                    onClick={() => handleApprove(testimonial.id)}
                                    className="bg-green-500 text-white px-4 py-2 rounded mr-2"
                                >
                                    Approve
                                </button>
                                <button
                                    onClick={() => handleDelete(testimonial.id)}
                                    className="bg-red-500 text-white px-4 py-2 rounded"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default AdminTestimonials;
