import productsData from '../mockData/products.json'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

class ProductService {
  constructor() {
    this.products = [...productsData]
    this.nextId = Math.max(...this.products.map(p => parseInt(p.id))) + 1
  }

  async getAll() {
    await delay(300)
    return [...this.products].sort((a, b) => b.voteCount - a.voteCount)
  }

  async getById(id) {
    await delay(200)
    const product = this.products.find(p => p.id === id)
    if (!product) {
      throw new Error('Product not found')
    }
    return { ...product }
  }

  async getByCategory(categorySlug) {
    await delay(300)
    return [...this.products]
      .filter(p => p.category.toLowerCase() === categorySlug.toLowerCase())
      .sort((a, b) => b.voteCount - a.voteCount)
  }

  async getByDate(date) {
    await delay(300)
    const targetDate = new Date(date).toDateString()
    return [...this.products]
      .filter(p => new Date(p.launchDate).toDateString() === targetDate)
      .sort((a, b) => b.voteCount - a.voteCount)
  }

  async getTopProducts(timeframe = 'week') {
    await delay(300)
    const now = new Date()
    let cutoffDate = new Date()
    
    switch (timeframe) {
      case 'day':
        cutoffDate.setDate(now.getDate() - 1)
        break
      case 'week':
        cutoffDate.setDate(now.getDate() - 7)
        break
      case 'month':
        cutoffDate.setMonth(now.getMonth() - 1)
        break
      default:
        cutoffDate.setDate(now.getDate() - 7)
    }

    return [...this.products]
      .filter(p => new Date(p.launchDate) >= cutoffDate)
      .sort((a, b) => b.voteCount - a.voteCount)
  }

  async search(query) {
    await delay(250)
    const searchTerm = query.toLowerCase()
    return [...this.products].filter(p => 
      p.title.toLowerCase().includes(searchTerm) ||
      p.tagline.toLowerCase().includes(searchTerm) ||
      p.description.toLowerCase().includes(searchTerm) ||
      p.makerName.toLowerCase().includes(searchTerm)
    ).sort((a, b) => b.voteCount - a.voteCount)
  }

  async create(productData) {
    await delay(400)
    const newProduct = {
      id: this.nextId.toString(),
      ...productData,
      launchDate: new Date().toISOString(),
      voteCount: 1,
      hasVoted: true,
      createdAt: new Date().toISOString()
    }
    this.products.push(newProduct)
    this.nextId++
    return { ...newProduct }
  }

  async update(id, productData) {
    await delay(300)
    const index = this.products.findIndex(p => p.id === id)
    if (index === -1) {
      throw new Error('Product not found')
    }
    
    this.products[index] = {
      ...this.products[index],
      ...productData,
      updatedAt: new Date().toISOString()
    }
    
    return { ...this.products[index] }
  }

  async delete(id) {
    await delay(300)
    const index = this.products.findIndex(p => p.id === id)
    if (index === -1) {
      throw new Error('Product not found')
    }
    
    const deletedProduct = this.products.splice(index, 1)[0]
    return { ...deletedProduct }
  }

  async vote(productId) {
    await delay(200)
    const product = this.products.find(p => p.id === productId)
    if (!product) {
      throw new Error('Product not found')
    }

    if (product.hasVoted) {
      // Unvote
      product.voteCount = Math.max(0, product.voteCount - 1)
      product.hasVoted = false
    } else {
      // Vote
      product.voteCount++
      product.hasVoted = true
    }

    return { ...product }
  }
}

export default new ProductService()