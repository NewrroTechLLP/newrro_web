"use client"

import type React from "react"

import { useState } from "react"
import { Search, ArrowUpDown, X, SlidersHorizontal, ChevronDown } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import { Badge } from "@/components/ui/badge"

interface FiltersSearchProps {
  onSearchChange?: (value: string) => void
  onFilter?: () => void
  onSort?: () => void
}

export function FiltersSearchSection({ onSearchChange, onFilter, onSort }: FiltersSearchProps) {
  const [searchValue, setSearchValue] = useState("")
  const [showFilters, setShowFilters] = useState(false)
  const [activeFilters, setActiveFilters] = useState<string[]>([])
  const [showSortOptions, setShowSortOptions] = useState(false)
  const [selectedSort, setSelectedSort] = useState<string | null>(null)

  const categories = ["Business Solutions", "IoT Devices", "Security", "Analytics", "Cloud Services", "Development"]
  const priceRanges = ["Under $300", "$300-$500", "$500-$800", "$800-$1000", "Over $1000"]
  const sortOptions = ["Price: Low to High", "Price: High to Low", "Newest First", "Most Popular", "Best Rated"]

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)
    onSearchChange && onSearchChange(e.target.value)
  }

  const clearSearch = () => {
    setSearchValue("")
    onSearchChange && onSearchChange("")
  }

  const toggleFilter = (filter: string) => {
    setActiveFilters((prev) => (prev.includes(filter) ? prev.filter((f) => f !== filter) : [...prev, filter]))
  }

  const handleSortSelect = (option: string) => {
    setSelectedSort(option)
    setShowSortOptions(false)
    onSort && onSort()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                className="pl-10 pr-10 border-gray-200 focus:border-primary focus:ring-primary"
                value={searchValue}
                onChange={handleSearchChange}
              />
              {searchValue && (
                <motion.button
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  onClick={clearSearch}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="h-4 w-4" />
                </motion.button>
              )}
            </div>
          </div>
          <div className="flex gap-4">
            <Button
              variant="outline"
              className={showFilters ? "bg-primary text-white border-primary" : ""}
              onClick={() => setShowFilters(!showFilters)}
            >
              <SlidersHorizontal className="mr-2 h-4 w-4" />
              Filters {activeFilters.length > 0 && `(${activeFilters.length})`}
            </Button>
            <div className="relative">
              <Button
                variant="outline"
                className={showSortOptions || selectedSort ? "bg-primary text-white border-primary" : ""}
                onClick={() => setShowSortOptions(!showSortOptions)}
              >
                <ArrowUpDown className="mr-2 h-4 w-4" />
                {selectedSort || "Sort"}
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>

              <AnimatePresence>
                {showSortOptions && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg z-10 border border-gray-200"
                  >
                    <ul className="py-1">
                      {sortOptions.map((option) => (
                        <motion.li key={option} whileHover={{ backgroundColor: "#f3f4f6" }}>
                          <button
                            className={`w-full text-left px-4 py-2 text-sm ${selectedSort === option ? "text-primary font-medium" : "text-gray-700"}`}
                            onClick={() => handleSortSelect(option)}
                          >
                            {option}
                          </button>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden bg-gray-50 rounded-lg p-6 mt-2"
            >
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-medium mb-3">Categories</h3>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((category) => (
                      <motion.div key={category} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Badge
                          variant="outline"
                          className={`cursor-pointer ${
                            activeFilters.includes(category) ? "bg-primary text-white" : "bg-white hover:bg-gray-100"
                          }`}
                          onClick={() => toggleFilter(category)}
                        >
                          {category}
                        </Badge>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-3">Price Range</h3>
                  <div className="flex flex-wrap gap-2">
                    {priceRanges.map((range) => (
                      <motion.div key={range} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Badge
                          variant="outline"
                          className={`cursor-pointer ${
                            activeFilters.includes(range) ? "bg-primary text-white" : "bg-white hover:bg-gray-100"
                          }`}
                          onClick={() => toggleFilter(range)}
                        >
                          {range}
                        </Badge>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              {activeFilters.length > 0 && (
                <motion.div
                  className="mt-6 flex justify-between items-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="flex flex-wrap gap-2">
                    {activeFilters.map((filter) => (
                      <motion.div
                        key={filter}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                      >
                        <Badge className="bg-primary text-white gap-1 pl-2">
                          {filter}
                          <button
                            className="ml-1 hover:bg-primary-foreground/20 rounded-full p-0.5"
                            onClick={() => toggleFilter(filter)}
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      </motion.div>
                    ))}
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => setActiveFilters([])}>
                    Clear All
                  </Button>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

