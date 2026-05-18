import api from '../api'
import useAuthStore from '../../store/auth/useAuthStore'

const authService = {
  login: async ({ email, password }) => {
    const res = await api.post('/auth/login', { email, password })
    const { token, user } = res.data
    useAuthStore.getState().setAuth(user, token)
    return user
  },

  register: async (data) => {
    const res = await api.post('/auth/register', {
      name:       data.nama,
      email:      data.email,
      password:   data.password,
      gender:     data.jenisKelamin,
      age:        Number(data.umur),
      university: data.universitas,
      major:      data.prodi,
      semester:   Number(data.semester),
    })
    return res.data
  },

  logout: () => {
    useAuthStore.getState().clearAuth()
  },

  getProfile: async () => {
    const res = await api.get('/auth/profile')
    useAuthStore.getState().updateUser(res.data)
    return res.data
  },

  updateProfile: async (data) => {
    const res = await api.put('/auth/profile', {
      name:       data.nama,
      email:      data.email,
      gender:     data.jenisKelamin,
      age:        Number(data.umur),
      university: data.universitas,
      major:      data.prodi,
      semester:   Number(data.semester),
    })
    useAuthStore.getState().updateUser(res.data)
    return res.data
  },
}

export default authService