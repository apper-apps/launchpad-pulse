import { useState } from 'react'
import { toast } from 'react-toastify'
import { motion } from 'framer-motion'
import Input from '@/components/atoms/Input'
import Textarea from '@/components/atoms/Textarea'
import Button from '@/components/atoms/Button'
import ApperIcon from '@/components/ApperIcon'
import { productService, categoryService } from '@/services'

export default function ProductSubmissionForm({ onSuccess }) {
  const [formData, setFormData] = useState({
    title: '',
    tagline: '',
    description: '',
    url: '',
    category: '',
    makerName: '',
    images: []
  })
  
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(false)
  const [step, setStep] = useState(1)
  const [errors, setErrors] = useState({})

  // Load categories
  React.useEffect(() => {
    const loadCategories = async () => {
      try {
        const result = await categoryService.getAll()
        setCategories(result)
      } catch (error) {
        toast.error('Failed to load categories')
      }
    }
    loadCategories()
  }, [])

  const validateStep = (stepNumber) => {
    const newErrors = {}
    
    switch (stepNumber) {
      case 1:
        if (!formData.title.trim()) newErrors.title = 'Title is required'
        if (!formData.tagline.trim()) newErrors.tagline = 'Tagline is required'
        if (!formData.description.trim()) newErrors.description = 'Description is required'
        break
      case 2:
        if (!formData.url.trim()) newErrors.url = 'Product URL is required'
        if (!formData.category) newErrors.category = 'Category is required'
        if (!formData.makerName.trim()) newErrors.makerName = 'Maker name is required'
        if (formData.url && !isValidUrl(formData.url)) {
          newErrors.url = 'Please enter a valid URL'
        }
        break
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const isValidUrl = (string) => {
    try {
      new URL(string)
      return true
    } catch (_) {
      return false
    }
  }

  const handleNext = () => {
    if (validateStep(step)) {
      setStep(step + 1)
    }
  }

  const handleBack = () => {
    setStep(step - 1)
    setErrors({})
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateStep(2)) return
    
    setLoading(true)
    try {
      const productData = {
        ...formData,
        images: formData.images.length > 0 ? formData.images : [
          'https://images.unsplash.com/photo-1606868306217-dbf5046868d2?w=400&h=300&fit=crop'
        ]
      }
      
      await productService.create(productData)
      toast.success('Product submitted successfully! 🚀')
      onSuccess?.()
      
      // Reset form
      setFormData({
        title: '',
        tagline: '',
        description: '',
        url: '',
        category: '',
        makerName: '',
        images: []
      })
      setStep(1)
    } catch (error) {
      toast.error('Failed to submit product. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files)
    // In a real app, you'd upload these to a service
    // For now, we'll use placeholder URLs
    const imageUrls = files.map((_, index) => 
      `https://images.unsplash.com/photo-${Date.now() + index}?w=400&h=300&fit=crop`
    )
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, ...imageUrls].slice(0, 5) // Max 5 images
    }))
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress Indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className={`flex items-center ${step >= 1 ? 'text-primary' : 'text-text-muted'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
              step >= 1 ? 'bg-primary text-white' : 'bg-gray-200'
            }`}>
              1
            </div>
            <span className="ml-2 font-medium">Product Details</span>
          </div>
          
          <div className={`w-16 h-1 ${step >= 2 ? 'bg-primary' : 'bg-gray-200'} rounded`} />
          
          <div className={`flex items-center ${step >= 2 ? 'text-primary' : 'text-text-muted'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
              step >= 2 ? 'bg-primary text-white' : 'bg-gray-200'
            }`}>
              2
            </div>
            <span className="ml-2 font-medium">Additional Info</span>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {step === 1 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <Input
              label="Product Title"
              placeholder="What's your product called?"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              error={errors.title}
            />
            
            <Input
              label="Tagline"
              placeholder="Describe your product in one line"
              value={formData.tagline}
              onChange={(e) => setFormData(prev => ({ ...prev, tagline: e.target.value }))}
              error={errors.tagline}
            />
            
            <Textarea
              label="Description"
              placeholder="Tell us more about your product..."
              rows={4}
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              error={errors.description}
            />
            
            <div className="flex justify-end">
              <Button onClick={handleNext} type="button">
                Next Step
                <ApperIcon name="ArrowRight" className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <Input
              label="Product URL"
              type="url"
              placeholder="https://yourproduct.com"
              value={formData.url}
              onChange={(e) => setFormData(prev => ({ ...prev, url: e.target.value }))}
              error={errors.url}
            />
            
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Category
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg 
                         focus:ring-2 focus:ring-secondary/20 focus:border-secondary
                         transition-colors duration-200"
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </select>
              {errors.category && (
                <p className="mt-1 text-sm text-error">{errors.category}</p>
              )}
            </div>
            
            <Input
              label="Maker Name"
              placeholder="Your name or company"
              value={formData.makerName}
              onChange={(e) => setFormData(prev => ({ ...prev, makerName: e.target.value }))}
              error={errors.makerName}
            />
            
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Product Images (Optional)
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <ApperIcon name="Upload" className="w-8 h-8 mx-auto mb-2 text-text-muted" />
                <p className="text-sm text-text-muted mb-2">
                  Click to upload or drag and drop
                </p>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                />
                <label
                  htmlFor="image-upload"
                  className="inline-block px-4 py-2 bg-gray-100 text-text-secondary rounded-lg cursor-pointer hover:bg-gray-200 transition-colors"
                >
                  Choose Files
                </label>
              </div>
              {formData.images.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {formData.images.map((image, index) => (
                    <div key={index} className="relative">
                      <img
                        src={image}
                        alt={`Upload ${index + 1}`}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => setFormData(prev => ({
                          ...prev,
                          images: prev.images.filter((_, i) => i !== index)
                        }))}
                        className="absolute -top-2 -right-2 w-5 h-5 bg-error text-white rounded-full text-xs flex items-center justify-center"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <div className="flex justify-between">
              <Button variant="secondary" onClick={handleBack} type="button">
                <ApperIcon name="ArrowLeft" className="w-4 h-4 mr-2" />
                Back
              </Button>
              
              <Button type="submit" loading={loading} disabled={loading}>
                Submit Product
                <ApperIcon name="Send" className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </motion.div>
        )}
      </form>
    </div>
  )
}