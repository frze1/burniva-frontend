import React from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip as RechartsTooltip } from 'recharts'

const data = [
    { name: 'Jan', value: 230 },
    { name: 'Feb', value: 310 },
    { name: 'Mar', value: 380 },
    { name: 'Apr', value: 520 },
    { name: 'Mei', value: 560 },
    { name: 'Jun', value: 660 },
    { name: 'Jul', value: 740 },
    { name: 'Agu', value: 860 },
    { name: 'Sep', value: 900 },
    { name: 'Okt', value: 1020 },
    { name: 'Nov', value: 1140 },
    { name: 'Des', value: 1220 },
]

function PertumbuhanPenggunaChart() {
    return (
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex flex-col h-[380px] w-full">
            <div>
                <h3 className="text-base font-bold text-slate-800">Pertumbuhan Pengguna</h3>
                <p className="text-sm text-slate-500">Total pengguna terdaftar per bulan</p>
            </div>

            <div className="flex-1 w-full mt-4 min-h-[220px]">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis 
                            dataKey="name" 
                            axisLine={false} 
                            tickLine={false} 
                            tick={{ fill: '#94a3b8', fontSize: 11 }} 
                            dy={10} 
                        />
                        <YAxis 
                            domain={[0, 1400]}
                            ticks={[0, 350, 700, 1050, 1400]}
                            axisLine={false} 
                            tickLine={false} 
                            tick={{ fill: '#94a3b8', fontSize: 11 }} 
                            dx={-5}
                        />
                        <RechartsTooltip 
                            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                            formatter={(value) => [`${value} Pengguna`, 'Total Terdaftar']}
                        />
                        <Line 
                            type="monotone" 
                            dataKey="value" 
                            stroke="#0f766e" 
                            strokeWidth={2.5} 
                            dot={{ stroke: '#0f766e', strokeWidth: 2.5, fill: '#fff', r: 4 }}
                            activeDot={{ r: 6, strokeWidth: 0, fill: '#0f766e' }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}

export default PertumbuhanPenggunaChart
