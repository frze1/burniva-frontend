import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Calendar } from 'lucide-react'
import {
  LineChart, Line, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer,
  Dot
} from 'recharts'
import { ROUTES, getBurnoutLevel } from '../utils/constants'
import { classNames } from '../utils/helpers'

const WEEKLY_DATA = [
  { date: '28 Apr', value: 25 },
  { date: '29 Apr', value: 30 },
  { date: '30 Apr', value: 45 },
  { date: '1 Mei',  value: 55 },
  { date: '2 Mei',  value: 62 },
  { date: '3 Mei',  value: 76 },
  { date: '4 Mei',  value: 82 },
]

const MONTHLY_DATA = [
  { date: 'M-4', value: 30 },
  { date: 'M-3', value: 42 },
  { date: 'M-2', value: 55 },
  { date: 'M-1', value: 68 },
  { date: 'Skrg', value: 82 },
]

const HISTORY_LIST = [
  { id: 1, date: '4 Mei 2026',  score: 82, level: 'Tinggi'  },
  { id: 2, date: '3 Mei 2026',  score: 78, level: 'Tinggi'  },
  { id: 3, date: '2 Mei 2026',  score: 64, level: 'Sedang'  },
  { id: 4, date: '1 Mei 2026',  score: 58, level: 'Sedang'  },
  { id: 5, date: '30 Apr 2026', score: 32, level: 'Rendah'  },
  { id: 6, date: '29 Apr 2026', score: 28, level: 'Rendah'  },
]

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
  const [period, setPeriod] = useState('Mingguan')

  const chartData = period === 'Mingguan' ? WEEKLY_DATA : MONTHLY_DATA

  return (
    <div className="p-5 md:p-6 max-w-3xl mx-auto">

      {/* Card Grafik */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-card p-5 mb-4">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="text-base font-bold text-[#0a0a0a]">Tren Skor Burnout</h2>
            <p className="text-xs text-[#6A7282]">Pantau perkembangan kamu dari waktu ke waktu</p>
          </div>

          <div className="flex items-center bg-slate-50 rounded-xl p-1 gap-0.5 border border-slate-100">
            {['Mingguan', 'Bulanan'].map(p => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={classNames(
                  'px-3 py-1.5 rounded-lg text-xs font-medium transition-all',
                  period === p
                    ? 'bg-white text-[#0a0a0a] shadow-sm border border-slate-100'
                    : 'text-[#6A7282] hover:text-[#0a0a0a]'
                )}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

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
      </div>

      {/* Riwayat Harian */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-card p-5">
        <h3 className="text-base font-bold text-[#0a0a0a] mb-1">Riwayat Harian</h3>
        <p className="text-xs text-[#6A7282] mb-4">Catatan kondisi mental kamu</p>

        <div className="flex flex-col divide-y divide-slate-50">
          {HISTORY_LIST.map((item) => {
            const cfg = levelConfig[item.level]
            return (
              <div
                key={item.id}
                // REVISI DI SINI: Alihkan navigasi dinamis menggunakan ID riwayat terkait
                onClick={() => navigate(`/riwayat/${item.id}`)}
                className="flex items-center gap-4 py-4 hover:bg-slate-50 -mx-2 px-2 rounded-xl cursor-pointer transition-colors first:pt-0 last:pb-0"
              >
                <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center flex-shrink-0">
                  <Calendar size={16} className="text-slate-400" />
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[#0a0a0a] mb-1">{item.date}</p>
                  <span className={classNames('text-xs font-medium px-2.5 py-0.5 rounded-full', cfg.color, cfg.bg)}>
                    {item.level}
                  </span>
                </div>

                <div className="text-right flex-shrink-0">
                  <p className="text-xl font-bold text-[#0a0a0a]">{item.score}%</p>
                  <p className="text-xs text-[#6A7282]">Skor</p>
                </div>
              </div>
            )
          })}
        </div>

        {/* Empty state */}
        {HISTORY_LIST.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Calendar size={32} className="text-slate-300 mb-3" />
            <p className="text-sm font-medium text-slate-500 mb-1">Belum ada riwayat</p>
            <p className="text-xs text-slate-400 mb-4">Mulai input data harian untuk melihat perkembangan kamu</p>
            <button
              onClick={() => navigate(ROUTES.INPUT)}
              className="h-9 px-4 bg-primary-600 text-white text-xs font-semibold rounded-xl hover:bg-primary-700 transition-all"
            >
              Input Sekarang
            </button>
          </div>
        )}
      </div>

    </div>
  )
}

export default History