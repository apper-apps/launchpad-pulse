import { motion } from 'framer-motion'
import Badge from '@/components/atoms/Badge'

export default function CategoryFilter({ 
  categories, 
  selectedCategory, 
  onCategoryChange,
  className = '' 
}) {
  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onCategoryChange('')}
        className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
          selectedCategory === '' 
            ? 'bg-primary text-white shadow-md' 
            : 'bg-gray-100 text-text-secondary hover:bg-gray-200'
        }`}
      >
        All
      </motion.button>
      
      {categories.map((category) => (
        <motion.button
          key={category.id}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onCategoryChange(category.slug)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
            selectedCategory === category.slug
              ? 'text-white shadow-md'
              : 'bg-gray-100 text-text-secondary hover:bg-gray-200'
          }`}
          style={selectedCategory === category.slug ? {
            backgroundColor: category.color
          } : {}}
        >
          {category.name}
        </motion.button>
      ))}
    </div>
  )
}