import db from "../db.js";

const getAllTestimonials = async () => {
      const records = await db.query("SELECT * FROM testimonials");
      return records.rows;
};

const getTestimonialById = async (id) => {
      const record = await db.query(
            "SELECT * FROM testimonials WHERE id = $1",
            [id]
      );
      return record.rows[0];
};

const deleteTestimonial = async (id) => {
      try {
            const result = await db.query(
                  "DELETE FROM testimonials WHERE id = $1 RETURNING *",
                  [id]
            );
            return result.rows[0]; // Return the deleted record, or null if no rows affected
      } catch (error) {
            console.error("Error deleting testimonial:", error);
            throw new Error("Error deleting testimonial");
      }
};

const addTestimonial = async (testimonialData) => {
      const { user_id, rating, description } = testimonialData;
      const result = await db.query(
            "INSERT INTO testimonials (user_id, rating, description) VALUES ($1, $2, $3) RETURNING *",
            [user_id, rating, description]
      );
      return result.rows[0];
};

const updateTestimonial = async (id, testimonialData) => {
      const { status } = testimonialData; // Extract only status from the provided data
      try {
            const result = await db.query(
                  `UPDATE testimonials
             SET status = $1, created_at = CURRENT_TIMESTAMP
             WHERE id = $2
             RETURNING *`,
                  [status, id]
            );
            return result.rows[0];
      } catch (error) {
            console.error("Error updating testimonial:", error);
            throw new Error("Error updating testimonial");
      }
};

export default {
      getAllTestimonials,
      getTestimonialById,
      deleteTestimonial,
      addTestimonial,
      updateTestimonial,
};
