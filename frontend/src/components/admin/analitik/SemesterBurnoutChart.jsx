import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip as RechartsTooltip } from 'recharts'
import { GraduationCap } from 'lucide-react'

function SemesterBurnoutChart({ semesterData = [] }) {
    return (
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex flex-col h-[380px]">
            <div>
                <h3 className="text-base font-bold text-slate-800">Burnout Berdasarkan Semester</h3>
                <p className="text-sm text-slate-500">Distribusi risiko per semester</p>
            </div>

            <div className="flex-1 w-full mt-4 min-h-[220px] flex flex-col">
                <div className="flex-1">
                    {semesterData.length === 0 ? (
                        <div className="flex flex-col items-center justify-center w-full h-full opacity-50">
                            <GraduationCap size={32} className="text-slate-400 mb-2" />
                            <p className="text-sm font-medium text-slate-500">Belum ada data semester</p>
                        </div>
                    ) : (
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={semesterData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis 
                                    dataKey="name" 
                                    axisLine={false} 
                                    tickLine={false} 
                                    tick={{ fill: '#94a3b8', fontSize: 11 }} 
                                    dy={10} 
                                />
                                <YAxis 
                                    axisLine={false} 
                                    tickLine={false} 
                                    tick={{ fill: '#94a3b8', fontSize: 11 }} 
                                    dx={-5}
                                />
                                <RechartsTooltip 
                                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                />
                                {/* Stacked Bars */}
                                <Bar dataKey="rendah" stackId="a" fill="#10b981" barSize={28} radius={[0, 0, 4, 4]} />
                                <Bar dataKey="sedang" stackId="a" fill="#f59e0b" barSize={28} />
                                <Bar dataKey="tinggi" stackId="a" fill="#ef4444" barSize={28} radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    )}
                </div>

                {/* Custom Legend at bottom */}
                <div className="flex justify-center items-center gap-4 mt-4 pt-3 border-t border-slate-50">
                    <div className="flex items-center gap-1.5">
                        <div className="w-2.5 h-2.5 rounded bg-[#10b981]" />
                        <span className="text-xs font-semibold text-slate-500">rendah</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <div className="w-2.5 h-2.5 rounded bg-[#f59e0b]" />
                        <span className="text-xs font-semibold text-slate-500">sedang</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <div className="w-2.5 h-2.5 rounded bg-[#ef4444]" />
                        <span className="text-xs font-semibold text-slate-500">tinggi</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SemesterBurnoutChart
