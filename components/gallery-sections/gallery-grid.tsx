"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Play } from "lucide-react";

export interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  mediaType: "image" | "youtube" | "localVideo";
  image?: string;
  videoUrl?: string;
}

interface GalleryGridProps {
  projects: Project[];
}

export function GalleryGrid({ projects }: GalleryGridProps) {
  const [selected, setSelected] = useState<Project | null>(null);

  const renderThumbnail = (project: Project) => {
    if (project.mediaType === "youtube" && project.videoUrl) {
      const videoId = project.videoUrl.split("/embed/")[1].split("?")[0];
      return (
        <img
          src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
          alt={project.title}
          className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
        />
      );
    }

    if (project.mediaType === "localVideo" && project.videoUrl) {
      return (
        <video
          className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
          poster={project.videoUrl}
          muted
        >
          <source src={project.videoUrl} type="video/mp4" />
        </video>
      );
    }

    return (
      <img
        src={project.image!}
        alt={project.title}
        className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
      />
    );
  };

  const renderModalContent = () => {
    if (!selected) return null;

    if (selected.mediaType === "youtube") {
      return (
        <iframe
          className="w-full max-w-4xl aspect-video rounded-lg shadow-2xl"
          src={selected.videoUrl}
          title={selected.title}
          allowFullScreen
        />
      );
    }

    if (selected.mediaType === "localVideo") {
      return (
        <video className="w-full max-w-4xl rounded-lg shadow-2xl" controls>
          <source src={selected.videoUrl} type="video/mp4" />
          Your browser does not support video playback.
        </video>
      );
    }

    return (
      <motion.img
        src={selected.image}
        alt={selected.title}
        className="max-w-4xl max-h-[85vh] rounded-lg shadow-2xl"
        initial={{ scale: 0.7 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.7 }}
        transition={{ type: "spring", stiffness: 220, damping: 25 }}
      />
    );
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {projects.map((project, i) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className="group relative overflow-hidden rounded-2xl cursor-pointer shadow-xl hover:shadow-2xl"
            onClick={() => setSelected(project)}
          >
            {renderThumbnail(project)}

            {/* Play Icon Overlay (for video projects) */}
            {(project.mediaType === "youtube" || project.mediaType === "localVideo") && (
              <motion.div
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <motion.div
                  className="bg-black/50 rounded-full p-4"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Play size={36} className="text-white" />
                </motion.div>
              </motion.div>
            )}

            {/* Text Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <h3 className="text-white text-2xl font-bold">{project.title}</h3>
              <p className="text-white/80 mt-1">{project.description}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            onClick={() => setSelected(null)}
          >
            <button
              className="absolute top-6 right-6 p-2 rounded-full bg-white/20 hover:bg-white/40 transition-colors"
              onClick={() => setSelected(null)}
            >
              <X size={24} />
            </button>
            {renderModalContent()}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
