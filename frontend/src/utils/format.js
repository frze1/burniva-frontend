export const formatScore  = (score) => `${score}%`
export const formatHours  = (hours) => `${hours} jam`
export const formatLevel  = (level) => {
  const map = { low: 'Rendah', medium: 'Sedang', high: 'Tinggi' }
  return map[level?.toLowerCase()] || level
}