import votesData from '../mockData/votes.json'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

class VoteService {
  constructor() {
    this.votes = [...votesData]
  }

  async getAll() {
    await delay(200)
    return [...this.votes]
  }

  async getByProductId(productId) {
    await delay(150)
    return [...this.votes].filter(v => v.productId === productId)
  }

  async create(voteData) {
    await delay(200)
    const newVote = {
      ...voteData,
      timestamp: new Date().toISOString()
    }
    this.votes.push(newVote)
    return { ...newVote }
  }

  async delete(productId) {
    await delay(200)
    const index = this.votes.findIndex(v => v.productId === productId)
    if (index === -1) {
      throw new Error('Vote not found')
    }
    
    const deletedVote = this.votes.splice(index, 1)[0]
    return { ...deletedVote }
  }
}

export default new VoteService()