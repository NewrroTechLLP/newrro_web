"use client";

import { useState } from "react";
import { HeroSection } from "@/components/gallery-sections/hero-section";
import { CategoryTabs } from "@/components/gallery-sections/category-tabs";
import { GalleryGrid } from "@/components/gallery-sections/gallery-grid";
// ✅ IMPORTANT: import your segmented toggle
// Adjust the path as needed in your project
import { NewrroSegmentedToggle } from "@/components/ui/NewrroSegmentedToggle";

// ------------------
// Data Model + Projects
// ------------------
interface Project {
  id: number;
  title: string;
  category: string;
  subCategory?: string; // "images" | "video" (or others)
  description: string;
  mediaType?: "image" | "youtube" | "localVideo";
  image?: string;
  videoUrl?: string;
}

const projects: Project[] = [
  // -- ARJUNA (Images) --
  {
    id: 1,
    title: "Arjuna Robot",
    category: "Arjuna",
    subCategory: "images",
    image:
      "https://github.com/ayushanand2003/Newrro-production-build/blob/main/public/assets/work_gallery/R11.png?raw=true",
    description: "Arjuna Robot Photoshoot",
  },
  {
    id: 2,
    title: "Arjuna Robot",
    category: "Arjuna",
    subCategory: "images",
    image:
      "https://github.com/ayushanand2003/Newrro-production-build/blob/main/public/assets/work_gallery/R2.png?raw=true",
    description: "Arjuna Robot Photoshoot",
  },
  {
    id: 3,
    title: "Arjuna Robot",
    category: "Arjuna",
    subCategory: "images",
    image:
      "https://github.com/ayushanand2003/Newrro-production-build/blob/main/public/assets/work_gallery/R3.png?raw=true",
    description: "Arjuna Robot Photoshoot",
  },
  {
    id: 4,
    title: "Arjuna Robot",
    category: "Arjuna",
    subCategory: "images",
    image:
      "https://github.com/ayushanand2003/Newrro-production-build/blob/main/public/assets/work_gallery/R5.png?raw=true",
    description: "Arjuna Robot Photoshoot",
  },
  {
    id: 5,
    title: "Arjuna Robot",
    category: "Arjuna",
    subCategory: "images",
    image:
      "https://github.com/ayushanand2003/Newrro-production-build/blob/main/public/assets/work_gallery/R6.png?raw=true",
    description: "Arjuna Robot Testing",
  },

  // -- ARJUNA (Video) --
  {
    id: 28,
    title: "Arjuna Arena",
    category: "Arjuna",
    subCategory: "video",
    mediaType: "youtube",
    videoUrl: "https://www.youtube.com/embed/S0YzsqLivvM?si=bGw_vFYqFyXrJypY",
    description: "Click to Watch Arjuna in Playground",
  },

  // -- EXPO (Images) --
  {
    id: 10,
    title: "Emerge Event",
    category: "Expo",
    subCategory: "images",
    image:
      "https://raw.githubusercontent.com/ayushanand2003/Newrro-production-build/refs/heads/main/public/assets/work_gallery/Emerge1.png",
    description: "Contemporary workspace solution",
  },
  {
    id: 11,
    title: "Emerge Event",
    category: "Expo",
    subCategory: "images",
    image:
      "https://github.com/ayushanand2003/Newrro-production-build/blob/main/public/assets/work_gallery/Emerge2.png?raw=true",
    description: "Contemporary workspace solution",
  },
  {
    id: 12,
    title: "Emerge Event",
    category: "Expo",
    subCategory: "images",
    image:
      "https://github.com/ayushanand2003/Newrro-production-build/blob/main/public/assets/work_gallery/Emerge3.png?raw=true",
    description: "Contemporary workspace solution",
  },

  // -- WORKSHOP (Images) --
  {
    id: 13,
    title: "Workshop",
    category: "Workshop",
    subCategory: "images",
    image:
      "https://github.com/ayushanand2003/Newrro-production-build/blob/main/public/assets/work_gallery/GAT.png?raw=true",
    description: "Robotic Workshop for students at GAT",
  },
  {
    id: 14,
    title: "Workshop",
    category: "Workshop",
    subCategory: "images",
    image:
      "https://github.com/ayushanand2003/Newrro-production-build/blob/main/public/assets/work_gallery/GAT1.png?raw=true",
    description: "Robotic Workshop for students at GAT",
  },
  {
    id: 15,
    title: "Workshop",
    category: "Workshop",
    subCategory: "images",
    image:
      "https://github.com/ayushanand2003/Newrro-production-build/blob/main/public/assets/work_gallery/GAT2.png?raw=true",
    description: "Robotic Workshop for students at GAT",
  },

  // -- UNIVERSITY (Images) --
  {
    id: 16,
    title: "University Trainings",
    category: "University",
    subCategory: "images",
    image:
      "https://github.com/ayushanand2003/Newrro-production-build/blob/main/public/assets/work_gallery/Global1.png?raw=true",
    description: "Teaching students about Robotics at Global",
  },
  {
    id: 17,
    title: "University Trainings",
    category: "University",
    subCategory: "images",
    image:
      "https://github.com/ayushanand2003/Newrro-production-build/blob/main/public/assets/work_gallery/GAT2.png?raw=true",
    description: "Teaching students about Robotics at Global",
  },
  {
    id: 18,
    title: "University Trainings",
    category: "University",
    subCategory: "images",
    image:
      "https://github.com/ayushanand2003/Newrro-production-build/blob/main/public/assets/work_gallery/Global2.png?raw=true",
    description: "Teaching students about Robotics at Global",
  },
  {
    id: 19,
    title: "University Trainings",
    category: "University",
    subCategory: "images",
    image:
      "https://github.com/ayushanand2003/Newrro-production-build/blob/main/public/assets/work_gallery/JSS1.png?raw=true",
    description: "Teaching students about Robotics at JSS",
  },
  {
    id: 20,
    title: "University Trainings",
    category: "University",
    subCategory: "images",
    image:
      "https://github.com/ayushanand2003/Newrro-production-build/blob/main/public/assets/work_gallery/JSS2.png?raw=true",
    description: "Teaching students about Robotics at JSS",
  },
  {
    id: 21,
    title: "University Trainings",
    category: "University",
    subCategory: "images",
    image:
      "https://github.com/ayushanand2003/Newrro-production-build/blob/main/public/assets/work_gallery/JSS3.png?raw=true",
    description: "Teaching students about Robotics at JSS",
  },
  {
    id: 22,
    title: "University Trainings",
    category: "University",
    subCategory: "images",
    image:
      "https://github.com/ayushanand2003/Newrro-production-build/blob/main/public/assets/work_gallery/SMVIT1.png?raw=true",
    description: "Teaching students about Robotics at SMVIT",
  },
  {
    id: 23,
    title: "University Trainings",
    category: "University",
    subCategory: "images",
    image:
      "https://github.com/ayushanand2003/Newrro-production-build/blob/main/public/assets/work_gallery/SMVIT2.png?raw=true",
    description: "Teaching students about Robotics at SMVIT",
  },
  {
    id: 24,
    title: "University Trainings",
    category: "University",
    subCategory: "images",
    image:
      "https://github.com/ayushanand2003/Newrro-production-build/blob/main/public/assets/work_gallery/SMVIT3.png?raw=true",
    description: "Teaching students about Robotics at SMVIT",
  },
  {
    id: 25,
    title: "University Trainings",
    category: "University",
    subCategory: "images",
    image:
      "https://github.com/ayushanand2003/Newrro-production-build/blob/main/public/assets/work_gallery/reva2.png?raw=true",
    description: "Teaching students about Robotics at Reva",
  },
  {
    id: 26,
    title: "University Trainings",
    category: "University",
    subCategory: "images",
    image:
      "https://github.com/ayushanand2003/Newrro-production-build/blob/main/public/assets/work_gallery/reva1.JPG?raw=true",
    description: "Teaching students about Robotics at Reva",
  },
  {
    id: 27,
    title: "University Trainings",
    category: "University",
    subCategory: "images",
    image:
      "https://github.com/ayushanand2003/Newrro-production-build/blob/main/public/assets/work_gallery/reva3.png?raw=true",
    description: "Teaching students about Robotics at Reva",
  },
];

