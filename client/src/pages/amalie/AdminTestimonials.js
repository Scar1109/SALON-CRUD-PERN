import React, { useState, useEffect } from "react";
import Sidebar from "../com/admindash";
import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa"; // Import icons if not already imported

function AdminTestimonials() {
      const [testimonials, setTestimonials] = useState([]);
      const [filteredTestimonials, setFilteredTestimonials] = useState([]);
      const [searchTerm, setSearchTerm] = useState("");
      const [showModal, setShowModal] = useState(false);
      const [selectedTestimonial, setSelectedTestimonial] = useState(null);

      // Retrieve the email from localStorage
      const customerEmail = localStorage.getItem("customerEmail");

      // Fetch all testimonials function
      const fetchAllTestimonials = async () => {
            try {
                  const response = await axios.get(
                        "http://localhost:3001/api/testimonials"
                  );
                  setTestimonials(response.data);
            } catch (err) {
                  console.error("Error fetching testimonials:", err);
                  alert(
                        "Failed to fetch testimonials. Please try again later."
                  );
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
                                    .includes(searchTerm.toLowerCase())) ||
                        (testimonial.description &&
                              testimonial.description
                                    .toLowerCase()
                                    .includes(searchTerm.toLowerCase())) ||
                        (testimonial.title &&
                              testimonial.title
                                    .toLowerCase()
                                    .includes(searchTerm.toLowerCase())) ||
                        (testimonial.status &&
                              testimonial.status
                                    .toLowerCase()
                                    .includes(searchTerm.toLowerCase())) ||
                        (testimonial.rating &&
                              testimonial.rating
                                    .toString()
                                    .includes(searchTerm))
            );
            setFilteredTestimonials(tempList);
      }, [searchTerm, testimonials]);

      // Handle search input change
      const handleSearchChange = (e) => {
            setSearchTerm(e.target.value);
      };

      // Fetch testimonials on component mount
      useEffect(() => {
            fetchAllTestimonials();
      }, []);

      // Function to convert testimonials to CSV format
      function convertToCSV(data) {
            if (data.length === 0) {
                  return ""; // Return an empty string if there's no data
            }

            // Get the headers (keys from the first object in the array)
            const headers = Object.keys(data[0]);
            const headerRow = headers.join(",");

            // Convert each row to a CSV string
            const rows = data.map((row) => {
                  return headers
                        .map((header) => {
                              const value = row[header];
                              // Convert null or undefined values to an empty string
                              return value !== null && value !== undefined
                                    ? value.toString()
                                    : "";
                        })
                        .join(",");
            });

            // Combine the header and rows into one CSV string
            return [headerRow, ...rows].join("\n");
      }

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
                        await axios.delete(
                              `http://localhost:3001/api/testimonials/${id}`
                        );
                        setTestimonials((prevTestimonials) =>
                              prevTestimonials.filter(
                                    (testimonial) => testimonial.id !== id
                              )
                        );
                  } catch (err) {
                        console.error("Error deleting testimonial:", err);
                        alert(
                              "Failed to delete testimonial. Please try again later."
                        );
                  }
            }
      };

      // Function to handle testimonial approval
      const handleApprove = async (id) => {
            try {
                  await axios.put(
                        `http://localhost:3001/api/testimonials/approve/${id}`,
                        {
                              status: "approved",
                        }
                  );
                  setTestimonials((prevTestimonials) =>
                        prevTestimonials.map((testimonial) =>
                              testimonial.id === id
                                    ? { ...testimonial, status: "approved" }
                                    : testimonial
                        )
                  );
            } catch (err) {
                  console.error("Error approving testimonial:", err);
                  alert(
                        "Failed to approve testimonial. Please try again later."
                  );
            }
      };

      // Function to handle modal submission
      const handleUpdate = async (e) => {
            e.preventDefault();
            if (selectedTestimonial) {
                  await handleApprove(selectedTestimonial.id);
                  setShowModal(false);
            }
      };

      return (
            <div className="flex h-screen">
                  <div className="w-[20%] h-full bg-gray-800 text-white">
                        <Sidebar />
                  </div>
                  <div className="w-[80%] h-full bg-pink-500 p-4 julius-sans-one-regular">
                        <div className="p-6 bg-white rounded-lg shadow-md overflow-x-auto">
                              <h1 className="text-3xl mb-6">
                                    Manage Testimonials
                              </h1>

                              {/* Search Bar */}
                              <input
                                    type="text"
                                    value={searchTerm}
                                    onChange={handleSearchChange}
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
                                                      <th className="py-2 px-4">
                                                            Rating Id
                                                      </th>
                                                      <th className="py-2 px-4">
                                                            Rating
                                                      </th>
                                                </tr>
                                          </thead>
                                          <tbody>
                                                {filteredTestimonials.length >
                                                0 ? (
                                                      filteredTestimonials.map(
                                                            (testimonial) => (
                                                                  <tr
                                                                        key={
                                                                              testimonial.id
                                                                        }
                                                                        className="border-b"
                                                                  >
                                                                        <td className="py-2 px-4 text-gray-700">
                                                                              {
                                                                                    testimonial.id
                                                                              }
                                                                        </td>
                                                                        <td className="py-2 px-4 text-gray-700">
                                                                              {
                                                                                    testimonial.rating
                                                                              }
                                                                        </td>
                                                                  </tr>
                                                            )
                                                      )
                                                ) : (
                                                      <tr>
                                                            <td
                                                                  className="py-2 px-4 text-gray-700"
                                                                  colSpan="2"
                                                            >
                                                                  No results
                                                                  found.
                                                            </td>
                                                      </tr>
                                                )}
                                          </tbody>
                                    </table>
                              </div>

                              {/* Customer Feedback Table */}
                              <div className="mb-6">
                                    <h2 className="text-lg font-bold mb-2">
                                          Customer Feedback Table
                                    </h2>
                                    <table className="min-w-full bg-gray-100 border border-gray-300 rounded-lg">
                                          <thead>
                                                <tr className="bg-gray-200 text-gray-600 border-b border-gray-300">
                                                      <th className="py-2 px-4 text-left">
                                                            FeedbackID
                                                      </th>
                                                      <th className="py-2 px-4 text-left">
                                                            Customer Email
                                                      </th>
                                                      <th className="py-2 px-4 text-left">
                                                            Title
                                                      </th>
                                                      <th className="py-2 px-4 text-left">
                                                            Message
                                                      </th>
                                                      <th className="py-2 px-4 text-left">
                                                            Status
                                                      </th>
                                                      <th className="py-2 px-4 text-left">
                                                            Actions
                                                      </th>
                                                </tr>
                                          </thead>
                                          <tbody>
                                                {filteredTestimonials.map(
                                                      (testimonial) => (
                                                            <tr
                                                                  key={
                                                                        testimonial.id
                                                                  }
                                                                  className="border-b border-gray-300"
                                                            >
                                                                  <td className="py-2 px-4 text-gray-700">
                                                                        {
                                                                              testimonial.id
                                                                        }
                                                                  </td>
                                                                  <td className="py-2 px-4 text-gray-700">
                                                                        {testimonial.customerEmail ||
                                                                              "N/A"}
                                                                  </td>
                                                                  <td className="py-2 px-4 text-gray-700">
                                                                        {
                                                                              testimonial.title
                                                                        }
                                                                  </td>
                                                                  <td className="py-2 px-4 text-gray-700">
                                                                        {
                                                                              testimonial.description
                                                                        }
                                                                  </td>
                                                                  <td className="py-2 px-4 text-gray-700">
                                                                        {
                                                                              testimonial.status
                                                                        }
                                                                  </td>
                                                                  <td className="py-2 px-4">
                                                                        <button
                                                                              className="text-blue-500 hover:text-blue-700 mr-2"
                                                                              aria-label="Edit"
                                                                              onClick={() => {
                                                                                    setSelectedTestimonial(
                                                                                          testimonial
                                                                                    );
                                                                                    setShowModal(
                                                                                          true
                                                                                    );
                                                                              }}
                                                                        >
                                                                              <FaEdit />
                                                                        </button>
                                                                        <button
                                                                              className="text-red-500 hover:text-red-700"
                                                                              aria-label="Delete"
                                                                              onClick={() =>
                                                                                    handleDelete(
                                                                                          testimonial.id
                                                                                    )
                                                                              }
                                                                        >
                                                                              <FaTrash />
                                                                        </button>
                                                                  </td>
                                                            </tr>
                                                      )
                                                )}
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
                        {showModal && selectedTestimonial && (
                              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
                                    <div className="bg-white p-6 rounded-lg shadow-lg">
                                          <h2 className="text-2xl mb-4">
                                                Approve Testimonial
                                          </h2>
                                          <form onSubmit={handleUpdate}>
                                                <p>
                                                      Are you sure you want to
                                                      approve this testimonial?
                                                </p>
                                                <button
                                                      type="submit"
                                                      className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                                                >
                                                      Approve
                                                </button>
                                                <button
                                                      type="button"
                                                      onClick={() =>
                                                            setShowModal(false)
                                                      }
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
}

export default AdminTestimonials;
