import React, { useEffect, useState } from "react";
import Sidebar from "../com/admindash"; // Import your Sidebar component
import { FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const AdminTestimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [editTestimonial, setEditTestimonial] = useState(null); // State for editing testimonial
  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const [searchQuery, setSearchQuery] = useState(""); // State to control search functionality
  const navigate = useNavigate();

  // Fetch testimonial data from the backend
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/testimonials", {
          credentials: "include",
        });
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setTestimonials(data.testimonials); // Assuming API returns a list of testimonials
      } catch (error) {
        console.error("Error fetching testimonials:", error);
      }
    };

    fetchTestimonials();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/testimonial/delete/${id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Update the state to remove the deleted testimonial from the UI
      setTestimonials(
        testimonials.filter((testimonial) => testimonial.id !== id)
      );
    } catch (error) {
      console.error("Error deleting testimonial:", error);
    }
  };

  const handleEditClick = (testimonial) => {
    setEditTestimonial(testimonial);
    setShowModal(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!editTestimonial) return;

    try {
      const response = await fetch(
        `http://localhost:3001/api/testimonial/update/${editTestimonial.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(editTestimonial),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const updatedTestimonial = await response.json();
      setTestimonials(
        testimonials.map((t) =>
          t.id === updatedTestimonial.id ? updatedTestimonial : t
        )
      );
      setShowModal(false);
    } catch (error) {
      console.error("Error updating testimonial:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditTestimonial((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredTestimonials = testimonials.filter((t) =>
    t.customerName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex h-screen">
      <div className="w-[20%] h-full bg-gray-800 text-white">
        <Sidebar />
      </div>
      <div className="w-[80%] h-full bg-pink-500 p-4 julius-sans-one-regular">
        {" "}
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
            <h2 className="text-lg font-bold mb-2">Customer Rating Table</h2>
            <table className="min-w-full bg-gray-100 border border-gray-300 rounded-lg">
              <thead>
                <tr className="bg-gray-200 text-gray-600 border-b border-gray-300">
                  <th className="py-2 px-4 text-left">RatingID</th>
                  <th className="py-2 px-4 text-left">Rating</th>
                </tr>
              </thead>
              <tbody>
                {filteredTestimonials.map((testimonial) => (
                  <tr key={testimonial.id} className="border-b border-gray-300">
                    <td className="py-2 px-4 text-gray-700">
                      {testimonial.id}
                    </td>
                    <td className="py-2 px-4 text-gray-700">
                      {testimonial.rating}
                    </td>
                  </tr>
                ))}
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
                      {testimonial.customerEmail}
                    </td>
                    <td className="py-2 px-4 text-gray-700">
                      {testimonial.feedback}
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
        </div>
        {/* Modal for editing testimonial */}
        {showModal && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl mb-4">Edit Testimonial</h2>
              <form onSubmit={handleUpdate}>
                <div className="mb-4">
                  <label htmlFor="customerName" className="block text-gray-700">
                    Customer Name
                  </label>
                  <input
                    type="text"
                    id="customerName"
                    name="customerName"
                    value={editTestimonial?.customerName || ""}
                    onChange={handleInputChange}
                    className="border border-gray-300 p-2 w-full"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="feedback" className="block text-gray-700">
                    Feedback
                  </label>
                  <input
                    type="text"
                    id="feedback"
                    name="feedback"
                    value={editTestimonial?.feedback || ""}
                    onChange={handleInputChange}
                    className="border border-gray-300 p-2 w-full"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="rating" className="block text-gray-700">
                    Rating
                  </label>
                  <input
                    type="number"
                    id="rating"
                    name="rating"
                    value={editTestimonial?.rating || ""}
                    onChange={handleInputChange}
                    className="border border-gray-300 p-2 w-full"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                >
                  Update
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
