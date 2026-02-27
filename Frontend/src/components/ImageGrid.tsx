import { useState } from "react";
import { motion } from "framer-motion";
import LightboxModal from "./LightboxModal";

interface ImageItem {
  src: string;
  alt: string;
  category?: string;
}

interface ImageGridProps {
  images: ImageItem[];
}

const ImageGrid = ({ images }: ImageGridProps) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <>
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
        {images.map((image, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="break-inside-avoid"
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedImage(image.src)}
              className="relative group w-full overflow-hidden rounded-xl cursor-pointer"
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <p className="text-foreground font-medium text-sm">{image.alt}</p>
                {image.category && (
                  <p className="text-primary text-xs mt-1">{image.category}</p>
                )}
              </div>
            </motion.button>
          </motion.div>
        ))}
      </div>

      <LightboxModal
        isOpen={!!selectedImage}
        onClose={() => setSelectedImage(null)}
        imageSrc={selectedImage || ""}
      />
    </>
  );
};

export default ImageGrid;
