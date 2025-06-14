import categoriesData from '../mockData/categories.json'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

class CategoryService {
  constructor() {
    this.categories = [...categoriesData]
  }

  async getAll() {
    await delay(200)
    return [...this.categories]
  }

  async getById(id) {
    await delay(150)
    const category = this.categories.find(c => c.id === id)
    if (!category) {
      throw new Error('Category not found')
    }
    return { ...category }
  }

  async getBySlug(slug) {
    await delay(150)
    const category = this.categories.find(c => c.slug === slug)
    if (!category) {
      throw new Error('Category not found')
    }
    return { ...category }
  }
}

export default new CategoryService()