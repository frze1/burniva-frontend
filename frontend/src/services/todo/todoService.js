import api from '../api'

const todoService = {
  getAll: async () => {
    const res = await api.get('/todos')
    return res.data
  },

  create: async (data) => {
    const res = await api.post('/todos', data)
    return res.data
  },

  toggle: async (id) => {
    const res = await api.patch(`/todos/${id}/toggle`)
    return res.data
  },

  delete: async (id) => {
    const res = await api.delete(`/todos/${id}`)
    return res.data
  },
}

export default todoService