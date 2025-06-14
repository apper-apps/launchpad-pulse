import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import ProductSubmissionForm from '@/components/molecules/ProductSubmissionForm'
import ApperIcon from '@/components/ApperIcon'

export default function Submit() {
  const navigate = useNavigate()

  const handleSuccess = () => {
    navigate('/today')
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-8"
    >
      {/* Header */}
      <div className="text-center space-y-4">
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.1 }}
          className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-success to-accent rounded-full mb-4"
        >
          <ApperIcon name="Plus" className="w-8 h-8 text-white" />
        </motion.div>
        
        <div>
          <h1 className="font-display font-bold text-3xl md:text-4xl text-text-primary mb-2">
            Submit Your Product
          </h1>
          <p className="text-text-secondary text-lg">
            Share your creation with the LaunchPad community
          </p>
        </div>
      </div>

      {/* Guidelines */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-surface rounded-lg p-6 shadow-card border border-gray-100"
      >
        <h3 className="font-display font-semibold text-lg text-text-primary mb-4 flex items-center">
          <ApperIcon name="Lightbulb" className="w-5 h-5 mr-2 text-warning" />
          Submission Guidelines
        </h3>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <ApperIcon name="Check" className="w-5 h-5 text-success mt-0.5" />
              <div>
                <p className="font-medium text-text-primary">Be authentic</p>
                <p className="text-sm text-text-secondary">Submit your own products or with permission</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <ApperIcon name="Check" className="w-5 h-5 text-success mt-0.5" />
              <div>
                <p className="font-medium text-text-primary">Write clear descriptions</p>
                <p className="text-sm text-text-secondary">Help users understand what your product does</p>
              </div>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <ApperIcon name="Check" className="w-5 h-5 text-success mt-0.5" />
              <div>
                <p className="font-medium text-text-primary">Use quality images</p>
                <p className="text-sm text-text-secondary">Show your product in the best light</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <ApperIcon name="Check" className="w-5 h-5 text-success mt-0.5" />
              <div>
                <p className="font-medium text-text-primary">Choose the right category</p>
                <p className="text-sm text-text-secondary">Help users discover your product easily</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Submission Form */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-surface rounded-lg p-8 shadow-card border border-gray-100"
      >
        <ProductSubmissionForm onSuccess={handleSuccess} />
      </motion.div>
    </motion.div>
  )
}