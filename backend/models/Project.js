import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Project title is required'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Project description is required'],
    trim: true,
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  image: {
    type: String,
    required: [true, 'Project image is required']
  },
  tags: [{
    type: String,
    trim: true
  }],
  techStack: [{
    type: String,
    trim: true
  }],
  category: {
    type: String,
    enum: ['Web', 'Mobile', 'AI/ML', 'Design', 'Other', 'Showcase'],
    default: 'Showcase'
  },
  liveUrl: {
    type: String,
    trim: true,
    default: '#'
  },
  githubUrl: {
    type: String,
    trim: true,
    default: '#'
  },
  featured: {
    type: Boolean,
    default: false
  },
  status: {
    type: String,
    enum: ['draft', 'published', 'archived'],
    default: 'published'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Index for better query performance
projectSchema.index({ category: 1 });
projectSchema.index({ featured: 1 });
projectSchema.index({ status: 1 });
projectSchema.index({ createdAt: -1 });

export const Project = mongoose.model('Project', projectSchema);
