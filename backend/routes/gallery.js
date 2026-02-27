import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import Joi from 'joi';
import { GalleryItem } from '../models/GalleryItem.js';
import { authenticateAdmin } from '../middleware/auth.js';
import { emitUpdate } from '../socket.js';

const router = express.Router();

const uploadDir = path.join(process.cwd(), 'uploads/gallery');
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

const gallerySchema = Joi.object({
  title: Joi.string().allow('').optional(),
  category: Joi.string().allow('').optional()
});

// GET /api/gallery - Get all gallery items
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 20, category } = req.query;
    const skip = (page - 1) * limit;

    const filter = category && category !== 'All' ? { category } : {};

    const items = await GalleryItem.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await GalleryItem.countDocuments(filter);

    res.json({
      success: true,
      data: items,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Get gallery error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve gallery items'
    });
  }
});

// POST /api/gallery - Upload new gallery item (admin only)
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { error, value } = gallerySchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Image file is required'
      });
    }

    const item = new GalleryItem({
      title: value.title || '',
      category: value.category || 'General',
      fileName: req.file.originalname,
      filePath: `/uploads/gallery/${req.file.filename}`,
      fileSize: req.file.size,
      mimeType: req.file.mimetype
    });

    await item.save();

    emitUpdate('gallery-updated', { type: 'created', item });

    res.status(201).json({
      success: true,
      message: 'Gallery item uploaded successfully',
      data: item
    });
  } catch (error) {
    console.error('Upload gallery error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to upload gallery item'
    });
  }
});

// DELETE /api/gallery/:id - Delete gallery item (admin only)
router.delete('/:id', async (req, res) => {
  try {
    const item = await GalleryItem.findByIdAndDelete(req.params.id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Gallery item not found'
      });
    }

    // Optionally delete file from filesystem
    const fullPath = path.join(process.cwd(), item.filePath);
    if (fs.existsSync(fullPath)) {
      fs.unlinkSync(fullPath);
    }

    emitUpdate('gallery-updated', { type: 'deleted', id: req.params.id });

    res.json({
      success: true,
      message: 'Gallery item deleted successfully'
    });
  } catch (error) {
    console.error('Delete gallery error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete gallery item'
    });
  }
});

export default router;
