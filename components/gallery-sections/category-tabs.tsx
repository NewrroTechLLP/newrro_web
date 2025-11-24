"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface CategoryTabsProps {
  categories: string[];
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

export function CategoryTabs({ categories, selectedCategory, setSelectedCategory }: CategoryTabsProps) {
  return (
    <Tabs defaultValue="all" className="w-full">
      <TabsList className="flex justify-center mb-8">
        {categories.map(category => (
          <TabsTrigger
            key={category}
            value={category}
            onClick={() => setSelectedCategory(category)}
            className="capitalize"
          >
            {category}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}
