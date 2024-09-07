import express from 'express';
import service from '../services/testimonial.service.js';

const router = express.Router();

// Get all testimonials
router.get('/', async (req, res, next) => {
    try {
        const testimonials = await service.getAllTestimonials();
        res.send(testimonials);
    } catch (error) {
        next(error)
    }
});

// Get a testimonial by ID
router.get('/:id', async (req, res, next) => {
    try {
        const testimonial = await service.getTestimonialById(req.params.id);
        if (testimonial === undefined) {
            res.status(404).json('No record with given id: ' + req.params.id);
        } else {
            res.send(testimonial);
        }
    } catch (error) {
        next(error);
    }
});

// Delete a testimonial by ID
router.delete('/:id', async (req, res, next) => {
    try {
        const deletedTestimonial = await service.deleteTestimonial(req.params.id);
        if (!deletedTestimonial) {
            res.status(404).json('No record with given id: ' + req.params.id);
        } else {
            res.send('Deleted successfully.');
        }
    } catch (error) {
        next(error);
    }
});

// Add a new testimonial
router.post('/', async (req, res, next) => {
    try {
        const newTestimonial = await service.addTestimonial(req.body);
        res.status(201).json(newTestimonial);
    } catch (error) {
        next(error)
    }
});

// Update a testimonial by ID
router.put('/:id', async (req, res, next) => {
    try {
        // Only update the fields provided in the request body
        const { status } = req.body;
        const updatedTestimonial = await service.updateTestimonial(req.params.id, { status });
        if (!updatedTestimonial) {
            res.status(404).json('No record with given id: ' + req.params.id);
        } else {
            res.send(updatedTestimonial);
        }
    } catch (error) {
        next(error);
    }
});


export default router;