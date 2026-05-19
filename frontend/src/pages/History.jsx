import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Calendar } from 'lucide-react'
import {
  LineChart, Line, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer,
  Dot
} from 'recharts'
import { ROUTES } from '../utils/constants'
import { classNames } from '../utils/helpers'
import { getHistory } from '../services/historyService'

const levelConfig = {
  Tinggi: { color: 'text-red-500',    bg: 'bg-red-50'    },
  Sedang: { color: 'text-yellow-600', bg: 'bg-yellow-50' },
  Rendah: { color: 'text-green-600',  bg: 'bg-green-50'  },
}

const CustomDot = (props) => {
  const { cx, cy, value } = props
  const color = value >= 70 ? '#ef4444' : value >= 40 ? '#f59e0b' : '#22c55e'
  return <Dot cx={cx} cy={cy} r={5} fill={color} stroke="white" strokeWidth={2} />
}

function History() {
  const navigate = useNavigate()
  const [history, setHistory] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchHistory()
  }, [])

  const fetchHistory = async () => {
    try {
      setLoading(true)
      const data = await getHistory()
      setHistory(data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  // Generate chart data: API gives DESC (newest first). Chart needs ASC (oldest first).
  const chartData = history.slice().reverse().map(item => ({
    date: new Date(item.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' }),
    value: item.burnout_score
  }))

  return (
    <div className="p-5 md:p-6 max-w-3xl mx-auto">

      {/* Card Grafik */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-card p-5 mb-4">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="text-base font-bold text-[#0a0a0a]">Tren Skor Burnout</h2>
            <p className="text-xs text-[#6A7282]">Pantau perkembangan kamu dari waktu ke waktu</p>
          </div>
          <div className="px-3 py-1.5 bg-slate-50 border border-slate-100 rounded-lg text-xs font-medium text-slate-500">
            Dinamis
          </div>
        </div>

        {loading ? (
          <div className="h-[240px] flex items-center justify-center text-slate-400 text-sm">
            Memuat grafik...
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
              <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
              <YAxis domain={[0, 100]} ticks={[0, 25, 50, 75, 100]} tick={{ fontSize: 11, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ borderRadius: '10px', border: '1px solid #E5E7EB', fontSize: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}
                formatter={v => [`${v}%`, 'Skor Burnout']}
                cursor={{ stroke: '#E5E7EB' }}
              />
              <Line type="monotone" dataKey="value" stroke="#1A58B7" strokeWidth={2.5} dot={<CustomDot />} activeDot={{ r: 7, fill: '#1A58B7', stroke: 'white', strokeWidth: 2 }} />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* Riwayat Harian */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-card p-5">
        <h3 className="text-base font-bold text-[#0a0a0a] mb-1">Riwayat Harian</h3>
        <p className="text-xs text-[#6A7282] mb-4">Catatan kondisi mental kamu</p>

        {loading ? (
          <div className="py-8 text-center text-sm text-slate-400">Memuat riwayat...</div>
        ) : (
          <>
            <div className="flex flex-col divide-y divide-slate-50">
              {history.map((item) => {
                const cfg = levelConfig[item.burnout_level] || levelConfig['Sedang']
                return (
                  <div
                    key={item.id}
                    onClick={() => navigate(ROUTES.HISTORY_DETAIL.replace(':id', item.id))}
                    className="flex items-center gap-4 py-4 hover:bg-slate-50 -mx-2 px-2 rounded-xl cursor-pointer transition-colors first:pt-0 last:pb-0"
                  >
                    <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center flex-shrink-0">
                      <Calendar size={16} className="text-slate-400" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-[#0a0a0a] mb-1">
                        {new Date(item.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                      </p>
                      <span className={classNames('text-xs font-medium px-2.5 py-0.5 rounded-full', cfg.color, cfg.bg)}>
                        {item.burnout_level}
                      </span>
                    </div>

                    <div className="text-right flex-shrink-0">
                      <p className="text-xl font-bold text-[#0a0a0a]">{item.burnout_score}%</p>
                      <p className="text-xs text-[#6A7282]">Skor</p>
                    </div>
                  </div>
                )
              })}
            </div>

            {history.length === 0 && (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <Calendar size={32} className="text-slate-300 mb-3" />
                <p className="text-sm font-medium text-slate-500 mb-1">Belum ada riwayat</p>
                <p className="text-xs text-slate-400 mb-4">Mulai input data harian untuk melihat perkembangan kamu</p>
                <button
                  onClick={() => navigate(ROUTES.INPUT)}
                  className="h-9 px-4 bg-blue-800 text-white text-xs font-semibold rounded-xl hover:bg-blue-900 transition-all"
                >
                  Input Sekarang
                </button>
              </div>
            )}
          </>
        )}
      </div>

    </div>
  )
}

export default History