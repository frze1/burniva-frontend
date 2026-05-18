export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

export const BURNOUT_LEVELS = {
  LOW:    { label: 'Rendah', color: 'text-green-600',  bg: 'bg-green-50',  border: 'border-green-200', dot: 'bg-green-500'  },
  MEDIUM: { label: 'Sedang', color: 'text-yellow-600', bg: 'bg-yellow-50', border: 'border-yellow-200', dot: 'bg-yellow-500' },
  HIGH:   { label: 'Tinggi', color: 'text-red-600',    bg: 'bg-red-50',    border: 'border-red-200',    dot: 'bg-red-500'    },
}

export const getBurnoutLevel = (score) => {
  if (score < 40) return BURNOUT_LEVELS.LOW
  if (score < 70) return BURNOUT_LEVELS.MEDIUM
  return BURNOUT_LEVELS.HIGH
}

export const ROUTES = {
  HOME:           '/',
  LOGIN:          '/login',
  REGISTER:       '/register',
  DASHBOARD:      '/dashboard',
  INPUT:          '/input',
  RESULT:         '/result',
  TODO:           '/todo',
  HISTORY:        '/riwayat',
  HISTORY_DETAIL: '/riwayat/:id', // <-- Rute dinamis baru untuk detail riwayat harian
  PROFILE:        '/profil',
}