import React, { useEffect, useState } from "react";
import Sidebar from "../com/admindash"; // Import your Sidebar component
import { FaEdit, FaTrash } from "react-icons/fa";
import axios from "axios"; // Ensure axios is imported
import { useNavigate } from "react-router-dom";

const AdminTestimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [editTestimonial, setEditTestimonial] = useState(null); // State for editing testimonial
  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const [searchQuery, setSearchQuery] = useState(""); // State to control search functionality
  const navigate = useNavigate();

  // Fetch testimonial data from the backend
  // Fetch testimonial data from the backend
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/testimonials");
        console.log("Raw response:", response); // Check the raw response
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Fetched data:", data); // Inspect the full response structure
        // Adjust the path to the data based on actual API response structure
        setTestimonials(data.testimonials || data || []);
      } catch (error) {
        console.error("Error fetching testimonials:", error);
      }
    };

    fetchTestimonials();
  }, []);

  console.log("Testimonials state:", testimonials); // Check state after the effect

  // Convert testimonials to CSV format
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

  // Trigger CSV download
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

  // Handle testimonial deletion
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

  // Handle edit button click
  const handleEditClick = (testimonial) => {
    setEditTestimonial(testimonial);
    setShowModal(true);
  };

  // Handle testimonial approval
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

  // Handle input changes for editing
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditTestimonial((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle search input change
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  // Filter testimonials based on search query
  const filteredTestimonials = testimonials.filter((testimonial) =>
    testimonial.customer_email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle form submission for updating testimonial
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:3001/api/testimonials/${editTestimonial.id}`,
        {
          status: "approved", // Only update the status
        }
      );

      // Optimistically update the testimonial's status in the state
      setTestimonials((prevTestimonials) =>
        prevTestimonials.map((testimonial) =>
          testimonial.id === editTestimonial.id
            ? { ...testimonial, status: "approved" } // Update only the status
            : testimonial
        )
      );

      setShowModal(false); // Close the modal after updating
    } catch (err) {
      console.error("Error updating testimonial:", err);
      alert("Failed to approve testimonial. Please try again later.");
    }
  };

  return (
    <div className="flex h-screen">
      <div className="w-[20%] h-full bg-gray-800 text-white">
        <Sidebar />
      </div>
      <div className="w-[80%] h-full bg-pink-500 p-4 julius-sans-one-regular">
        <div className="p-6 bg-white rounded-lg shadow-md overflow-x-auto">
          <h1 className="text-3xl mb-6">Manage Testimonials</h1>

          {/* Search Bar */}
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Search Customers"
            className="mb-6 p-2 border border-gray-300 rounded w-full"
          />

          {/* Customer Rating Table */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">
              Customer Rating Table
            </h2>
            <table className="table-auto w-full bg-white shadow-md rounded-lg mb-6">
              <thead>
                <tr className="bg-gray-200">
                  <th className="py-2 px-4">Rating Id</th>
                  <th className="py-2 px-4">Rating</th>
                </tr>
              </thead>
              <tbody>
                {filteredTestimonials.length > 0 ? (
                  filteredTestimonials.map((testimonial) => (
                    <tr key={testimonial.id} className="border-b">
                      <td className="py-2 px-4 text-gray-700">
                        {testimonial.id}
                      </td>
                      <td className="py-2 px-4 text-gray-700">
                        {testimonial.rating}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td className="py-2 px-4 text-gray-700" colSpan="3">
                      No results found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Customer Feedback Table */}
          <div className="mb-6">
            <h2 className="text-lg font-bold mb-2">Customer Feedback Table</h2>
            <table className="min-w-full bg-gray-100 border border-gray-300 rounded-lg">
              <thead>
                <tr className="bg-gray-200 text-gray-600 border-b border-gray-300">
                  <th className="py-2 px-4 text-left">FeedbackID</th>
                  <th className="py-2 px-4 text-left">Customer Email</th>
                  <th className="py-2 px-4 text-left">Message</th>
                  <th className="py-2 px-4 text-left">Type</th>
                  <th className="py-2 px-4 text-left">Status</th>
                  <th className="py-2 px-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredTestimonials.map((testimonial) => (
                  <tr key={testimonial.id} className="border-b border-gray-300">
                    <td className="py-2 px-4 text-gray-700">
                      {testimonial.id}
                    </td>
                    <td className="py-2 px-4 text-gray-700">
                      {testimonial.customer_email}
                    </td>
                    <td className="py-2 px-4 text-gray-700">
                      {testimonial.message}
                    </td>
                    <td className="py-2 px-4 text-gray-700">
                      {testimonial.type}
                    </td>
                    <td className="py-2 px-4 text-gray-700">
                      {testimonial.status}
                    </td>
                    <td className="py-2 px-4">
                      <button
                        className="text-blue-500 hover:text-blue-700 mr-2"
                        aria-label="Edit"
                        onClick={() => handleEditClick(testimonial)}
                      >
                        <FaEdit />
                      </button>
                      <button
                        className="text-red-500 hover:text-red-700"
                        aria-label="Delete"
                        onClick={() => handleDelete(testimonial.id)}
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Button to download CSV */}
          <button
            onClick={downloadCSV}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Download CSV
          </button>
        </div>

        {/* Modal for editing testimonial */}
        {showModal && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl mb-4">Approve Testimonial</h2>
              <form onSubmit={handleUpdate}>
                <p>Are you sure you want to approve this testimonial?</p>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                >
                  Approve
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded"
                >
                  Cancel
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminTestimonials;
