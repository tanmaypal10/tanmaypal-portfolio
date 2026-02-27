import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import SectionHeading from "@/components/SectionHeading";
import ImageGrid from "@/components/ImageGrid";
import { Loader2, Image as ImageIcon } from "lucide-react";
import { useRealTimeUpdates } from "@/hooks/useRealTimeUpdates";

interface GalleryItem {
  _id: string;
  title: string;
  category: string;
  filePath: string;
  fileName: string;
  createdAt: string;
}

const fetchGalleryItems = async (): Promise<GalleryItem[]> => {
  try {
    console.log('Fetching gallery items from: http://localhost:5001/api/gallery');
    const response = await fetch('http://localhost:5001/api/gallery');
    
    console.log('Response status:', response.status);
    console.log('Response headers:', response.headers);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Response error:', errorText);
      throw new Error(`HTTP ${response.status}: ${errorText}`);
    }
    
    const data = await response.json();
    console.log('Gallery data received:', data);
    
    if (!data.success) {
      throw new Error(data.message || 'Failed to load gallery items');
    }
    
    return data.data;
  } catch (error) {
    console.error('Error in fetchGalleryItems:', error);
    throw error;
  }
};

const Gallery = () => {
  // Enable real-time updates
  useRealTimeUpdates();
  
  const { data: galleryItems = [], isLoading, error, refetch } = useQuery({
    queryKey: ['gallery'],
    queryFn: fetchGalleryItems,
    refetchOnWindowFocus: false,
    retry: 1
  });

  // Test API connectivity
  const testApi = async () => {
    try {
      const response = await fetch('http://localhost:5001/api/health');
      const data = await response.json();
      console.log('Health check:', data);
    } catch (error) {
      console.error('Health check failed:', error);
    }
  };

  useEffect(() => {
    testApi();
  }, []);

  // Convert backend items to ImageGrid format
  const galleryImages = galleryItems.map(item => ({
    src: `http://localhost:5001${item.filePath}`,
    alt: item.title || 'Gallery Image',
    category: item.category || 'General'
  }));

  if (isLoading) {
    return (
      <main className="pt-20">
        <section className="section-padding bg-card/50">
          <div className="container-custom">
            <div className="flex items-center justify-center min-h-[400px]">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center gap-4"
              >
                <Loader2 className="w-12 h-12 animate-spin text-primary" />
                <p className="text-muted-foreground">Loading gallery...</p>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
    );
  }

  if (error) {
    return (
      <main className="pt-20">
        <section className="section-padding bg-card/50">
          <div className="container-custom">
            <div className="flex items-center justify-center min-h-[400px]">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center gap-4 text-center max-w-md"
              >
                <ImageIcon className="w-12 h-12 text-muted-foreground" />
                <p className="text-muted-foreground">Failed to load gallery</p>
                <p className="text-xs text-muted-foreground font-mono bg-card p-2 rounded">
                  {error instanceof Error ? error.message : 'Unknown error'}
                </p>
                <button
                  onClick={() => refetch()}
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Try Again
                </button>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="pt-20">
      {/* Header */}
      <section className="section-padding bg-card/50">
        <div className="container-custom">
          <SectionHeading
            title="Gallery"
            subtitle="A visual showcase of my work, designs, and creative explorations."
          />
          {galleryItems.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-6 text-center"
            >
              <p className="text-sm text-muted-foreground">
                Showing {galleryItems.length} image{galleryItems.length !== 1 ? 's' : ''}
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Image Grid */}
      <section className="section-padding pt-0">
        <div className="container-custom">
          {galleryImages.length > 0 ? (
            <ImageGrid images={galleryImages} />
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <ImageIcon className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">No images yet</h3>
              <p className="text-muted-foreground">
                Gallery images will appear here once uploaded by the admin.
              </p>
            </motion.div>
          )}
        </div>
      </section>
    </main>
  );
};

export default Gallery;
