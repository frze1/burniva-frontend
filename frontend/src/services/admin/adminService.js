import api from '../api';

const adminService = {
  getStats: async () => {
    const response = await api.get('/admin/stats');
    return response.data;
  },

  getAllUsers: async () => {
    const response = await api.get('/admin/users');
    return response.data;
  },

  getUserById: async (id) => {
    const response = await api.get(`/admin/users/${id}`);
    return response.data;
  },

  suspendUser: async (id) => {
    const response = await api.put(`/admin/users/${id}/suspend`);
    return response.data;
  },

  deleteUser: async (id) => {
    const response = await api.delete(`/admin/users/${id}`);
    return response.data;
  },

  getMonitoringData: async (period = 'mingguan') => {
    const response = await api.get(`/admin/monitoring?period=${period}`);
    return response.data;
  },

  getAnalyticsData: async () => {
    const response = await api.get('/admin/analytics');
    return response.data;
  },

  getRecentActivities: async () => {
    const response = await api.get('/admin/activities');
    return response.data;
  }
};

export default adminService;
