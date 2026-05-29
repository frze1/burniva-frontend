import React from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts'
import { Activity } from 'lucide-react'

function TrenBurnoutChart({ trendData = [] }) {
    return (
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex flex-col h-[380px]">
            <div className="mb-6">
                <h3 className="text-base font-bold text-slate-800">Tren Burnout</h3>
                <p className="text-sm text-slate-500">Rata-rata skor burnout per hari</p>
            </div>
            
            <div className="flex-1 min-h-[220px]">
                {trendData.length === 0 ? (
                    <div className="flex flex-col items-center justify-center w-full h-full opacity-50">
                        <Activity size={32} className="text-slate-400 mb-2" />
                        <p className="text-sm font-medium text-slate-500">Belum ada data tren</p>
                    </div>
                ) : (
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={trendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                            <XAxis 
                                dataKey="name" 
                                axisLine={false} 
                                tickLine={false} 
                                tick={{ fill: '#94a3b8', fontSize: 12 }} 
                                dy={10} 
                            />
                            <YAxis 
                                axisLine={false} 
                                tickLine={false} 
                                tick={{ fill: '#94a3b8', fontSize: 12 }} 
                                domain={[0, 100]}
                            />
                            <RechartsTooltip 
                                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                            />
                            <Line 
                                type="monotone" 
                                dataKey="value" 
                                stroke="#006D5B" 
                                strokeWidth={3} 
                                dot={false} 
                                activeDot={{ r: 6, fill: '#006D5B', stroke: '#fff', strokeWidth: 2 }} 
                            />
                        </LineChart>
                    </ResponsiveContainer>
                )}
            </div>
        </div>
    )
}

export default TrenBurnoutChart
