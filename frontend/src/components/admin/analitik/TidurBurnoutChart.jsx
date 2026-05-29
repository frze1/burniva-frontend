import React from 'react'
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip as RechartsTooltip } from 'recharts'
import { Moon } from 'lucide-react'

function TidurBurnoutChart({ sleepData = [] }) {
    return (
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex flex-col h-[380px]">
            <div>
                <h3 className="text-base font-bold text-slate-800">Hubungan Jam Tidur & Burnout</h3>
                <p className="text-sm text-slate-500">Korelasi durasi tidur dengan skor burnout</p>
            </div>

            <div className="flex-1 w-full mt-4 min-h-[220px]">
                {sleepData.length === 0 ? (
                    <div className="flex flex-col items-center justify-center w-full h-full opacity-50">
                        <Moon size={32} className="text-slate-400 mb-2" />
                        <p className="text-sm font-medium text-slate-500">Belum ada data korelasi</p>
                    </div>
                ) : (
                    <ResponsiveContainer width="100%" height="100%">
                        <ScatterChart margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                            <XAxis 
                                dataKey="xLabel" 
                                type="category"
                                allowDuplicatedCategory={false}
                                axisLine={false} 
                                tickLine={false} 
                                tick={{ fill: '#94a3b8', fontSize: 10 }} 
                                dy={10} 
                            />
                            <YAxis 
                                dataKey="score" 
                                type="number"
                                domain={[0, 100]}
                                ticks={[0, 25, 50, 75, 100]}
                                axisLine={false} 
                                tickLine={false} 
                                tick={{ fill: '#94a3b8', fontSize: 11 }} 
                                dx={-5}
                            />
                            <RechartsTooltip 
                                cursor={{ strokeDasharray: '3 3' }}
                                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                formatter={(value, name, props) => {
                                    if (name === 'score') return [`${value} Poin`, 'Skor Burnout']
                                    return [props.payload.xLabel, 'Durasi Tidur']
                                }}
                            />
                            <Scatter 
                                name="Korelasi" 
                                data={sleepData} 
                                fill="#0f766e" 
                                line={false}
                                shape="circle"
                            />
                        </ScatterChart>
                    </ResponsiveContainer>
                )}
            </div>
        </div>
    )
}

export default TidurBurnoutChart
