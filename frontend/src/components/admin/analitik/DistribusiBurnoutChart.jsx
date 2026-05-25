import React from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip } from 'recharts'

const data = [
    { name: 'Rendah', value: 65, color: '#10b981' }, // emerald-500
    { name: 'Sedang', value: 23, color: '#f59e0b' }, // amber-500
    { name: 'Tinggi', value: 12, color: '#ef4444' }, // red-500
]

function DistribusiBurnoutChart() {
    return (
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex flex-col h-[380px]">
            <div>
                <h3 className="text-base font-bold text-slate-800">Distribusi Burnout</h3>
                <p className="text-sm text-slate-500">Komposisi tingkat risiko</p>
            </div>
            
            <div className="flex-1 flex items-center justify-center relative min-h-[220px]">
                <div className="w-[220px] h-[220px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={data}
                                innerRadius={70}
                                outerRadius={95}
                                paddingAngle={4}
                                dataKey="value"
                                stroke="none"
                            >
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <RechartsTooltip 
                                formatter={(value) => [`${value}%`, 'Persentase']}
                                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    )
}

export default DistribusiBurnoutChart
