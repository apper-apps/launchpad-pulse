import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { motion } from 'framer-motion'
import ProductCard from '@/components/molecules/ProductCard'
import CategoryFilter from '@/components/molecules/CategoryFilter'
import ApperIcon from '@/components/ApperIcon'
import { productService, categoryService } from '@/services'

export default function ProductFeed({ 
  filterType = 'all', 
  initialProducts = null,
  showCategoryFilter = true 
}) {
  const [products, setProducts] = useState(initialProducts || [])
  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('')
  const [loading, setLoading] = useState(!initialProducts)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!initialProducts) {
      loadProducts()
    }
    loadCategories()
  }, [filterType, selectedCategory, initialProducts])

  const loadProducts = async () => {
    setLoading(true)
    setError(null)
    try {
      let result = []
      
      if (selectedCategory) {
        result = await productService.getByCategory(selectedCategory)
      } else {
        switch (filterType) {
          case 'today':
            result = await productService.getByDate(new Date())
            break
          case 'top':
            result = await productService.getTopProducts('week')
            break
          default:
            result = await productService.getAll()
        }
      }
      
      setProducts(result)
    } catch (err) {
      setError(err.message || 'Failed to load products')
      toast.error('Failed to load products')
    } finally {
      setLoading(false)
    }
  }

  const loadCategories = async () => {
    try {
      const result = await categoryService.getAll()
      setCategories(result)
    } catch (err) {
      console.error('Failed to load categories:', err)
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        {showCategoryFilter && (
          <div className="flex flex-wrap gap-2">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="w-20 h-8 bg-gray-200 rounded-full animate-pulse" />
            ))}
          </div>
        )}
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="bg-surface rounded-lg p-6 shadow-card animate-pulse">
              <div className="flex items-start space-x-4">
                <div className="w-16 h-16 bg-gray-200 rounded-lg flex-shrink-0" />
                <div className="flex-1 space-y-3">
                  <div className="h-6 bg-gray-200 rounded w-3/4" />
                  <div className="h-4 bg-gray-200 rounded w-1/2" />
                  <div className="flex items-center space-x-3">
                    <div className="h-6 bg-gray-200 rounded-full w-16" />
                    <div className="h-4 bg-gray-200 rounded w-20" />
                  </div>
                </div>
                <div className="w-20 h-16 bg-gray-200 rounded-lg flex-shrink-0" />
              </div>
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
          Failed to load products
        </h3>
        <p className="text-text-secondary mb-4">{error}</p>
        <button
          onClick={loadProducts}
          className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
        >
          Try Again
        </button>
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center"
        >
          <ApperIcon name="Package" className="w-16 h-16 text-text-muted mx-auto mb-4" />
          <h3 className="text-lg font-medium text-text-primary mb-2">
            No products found
          </h3>
          <p className="text-text-secondary mb-6">
            {selectedCategory 
              ? `No products in the ${selectedCategory} category yet.`
              : 'Be the first to launch a product today!'
            }
          </p>
          <button
            onClick={() => setSelectedCategory('')}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
          >
            {selectedCategory ? 'View All Products' : 'Submit a Product'}
          </button>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {showCategoryFilter && (
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />
      )}
      
      <div className="space-y-4">
        {products.map((product, index) => (
          <ProductCard 
            key={product.id} 
            product={product} 
            index={index}
          />
        ))}
      </div>
    </div>
  )
}