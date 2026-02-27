import express from 'express';
import Joi from 'joi';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { Project } from '../models/Project.js';
import { authenticateAdmin } from '../middleware/auth.js';

const uploadDir = path.join(process.cwd(), 'uploads/projects');
fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, uploadDir);
  },
  filename: (_req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `${uniqueSuffix}${path.extname(file.originalname)}`);
  }
});

const upload = multer({ storage });

const router = express.Router();

// Validation schema
const projectSchema = Joi.object({
  title: Joi.string().min(2).max(100).required(),
  description: Joi.string().min(10).max(500).required(),
  techStack: Joi.string().allow('').optional(),
  tags: Joi.string().allow('').optional(),
  liveUrl: Joi.string().uri().allow('', null).optional(),
  githubUrl: Joi.string().uri().allow('', null).optional(),
  status: Joi.string().valid('draft', 'published', 'archived').optional(),
  category: Joi.string().optional(),
  featured: Joi.boolean().optional()
});

// GET /api/projects - Get all projects
router.get('/', async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 10, 
      category, 
      featured, 
      status = 'published' 
    } = req.query;
    
    const skip = (page - 1) * limit;
    
    // Build filter
    const filter = { status };
    if (category && category !== 'All') {
      filter.category = category;
    }
    if (featured === 'true') {
      filter.featured = true;
    }

    const projects = await Project.find(filter)
      .sort({ featured: -1, createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Project.countDocuments(filter);

    res.json({
      success: true,
      data: projects,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Get projects error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve projects'
    });
  }
});

// GET /api/projects/:id - Get single project
router.get('/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    res.json({
      success: true,
      data: project
    });
  } catch (error) {
    console.error('Get project error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve project'
    });
  }
});

// POST /api/projects - Create new project
router.post('/', authenticateAdmin, upload.single('image'), async (req, res) => {
  try {
    // Validate request body
    const { error, value } = projectSchema.validate(req.body);
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

    if (!req.file) {
      return res.status(400).json({ success: false, message: 'Project image is required' });
    }

    const techStack = value.techStack ? value.techStack.split(',').map(item => item.trim()).filter(Boolean) : [];
    const tags = value.tags ? value.tags.split(',').map(item => item.trim()).filter(Boolean) : [];

    const project = new Project({
      title: value.title,
      description: value.description,
      image: `/uploads/projects/${req.file.filename}`,
      techStack,
      tags,
      liveUrl: value.liveUrl || '#',
      githubUrl: value.githubUrl || '#',
      status: value.status || 'published',
      category: value.category || 'Showcase',
      featured: value.featured || false
    });
    await project.save();

    res.status(201).json({
      success: true,
      message: 'Project created successfully',
      data: project
    });
  } catch (error) {
    console.error('Create project error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create project'
    });
  }
});

// PUT /api/projects/:id - Update project
router.put('/:id', authenticateAdmin, upload.single('image'), async (req, res) => {
  try {
    // Validate request body
    const { error, value } = projectSchema.validate(req.body);
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

    const updatePayload = {
      title: value.title,
      description: value.description,
      techStack: value.techStack ? value.techStack.split(',').map(item => item.trim()).filter(Boolean) : [],
      tags: value.tags ? value.tags.split(',').map(item => item.trim()).filter(Boolean) : [],
      liveUrl: value.liveUrl || '#',
      githubUrl: value.githubUrl || '#',
      status: value.status || 'published',
      category: value.category || 'Showcase',
      featured: value.featured || false,
      updatedAt: Date.now()
    };

    if (req.file) {
      updatePayload.image = `/uploads/projects/${req.file.filename}`;
    }

    const project = await Project.findByIdAndUpdate(
      req.params.id,
      updatePayload,
      { new: true, runValidators: true }
    );

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    res.json({
      success: true,
      message: 'Project updated successfully',
      data: project
    });
  } catch (error) {
    console.error('Update project error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update project'
    });
  }
});

// DELETE /api/projects/:id - Delete project
router.delete('/:id', authenticateAdmin, async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    res.json({
      success: true,
      message: 'Project deleted successfully'
    });
  } catch (error) {
    console.error('Delete project error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete project'
    });
  }
});

export default router;
