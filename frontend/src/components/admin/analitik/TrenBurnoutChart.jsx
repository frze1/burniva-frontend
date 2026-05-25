import React from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip as RechartsTooltip } from 'recharts'

const data = [
    { name: 'M1', value: 40 },
    { name: 'M2', value: 55 },
    { name: 'M3', value: 62 },
    { name: 'M4', value: 64 },
    { name: 'M5', value: 63 },
    { name: 'M6', value: 54 },
    { name: 'M7', value: 45 },
    { name: 'M8', value: 38 },
    { name: 'M9', value: 34 },
    { name: 'M10', value: 33 },
    { name: 'M11', value: 36 },
    { name: 'M12', value: 42 },
]

function TrenBurnoutChart() {
    return (
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex flex-col h-[380px]">
            <div>
                <h3 className="text-base font-bold text-slate-800">Tren Burnout</h3>
                <p className="text-sm text-slate-500">Rata-rata skor burnout per minggu</p>
            </div>

            <div className="flex-1 w-full mt-4 min-h-[220px]">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <defs>
                            <linearGradient id="colorTeal" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#0f766e" stopOpacity={0.1} />
                                <stop offset="95%" stopColor="#0f766e" stopOpacity={0.0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis 
                            dataKey="name" 
                            axisLine={false} 
                            tickLine={false} 
                            tick={{ fill: '#94a3b8', fontSize: 11 }} 
                            dy={10} 
                        />
                        <YAxis 
                            domain={[0, 80]}
                            ticks={[0, 20, 40, 60, 80]}
                            axisLine={false} 
                            tickLine={false} 
                            tick={{ fill: '#94a3b8', fontSize: 11 }} 
                            dx={-5}
                        />
                        <RechartsTooltip 
                            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                            formatter={(value) => [`${value} Poin`, 'Skor Rata-rata']}
                        />
                        <Area 
                            type="monotone" 
                            dataKey="value" 
                            stroke="#0f766e" 
                            strokeWidth={2.5} 
                            fillOpacity={1} 
                            fill="url(#colorTeal)" 
                            dot={false}
                            activeDot={{ r: 5, strokeWidth: 0, fill: '#0f766e' }}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}

export default TrenBurnoutChart
