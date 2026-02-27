import mongoose from 'mongoose';

const galleryItemSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      maxlength: 120,
    },
    category: {
      type: String,
      trim: true,
      default: 'General',
    },
    fileName: {
      type: String,
      required: true,
    },
    filePath: {
      type: String,
      required: true,
    },
    fileSize: {
      type: Number,
      default: 0,
    },
    mimeType: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

galleryItemSchema.index({ createdAt: -1 });

galleryItemSchema.virtual('url').get(function () {
  return this.filePath;
});

galleryItemSchema.set('toJSON', { virtuals: true });

galleryItemSchema.set('toObject', { virtuals: true });

export const GalleryItem = mongoose.model('GalleryItem', galleryItemSchema);
