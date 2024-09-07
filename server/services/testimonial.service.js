import db from '../db.js';

const getAllTestimonials = async () => {
    const records = await db.query("SELECT * FROM testimonials");
    return records.rows;
};

const getTestimonialById = async (id
) => {
    const record = await db.query("SELECT * FROM testimonials WHERE id = $1", [id]);
    return record.rows[0];
};

const deleteTestimonial = async (id) => {
    const affectedRows = await db.query("DELETE FROM testimonials WHERE id = $1", [id]);
    return affectedRows.rows[0];
};

const addTestimonial = async (testimonialData) => {
    const {name, testimonial} = testimonialData;
    const result = await db.query(
        "INSERT INTO testimonials (name, testimonial) VALUES ($1, $2) RETURNING *",
        [name, testimonial]
    );
    return result.rows[0];
};


export default {
    getAllTestimonials,
    getTestimonialById,
    deleteTestimonial,
    addTestimonial
};