// ---------------------------
// The Main GalleryPage
// ---------------------------
export default function GalleryPage() {
  // Manage the main category and the sub-category
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedSubCategory, setSelectedSubCategory] = useState("all");

  // 1. Build the list of main categories
  const categories = ["all", ...Array.from(new Set(projects.map((p) => p.category)))];

  // 2. Build the sub-category list based on selected main category
  //    If "all" is selected, we won't show sub-categories
  const subCategories =
    selectedCategory === "all"
      ? []
      : [
          "all",
          ...Array.from(
            new Set(
              projects
                .filter((p) => p.category === selectedCategory)
                .map((p) => p.subCategory || "images")
            )
          ),
        ];

  // 3. Filter the projects by both main + sub category
  //    Also, default the mediaType to "image" if it's undefined
  const filteredProjects = projects
    .filter((p) => {
      const mainMatch = selectedCategory === "all" || p.category === selectedCategory;
      const subMatch =
        selectedSubCategory === "all" || (p.subCategory || "images") === selectedSubCategory;
      return mainMatch && subMatch;
    })
    .map((project) => ({
      ...project,
      mediaType: project.mediaType || "image", // default missing mediaType to "image"
    }));

  return (
    <div className="min-h-screen bg-background">
      <HeroSection />

      <div className="container mx-auto px-4 py-16 relative">
        {/* 1. Main category tabs (unchanged) */}
        <CategoryTabs
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={(cat) => {
            setSelectedCategory(cat);
            // Reset subCategory whenever main category changes
            setSelectedSubCategory("all");
          }}
        />

        {/* 2. If main category != "all", show a segmented toggle for sub-categories */}
        {selectedCategory !== "all" && subCategories.length > 0 && (
          <div className="flex justify-center my-8">
            <NewrroSegmentedToggle
              options={subCategories}
              selected={selectedSubCategory}
              onChange={(val) => setSelectedSubCategory(val)}
            />
          </div>
        )}

        {/* 3. Render the final filtered projects */}
        <GalleryGrid projects={filteredProjects} />
      </div>
    </div>
  );
}
