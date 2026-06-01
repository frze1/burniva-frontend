import api from '../api'
import useAuthStore from '../../store/auth/useAuthStore'

const authService = {
  login: async ({ email, password }) => {
    const res = await api.post('/auth/login', {
      email,
      password,
    })

    const { token, user } = res.data

    useAuthStore.getState().setAuth(user, token)

    return user
  },

  register: async (data) => {
    const res = await api.post('/auth/register', {
      name: data.nama,
      email: data.email,
      password: data.password,
      confirm_password: data.confirmPassword,
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
    const res = await api.put(
      '/auth/profile',
      {
        name: data.name,
        email: data.email,
        gender: data.gender,
        age: Number(data.age),
        university: data.university,
        major: data.major,
        semester: Number(data.semester),
        profile_image: data.profile_image,
        old_password: data.old_password,
        new_password: data.new_password,
      }
    )

    useAuthStore
      .getState()
      .updateUser(res.data)

    return res.data
  },

  forgotPassword: async (email) => {
    const res = await api.post('/auth/forgot-password', { email })
    return res.data
  },

  resetPassword: async (token, password, confirmPassword) => {
    const res = await api.post(`/auth/reset-password/${token}`, { 
      password, 
      confirmPassword 
    })
    return res.data
  },
}

export default authService