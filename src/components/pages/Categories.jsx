import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import ProductFeed from '@/components/organisms/ProductFeed'
import ApperIcon from '@/components/ApperIcon'
import Badge from '@/components/atoms/Badge'
import { categoryService, productService } from '@/services'

export default function Categories() {
  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    loadCategories()
  }, [])

  const loadCategories = async () => {
    setLoading(true)
    setError(null)
    try {
      const result = await categoryService.getAll()
      setCategories(result)
    } catch (err) {
      setError(err.message || 'Failed to load categories')
      toast.error('Failed to load categories')
    } finally {
      setLoading(false)
    }
  }

  const getCategoryIcon = (categoryName) => {
    const icons = {
      'AI': 'Brain',
      'Design': 'Palette',
      'Mobile': 'Smartphone',
      'Analytics': 'BarChart3',
      'Security': 'Shield',
      'Productivity': 'Zap',
      'Developer Tools': 'Code',
      'E-commerce': 'ShoppingCart'
    }
    return icons[categoryName] || 'Grid3X3'
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h1 className="font-display font-bold text-3xl md:text-4xl text-text-primary mb-2">
            Categories
          </h1>
          <p className="text-text-secondary text-lg">
            Explore products by category
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="bg-surface rounded-lg p-6 shadow-card animate-pulse">
              <div className="w-12 h-12 bg-gray-200 rounded-lg mb-4" />
              <div className="h-6 bg-gray-200 rounded w-3/4 mb-2" />
              <div className="h-4 bg-gray-200 rounded w-1/2" />
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <ApperIcon name="AlertCircle" className="w-12 h-12 text-error mx-auto mb-4" />
        <h3 className="text-lg font-medium text-text-primary mb-2">
          Failed to load categories
        </h3>
        <p className="text-text-secondary mb-4">{error}</p>
        <button
          onClick={loadCategories}
          className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
        >
          Try Again
        </button>
      </div>
    )
  }

  if (selectedCategory) {
    return (
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="space-y-6"
      >
        {/* Back Button */}
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setSelectedCategory(null)}
            className="flex items-center space-x-2 text-text-secondary hover:text-text-primary transition-colors"
          >
            <ApperIcon name="ArrowLeft" className="w-4 h-4" />
            <span>Back to Categories</span>
          </button>
        </div>

        {/* Category Header */}
        <div className="text-center space-y-4">
          <div 
            className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 text-white"
            style={{ backgroundColor: selectedCategory.color }}
          >
            <ApperIcon name={getCategoryIcon(selectedCategory.name)} className="w-8 h-8" />
          </div>
          
          <div>
            <h1 className="font-display font-bold text-3xl md:text-4xl text-text-primary mb-2">
              {selectedCategory.name}
            </h1>
            <p className="text-text-secondary text-lg">
              Products in the {selectedCategory.name} category
            </p>
          </div>
        </div>

        {/* Products */}
        <ProductFeed 
          filterType="category"
          showCategoryFilter={false}
          key={selectedCategory.slug}
        />
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="text-center space-y-4">
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.1 }}
          className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-secondary to-accent rounded-full mb-4"
        >
          <ApperIcon name="Grid3X3" className="w-8 h-8 text-white" />
        </motion.div>
        
        <div>
          <h1 className="font-display font-bold text-3xl md:text-4xl text-text-primary mb-2">
            Categories
          </h1>
          <p className="text-text-secondary text-lg">
            Explore products by category
          </p>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {categories.map((category, index) => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.3 }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            onClick={() => setSelectedCategory(category)}
            className="bg-surface rounded-lg p-6 shadow-card hover:shadow-card-hover 
                       transition-all duration-200 cursor-pointer border border-gray-100"
          >
            <div 
              className="w-12 h-12 rounded-lg flex items-center justify-center mb-4 text-white"
              style={{ backgroundColor: category.color }}
            >
              <ApperIcon name={getCategoryIcon(category.name)} className="w-6 h-6" />
            </div>
            
            <h3 className="font-display font-semibold text-lg text-text-primary mb-2">
              {category.name}
            </h3>
            
            <p className="text-text-secondary text-sm">
              Explore {category.name.toLowerCase()} products
            </p>
            
            <div className="mt-4 flex items-center justify-between">
              <Badge color={category.color} size="sm">
                View Products
              </Badge>
              <ApperIcon name="ArrowRight" className="w-4 h-4 text-text-muted" />
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}