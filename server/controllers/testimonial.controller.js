import express from 'express';
import service from '../services/testimonial.service.js';

const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        const testimonials = await service.getAllTestimonials();
        res.send(testimonials);
    } catch (error) {
        next(error)
    }
});

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

router.delete('/:id', async (req, res, next) => {
    try {
        const affectedRows = await service.deleteTestimonial(req.params.id);
        if (affectedRows === 0) {
            res.status(404).json('No record with given id: ' + req.params.id);
        } else {
            res.send('Deleted successfully.');
        }
    } catch (error) {
        next(error)
    }
});

router.post('/', async (req, res, next) => {
    try {
        const newTestimonial = await service.addTestimonial(req.body);
        res.status(201).json(newTestimonial);
    } catch (error) {
        next(error)
    }
});

export default router;