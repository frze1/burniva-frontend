import {
  AreaChart, Area, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer
} from 'recharts'

const stressData = [
  { day: 'Sen', value: 3 }, { day: 'Sel', value: 3.5 }, { day: 'Rab', value: 2.8 },
  { day: 'Kam', value: 4 }, { day: 'Jum', value: 6 }, { day: 'Sab', value: 7.5 }, { day: 'Min', value: 7 },
]

const burnoutData = [
  { week: 'M-4', value: 48 }, { week: 'M-3', value: 58 }, { week: 'M-2', value: 68 },
  { week: 'M-1', value: 75 }, { week: 'Skrg', value: 82 },
]

const avg = (stressData.reduce((s, d) => s + d.value, 0) / stressData.length).toFixed(1)
const latest = burnoutData[burnoutData.length - 1].value
const prev = burnoutData[burnoutData.length - 2].value
const diff = latest - prev
const diffPct = Math.round((diff / prev) * 100)

const tooltipStyle = {
  contentStyle: { borderRadius: '10px', border: '1px solid #E5E7EB', fontSize: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' },
  cursor: { stroke: '#E5E7EB' },
}

function ChartSection() {
  return (
    <div className="flex flex-col gap-6">

      {/* Tren Tingkat Stres */}
      <div className="bg-white rounded-2xl p-6 border-[0.67px] border-gray-100 shadow-[0px_1px_3px_0px_rgba(0,0,0,0.10)]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-2">
          <div>
            <h3 className="text-lg font-semibold text-slate-800">Tren Tingkat Stres</h3>
            <p className="text-sm text-gray-500">Pantauan 7 hari terakhir</p>
          </div>
          <div className="bg-gray-50 border-[0.67px] border-gray-100 rounded-lg px-3 py-1.5 self-start sm:self-auto">
            <span className="text-sm text-gray-600 font-medium">Rata-rata: {avg}</span>
          </div>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={stressData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="stressGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#1e40af" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#1e40af" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
              <XAxis dataKey="day" tick={{ fontSize: 12, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
              <YAxis domain={[0, 10]} tick={{ fontSize: 12, fill: '#9CA3AF' }} axisLine={false} tickLine={false} ticks={[0, 3, 6, 10]} />
              <Tooltip {...tooltipStyle} formatter={v => [`${v}`, 'Stres']} />
              <Area type="monotone" dataKey="value" stroke="#1e40af" strokeWidth={3} fill="url(#stressGrad)" dot={false} activeDot={{ r: 5, fill: '#1e40af' }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Perkembangan Burnout */}
      <div className="bg-white rounded-2xl p-6 border-[0.67px] border-gray-100 shadow-[0px_1px_3px_0px_rgba(0,0,0,0.10)]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-2">
          <div>
            <h3 className="text-lg font-semibold text-slate-800">Perkembangan Burnout</h3>
            <p className="text-sm text-gray-500">Tren 5 minggu terakhir</p>
          </div>
          <div className="bg-red-50 border-[0.67px] border-red-100 rounded-full px-3 py-1.5 self-start sm:self-auto flex items-center gap-2">
             <div className="w-3 h-3 rounded-full bg-red-600 outline outline-1 outline-red-300" />
            <span className="text-sm font-medium text-red-600">
              {diff > 0 ? '+' : ''}{diffPct}%
            </span>
          </div>
        </div>

        <div className="h-56 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={burnoutData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
              <XAxis dataKey="week" tick={{ fontSize: 12, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
              <YAxis domain={[0, 100]} tick={{ fontSize: 12, fill: '#9CA3AF' }} axisLine={false} tickLine={false} ticks={[0, 25, 50, 75, 100]} />
              <Tooltip {...tooltipStyle} formatter={v => [`${v}%`, 'Burnout']} />
              <Line type="monotone" dataKey="value" stroke="#8b5cf6" strokeWidth={3} dot={{ fill: '#8b5cf6', r: 5, strokeWidth: 0 }} activeDot={{ r: 7 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  )
}

export default ChartSection