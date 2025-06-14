import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useState } from 'react'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'
import Badge from '@/components/atoms/Badge'
import { productService } from '@/services'

export default function ProductCard({ product, index = 0 }) {
  const navigate = useNavigate()
  const [isVoting, setIsVoting] = useState(false)
  const [voteCount, setVoteCount] = useState(product.voteCount)
  const [hasVoted, setHasVoted] = useState(product.hasVoted)

  const handleVote = async (e) => {
    e.stopPropagation()
    if (isVoting) return

    setIsVoting(true)
    const prevVoteCount = voteCount
    const prevHasVoted = hasVoted

    // Optimistic update
    if (hasVoted) {
      setVoteCount(prev => Math.max(0, prev - 1))
      setHasVoted(false)
    } else {
      setVoteCount(prev => prev + 1)
      setHasVoted(true)
    }

    try {
      await productService.vote(product.id)
      toast.success(hasVoted ? 'Vote removed' : 'Thanks for your vote!', {
        position: 'top-center',
        autoClose: 2000
      })
    } catch (error) {
      // Revert optimistic update
      setVoteCount(prevVoteCount)
      setHasVoted(prevHasVoted)
      toast.error('Failed to vote. Please try again.')
    } finally {
      setIsVoting(false)
    }
  }

  const handleCardClick = () => {
    navigate(`/product/${product.id}`)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.3 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      onClick={handleCardClick}
      className="bg-surface rounded-lg shadow-card hover:shadow-card-hover 
                 transition-all duration-200 cursor-pointer overflow-hidden
                 border border-gray-100 max-w-full"
    >
      <div className="p-6">
        <div className="flex items-start space-x-4">
          {/* Product Image */}
          <div className="flex-shrink-0">
            <img
              src={product.images?.[0] || 'https://images.unsplash.com/photo-1606868306217-dbf5046868d2?w=80&h=80&fit=crop'}
              alt={product.title}
              className="w-16 h-16 rounded-lg object-cover"
              onError={(e) => {
                e.target.src = 'https://images.unsplash.com/photo-1606868306217-dbf5046868d2?w=80&h=80&fit=crop'
              }}
            />
          </div>

          {/* Product Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <h3 className="font-display font-semibold text-lg text-text-primary break-words">
                  {product.title}
                </h3>
                <p className="text-text-secondary mt-1 text-sm break-words">
                  {product.tagline}
                </p>
                
                <div className="flex items-center space-x-3 mt-3">
                  <Badge color={getColorForCategory(product.category)}>
                    {product.category}
                  </Badge>
                  <span className="text-xs text-text-muted">
                    by {product.makerName}
                  </span>
                </div>
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
                      ${hasVoted ? 'vote-gradient' : 'bg-gradient-to-r from-primary to-secondary'}
                      ${isVoting ? 'opacity-75' : ''}
                    `}
                  >
                    <motion.div
                      animate={hasVoted ? { rotate: [0, -10, 10, 0] } : {}}
                      transition={{ duration: 0.3 }}
                    >
                      <ApperIcon name="ChevronUp" className="w-4 h-4" />
                    </motion.div>
                    <motion.span
                      key={voteCount}
                      initial={{ scale: 1.2, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="text-xs font-bold mt-1"
                    >
                      {voteCount}
                    </motion.span>
                  </Button>
                </motion.div>
              </div>
            </div>
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