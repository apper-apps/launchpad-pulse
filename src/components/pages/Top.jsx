import { useState } from 'react'
import { motion } from 'framer-motion'
import ProductFeed from '@/components/organisms/ProductFeed'
import ApperIcon from '@/components/ApperIcon'

export default function Top() {
  const [timeframe, setTimeframe] = useState('week')

  const timeframes = [
    { key: 'day', label: 'Today', icon: 'Calendar' },
    { key: 'week', label: 'This Week', icon: 'CalendarDays' },
    { key: 'month', label: 'This Month', icon: 'CalendarRange' }
  ]

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
          className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-accent to-success rounded-full mb-4"
        >
          <ApperIcon name="TrendingUp" className="w-8 h-8 text-white" />
        </motion.div>
        
        <div>
          <h1 className="font-display font-bold text-3xl md:text-4xl text-text-primary mb-2">
            Top Products
          </h1>
          <p className="text-text-secondary text-lg">
            The most upvoted products by timeframe
          </p>
        </div>
      </div>

      {/* Timeframe Selector */}
      <div className="flex justify-center">
        <div className="bg-surface rounded-lg p-1 shadow-card">
          {timeframes.map((tf) => (
            <button
              key={tf.key}
              onClick={() => setTimeframe(tf.key)}
              className={`
                flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200
                ${timeframe === tf.key 
                  ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-md' 
                  : 'text-text-secondary hover:text-text-primary hover:bg-gray-100'
                }
              `}
            >
              <ApperIcon name={tf.icon} className="w-4 h-4" />
              <span>{tf.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Leaderboard Header */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-gradient-to-r from-accent/5 to-success/5 rounded-lg p-4"
      >
        <div className="flex items-center justify-center space-x-4">
          <ApperIcon name="Trophy" className="w-6 h-6 text-warning" />
          <span className="font-medium text-text-primary">
            Top performers for {timeframes.find(tf => tf.key === timeframe)?.label.toLowerCase()}
          </span>
        </div>
      </motion.div>

      {/* Product Feed */}
      <ProductFeed filterType="top" />
    </motion.div>
  )
}