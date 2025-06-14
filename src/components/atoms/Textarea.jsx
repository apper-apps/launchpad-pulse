import { forwardRef } from 'react'

const Textarea = forwardRef(function Textarea({
  label,
  error,
  className = '',
  rows = 4,
  ...props
}, ref) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-text-primary mb-2">
          {label}
        </label>
      )}
      <textarea
        ref={ref}
        rows={rows}
        className={`
          w-full px-4 py-3 border border-gray-300 rounded-lg 
          focus:ring-2 focus:ring-secondary/20 focus:border-secondary
          transition-colors duration-200 placeholder-text-muted
          resize-vertical
          ${error ? 'border-error focus:border-error focus:ring-error/20' : ''}
          ${className}
        `}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-error">{error}</p>
      )}
    </div>
  )
})

export default Textarea