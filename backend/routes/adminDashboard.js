import express from 'express';
import { authenticateAdmin } from '../middleware/auth.js';
import { Project } from '../models/Project.js';
import { GalleryItem } from '../models/GalleryItem.js';
import { Contact } from '../models/Contact.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const [projectsCount, galleryCount, messagesCount, latestMessages] = await Promise.all([
      Project.countDocuments(),
      GalleryItem.countDocuments(),
      Contact.countDocuments(),
      Contact.find().sort({ createdAt: -1 }).limit(5).select('_id name message createdAt')
    ]);

    res.json({
      success: true,
      data: {
        totals: {
          projects: projectsCount,
          gallery: galleryCount,
          messages: messagesCount
        },
        latestMessages
      }
    });
  } catch (error) {
    console.error('Dashboard stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch dashboard stats'
    });
  }
});

export default router;
