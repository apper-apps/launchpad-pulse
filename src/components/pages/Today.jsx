import { motion } from 'framer-motion'
import { format } from 'date-fns'
import ProductFeed from '@/components/organisms/ProductFeed'
import ApperIcon from '@/components/ApperIcon'

export default function Today() {
  const today = new Date()
  const formattedDate = format(today, 'EEEE, MMMM d, yyyy')

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
          className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full mb-4"
        >
          <ApperIcon name="Calendar" className="w-8 h-8 text-white" />
        </motion.div>
        
        <div>
          <h1 className="font-display font-bold text-3xl md:text-4xl text-text-primary mb-2">
            Today's Launches
          </h1>
          <p className="text-text-secondary text-lg">
            Discover the latest products launching {formattedDate}
          </p>
        </div>
      </div>

      {/* Stats Bar */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-lg p-4"
      >
        <div className="flex items-center justify-center space-x-8 text-center">
          <div>
            <div className="font-display font-bold text-2xl text-primary">5</div>
            <div className="text-sm text-text-secondary">New Products</div>
          </div>
          <div className="w-px h-8 bg-gray-300" />
          <div>
            <div className="font-display font-bold text-2xl text-secondary">1.2k</div>
            <div className="text-sm text-text-secondary">Total Votes</div>
          </div>
          <div className="w-px h-8 bg-gray-300" />
          <div>
            <div className="font-display font-bold text-2xl text-accent">247</div>
            <div className="text-sm text-text-secondary">Active Makers</div>
          </div>
        </div>
      </motion.div>

      {/* Product Feed */}
      <ProductFeed filterType="today" />
    </motion.div>
  )
}