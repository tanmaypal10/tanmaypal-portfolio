import express from 'express';
import Joi from 'joi';
import { Contact } from '../models/Contact.js';
import { sendEmail } from '../utils/email.js';
import { authenticateAdmin } from '../middleware/auth.js';

const router = express.Router();

// Validation schema
const contactSchema = Joi.object({
  name: Joi.string().min(2).max(50).required().messages({
    'string.empty': 'Name is required',
    'string.min': 'Name must be at least 2 characters',
    'string.max': 'Name cannot exceed 50 characters'
  }),
  email: Joi.string().email().required().messages({
    'string.empty': 'Email is required',
    'string.email': 'Please enter a valid email address'
  }),
  subject: Joi.string().min(5).max(100).required().messages({
    'string.empty': 'Subject is required',
    'string.min': 'Subject must be at least 5 characters',
    'string.max': 'Subject cannot exceed 100 characters'
  }),
  message: Joi.string().min(10).max(1000).required().messages({
    'string.empty': 'Message is required',
    'string.min': 'Message must be at least 10 characters',
    'string.max': 'Message cannot exceed 1000 characters'
  })
});

// POST /api/contact - Submit contact form
router.post('/', async (req, res) => {
  try {
    // Validate request body
    const { error, value } = contactSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: error.details.map(detail => ({
          field: detail.path[0],
          message: detail.message
        }))
      });
    }

    // Create new contact entry
    const contact = new Contact(value);
    await contact.save();

    // Send email notification
    try {
      await sendEmail({
        to: process.env.EMAIL_USER,
        subject: `New Contact Form: ${value.subject}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${value.name}</p>
          <p><strong>Email:</strong> ${value.email}</p>
          <p><strong>Subject:</strong> ${value.subject}</p>
          <p><strong>Message:</strong></p>
          <p>${value.message.replace(/\n/g, '<br>')}</p>
          <hr>
          <p><small>Sent at: ${new Date().toLocaleString()}</small></p>
        `
      });

      // Send confirmation email to user
      await sendEmail({
        to: value.email,
        subject: 'Thank you for contacting me - Tanmay Pal',
        html: `
          <h2>Thank you for reaching out!</h2>
          <p>Hi ${value.name},</p>
          <p>I've received your message and will get back to you as soon as possible.</p>
          <p><strong>Your message:</strong></p>
          <blockquote style="border-left: 3px solid #007bff; padding-left: 10px; margin: 10px 0;">
            ${value.message.replace(/\n/g, '<br>')}
          </blockquote>
          <p>Best regards,<br>Tanmay Pal</p>
          <hr>
          <p><small>This is an automated message. Please do not reply to this email.</small></p>
        `
      });
    } catch (emailError) {
      console.error('Email sending failed:', emailError);
      // Continue even if email fails - contact is saved
    }

    res.status(201).json({
      success: true,
      message: 'Your message has been sent successfully!'
    });

  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send message. Please try again later.'
    });
  }
});

// GET /api/contact - Get all contacts (admin only)
router.get('/', authenticateAdmin, async (req, res) => {
  try {
    const { page = 1, limit = 10, status } = req.query;
    const skip = (page - 1) * limit;

    const filter = status ? { status } : {};
    
    const contacts = await Contact.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Contact.countDocuments(filter);

    res.json({
      success: true,
      data: contacts,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Get contacts error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve contacts'
    });
  }
});

// DELETE /api/contact/:id - Delete a contact message (admin only)
router.delete('/:id', authenticateAdmin, async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Message not found'
      });
    }

    res.json({
      success: true,
      message: 'Message deleted successfully'
    });
  } catch (error) {
    console.error('Delete contact error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete message'
    });
  }
});

export default router;
