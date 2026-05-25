import React from 'react'
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip as RechartsTooltip } from 'recharts'

const data = [
    { xLabel: '3.2j', score: 72 },
    { xLabel: '6.8j', score: 43 },
    { xLabel: '4.8j', score: 74 },
    { xLabel: '4.9j', score: 62 },
    { xLabel: '7.7j', score: 39 },
    { xLabel: '7.3j', score: 32 },
    { xLabel: '6.9j', score: 84 },
    { xLabel: '4.8j', score: 75 },
    { xLabel: '9.5j', score: 29 },
    { xLabel: '4.6j', score: 41 },
    { xLabel: '7.8j', score: 75 },
    { xLabel: '4.3j', score: 29 },
    { xLabel: '7.2j', score: 66 },
    { xLabel: '8.3j', score: 77 },
    
    // Titik tumpang tindih untuk mencocokkan kepadatan titik pada gambar
    { xLabel: '3.2j', score: 71 },
    { xLabel: '6.8j', score: 70 },
    { xLabel: '6.8j', score: 55 },
    { xLabel: '4.8j', score: 65 },
    { xLabel: '4.9j', score: 50 },
    { xLabel: '7.7j', score: 64 },
    { xLabel: '7.3j', score: 43 },
    { xLabel: '6.9j', score: 33 },
    { xLabel: '9.5j', score: 71 },
    { xLabel: '4.6j', score: 52 },
    { xLabel: '7.8j', score: 48 },
    { xLabel: '4.3j', score: 34 },
    { xLabel: '7.2j', score: 42 },
    { xLabel: '8.3j', score: 44 },
    { xLabel: '8.3j', score: 48 },
]

function TidurBurnoutChart() {
    return (
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex flex-col h-[380px]">
            <div>
                <h3 className="text-base font-bold text-slate-800">Hubungan Jam Tidur & Burnout</h3>
                <p className="text-sm text-slate-500">Korelasi durasi tidur dengan skor burnout</p>
            </div>

            <div className="flex-1 w-full mt-4 min-h-[220px]">
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
                            data={data} 
                            fill="#0f766e" 
                            line={false}
                            shape="circle"
                        />
                    </ScatterChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}

export default TidurBurnoutChart
