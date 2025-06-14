import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import { format } from 'date-fns'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'
import Badge from '@/components/atoms/Badge'
import { productService } from '@/services'

export default function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isVoting, setIsVoting] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    loadProduct()
  }, [id])

  const loadProduct = async () => {
    setLoading(true)
    setError(null)
    try {
      const result = await productService.getById(id)
      setProduct(result)
    } catch (err) {
      setError(err.message || 'Product not found')
      toast.error('Failed to load product')
    } finally {
      setLoading(false)
    }
  }

  const handleVote = async () => {
    if (isVoting || !product) return

    setIsVoting(true)
    const prevVoteCount = product.voteCount
    const prevHasVoted = product.hasVoted

    // Optimistic update
    setProduct(prev => ({
      ...prev,
      voteCount: prev.hasVoted ? Math.max(0, prev.voteCount - 1) : prev.voteCount + 1,
      hasVoted: !prev.hasVoted
    }))

    try {
      await productService.vote(product.id)
      toast.success(prevHasVoted ? 'Vote removed' : 'Thanks for your vote!', {
        position: 'top-center',
        autoClose: 2000
      })
    } catch (error) {
      // Revert optimistic update
      setProduct(prev => ({
        ...prev,
        voteCount: prevVoteCount,
        hasVoted: prevHasVoted
      }))
      toast.error('Failed to vote. Please try again.')
    } finally {
      setIsVoting(false)
    }
  }

  const handleVisitProduct = () => {
    if (product?.url) {
      window.open(product.url, '_blank')
    }
  }

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center space-x-4">
          <div className="w-6 h-6 bg-gray-200 rounded animate-pulse" />
          <div className="w-32 h-4 bg-gray-200 rounded animate-pulse" />
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="w-full h-64 bg-gray-200 rounded-lg animate-pulse" />
            <div className="flex space-x-2">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="w-16 h-16 bg-gray-200 rounded-lg animate-pulse" />
              ))}
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="h-8 bg-gray-200 rounded w-3/4 animate-pulse" />
            <div className="h-6 bg-gray-200 rounded w-1/2 animate-pulse" />
            <div className="h-32 bg-gray-200 rounded animate-pulse" />
            <div className="flex space-x-4">
              <div className="w-32 h-12 bg-gray-200 rounded animate-pulse" />
              <div className="w-24 h-12 bg-gray-200 rounded animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="text-center py-12">
        <ApperIcon name="AlertCircle" className="w-12 h-12 text-error mx-auto mb-4" />
        <h3 className="text-lg font-medium text-text-primary mb-2">
          Product not found
        </h3>
        <p className="text-text-secondary mb-4">{error}</p>
        <button
          onClick={() => navigate('/today')}
          className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
        >
          Back to Products
        </button>
      </div>
    )
  }

  const images = product.images && product.images.length > 0 
    ? product.images 
    : ['https://images.unsplash.com/photo-1606868306217-dbf5046868d2?w=600&h=400&fit=crop']

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="max-w-4xl mx-auto space-y-6"
    >
      {/* Back Button */}
      <div className="flex items-center space-x-4">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center space-x-2 text-text-secondary hover:text-text-primary transition-colors"
        >
          <ApperIcon name="ArrowLeft" className="w-4 h-4" />
          <span>Back</span>
        </button>
      </div>

      {/* Product Content */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Images */}
        <div className="space-y-4">
          <div className="relative">
            <motion.img
              key={currentImageIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              src={images[currentImageIndex]}
              alt={product.title}
              className="w-full h-64 md:h-80 object-cover rounded-lg"
              onError={(e) => {
                e.target.src = 'https://images.unsplash.com/photo-1606868306217-dbf5046868d2?w=600&h=400&fit=crop'
              }}
            />
            
            {images.length > 1 && (
              <>
                <button
                  onClick={() => setCurrentImageIndex(prev => 
                    prev === 0 ? images.length - 1 : prev - 1
                  )}
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-black/50 text-white rounded-full flex items-center justify-center hover:bg-black/70 transition-colors"
                >
                  <ApperIcon name="ChevronLeft" className="w-4 h-4" />
                </button>
                
                <button
                  onClick={() => setCurrentImageIndex(prev => 
                    prev === images.length - 1 ? 0 : prev + 1
                  )}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-black/50 text-white rounded-full flex items-center justify-center hover:bg-black/70 transition-colors"
                >
                  <ApperIcon name="ChevronRight" className="w-4 h-4" />
                </button>
              </>
            )}
          </div>
          
          {images.length > 1 && (
            <div className="flex space-x-2 overflow-x-auto scrollbar-hide">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                    index === currentImageIndex ? 'border-primary' : 'border-gray-200'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.title} ${index + 1}`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1606868306217-dbf5046868d2?w=80&h=80&fit=crop'
                    }}
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1 min-w-0">
                <h1 className="font-display font-bold text-2xl md:text-3xl text-text-primary break-words">
                  {product.title}
                </h1>
                <p className="text-text-secondary text-lg mt-2 break-words">
                  {product.tagline}
                </p>
              </div>
              
              {/* Vote Button */}
              <div className="flex-shrink-0 ml-4">
                <motion.div whileTap={{ scale: 0.95 }}>
                  <Button
                    variant="vote"
                    size="vote"
                    onClick={handleVote}
                    disabled={isVoting}
                    className={`
                      ${product.hasVoted ? 'vote-gradient' : 'bg-gradient-to-r from-primary to-secondary'}
                      ${isVoting ? 'opacity-75' : ''}
                    `}
                  >
                    <motion.div
                      animate={product.hasVoted ? { rotate: [0, -10, 10, 0] } : {}}
                      transition={{ duration: 0.3 }}
                    >
                      <ApperIcon name="ChevronUp" className="w-5 h-5" />
                    </motion.div>
                    <motion.span
                      key={product.voteCount}
                      initial={{ scale: 1.2, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="text-sm font-bold mt-1"
                    >
                      {product.voteCount}
                    </motion.span>
                  </Button>
                </motion.div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 mb-6">
              <Badge color={getColorForCategory(product.category)}>
                {product.category}
              </Badge>
              <div className="flex items-center space-x-2 text-text-muted">
                <ApperIcon name="User" className="w-4 h-4" />
                <span className="text-sm">by {product.makerName}</span>
              </div>
              <div className="flex items-center space-x-2 text-text-muted">
                <ApperIcon name="Calendar" className="w-4 h-4" />
                <span className="text-sm">
                  {format(new Date(product.launchDate), 'MMM d, yyyy')}
                </span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-display font-semibold text-lg text-text-primary mb-3">
              About this product
            </h3>
            <p className="text-text-secondary leading-relaxed break-words">
              {product.description}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              onClick={handleVisitProduct}
              className="flex-1 justify-center"
            >
              <ApperIcon name="ExternalLink" className="w-4 h-4 mr-2" />
              Visit Product
            </Button>
            
            <Button 
              variant="secondary"
              onClick={() => navigator.share?.({ 
                title: product.title, 
                url: window.location.href 
              })}
              className="sm:w-auto justify-center"
            >
              <ApperIcon name="Share" className="w-4 h-4 mr-2" />
              Share
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function getColorForCategory(category) {
  const colors = {
    'AI': '#FF6154',
    'Design': '#5139EE',
    'Mobile': '#00D4FF',
    'Analytics': '#00C896',
    'Security': '#FFB800',
    'Productivity': '#9333EA',
    'Developer Tools': '#EF4444',
    'E-commerce': '#F59E0B'
  }
  return colors[category] || '#6B7280'
}