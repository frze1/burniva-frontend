import React from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip } from 'recharts'
import { Activity } from 'lucide-react'

function DistribusiBurnoutChart({ distributionData = [] }) {
    const isDataEmpty = distributionData.reduce((sum, item) => sum + item.value, 0) === 0

    return (
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex flex-col h-[380px]">
            <div>
                <h3 className="text-base font-bold text-slate-800">Distribusi Burnout</h3>
                <p className="text-sm text-slate-500">Komposisi tingkat risiko</p>
            </div>
            
            <div className="flex-1 flex items-center justify-center relative min-h-[220px]">
                {isDataEmpty ? (
                    <div className="flex flex-col items-center justify-center opacity-50">
                        <Activity size={32} className="text-slate-400 mb-2" />
                        <p className="text-sm font-medium text-slate-500">Belum ada assessment</p>
                    </div>
                ) : (
                    <div className="w-[220px] h-[220px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={distributionData}
                                    innerRadius={70}
                                    outerRadius={95}
                                    paddingAngle={4}
                                    dataKey="value"
                                    stroke="none"
                                >
                                    {distributionData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <RechartsTooltip 
                                    formatter={(value) => [value, 'Total Assessment']}
                                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                )}
            </div>
        </div>
    )
}

export default DistribusiBurnoutChart
