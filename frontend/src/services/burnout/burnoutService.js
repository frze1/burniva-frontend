import api from '../api'

const burnoutService = {
  submitInput: async (data) => {
    const payload = {
      stress_level:        data.stres,
      anxiety_level:       data.kecemasan,
      mood_level:          data.mood,
      academic_pressure:   data.tekananAkademik,
      study_hours:         data.jamBelajar,
      sleep_hours:         data.jamTidur,
      financial_pressure:  data.tekananFinansial,
      family_expectation:  data.ekspektasiKeluarga,
      social_support:      data.dukunganSosial,
      physical_activity:   data.aktivitasFisik,
    }
    const res = await api.post('/burnout/predict', payload)
    localStorage.setItem('lastResult', JSON.stringify(res.data))
    return res.data
  },

  getLastResult: () => {
    const result = localStorage.getItem('lastResult')
    return result ? JSON.parse(result) : null
  },

  getHistory: async () => {
    const res = await api.get('/burnout/history')
    return res.data
  },
}

export default burnoutService