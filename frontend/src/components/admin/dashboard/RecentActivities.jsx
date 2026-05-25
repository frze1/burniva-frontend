import { MoreHorizontal } from 'lucide-react'
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer
} from 'recharts'

// --- DATA DUMMY ---
const activityData = [
    { name: 'Sen', value: 310 },
    { name: 'Sel', value: 350 },
    { name: 'Rab', value: 410 },
    { name: 'Kam', value: 390 },
    { name: 'Jum', value: 450 },
    { name: 'Sab', value: 290 },
    { name: 'Min', value: 250 },
];

const DEFAULT_ACTIVITIES = [
    { id: 1, name: 'Naufal', action: 'menyelesaikan assessment', time: '2 menit lalu', initial: 'N', color: 'bg-primary-500' },
    { id: 2, name: 'Aisyah', action: 'membuat akun baru', time: '10 menit lalu', initial: 'A', color: 'bg-primary-600' },
    { id: 3, name: 'Sistem', action: '5 prediksi AI dilakukan', time: '1 jam lalu', initial: 'S', color: 'bg-primary-500' },
    { id: 4, name: 'Rizky', action: 'menyelesaikan assessment', time: '2 jam lalu', initial: 'R', color: 'bg-primary-600' },
    { id: 5, name: 'Putri', action: 'memperbarui profil', time: '3 jam lalu', initial: 'P', color: 'bg-primary-500' },
];

function RecentActivities({ activities = DEFAULT_ACTIVITIES }) {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pb-8">
            
            {/* Aktivitas Pengguna (Bar Chart) */}
            <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm lg:col-span-2">
                <div className="mb-6">
                    <h3 className="text-base font-bold text-slate-800">Aktivitas Pengguna</h3>
                    <p className="text-sm text-slate-500">Pengguna aktif mingguan</p>
                </div>
                
                <div className="h-[250px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={activityData} margin={{ top: 5, right: 0, left: -20, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} dy={10} />
                            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                            <RechartsTooltip 
                                cursor={{ fill: '#f8fafc' }}
                                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                            />
                            <Bar dataKey="value" fill="#006D5B" radius={[4, 4, 0, 0]} barSize={45} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Aktivitas Terbaru (List) */}
            <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex flex-col">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-base font-bold text-slate-800">Aktivitas Terbaru</h3>
                    <button className="text-slate-400 hover:text-slate-600">
                        <MoreHorizontal size={20} />
                    </button>
                </div>
                
                <div className="flex flex-col gap-5 flex-1">
                    {activities.map((act) => (
                        <div key={act.id} className="flex items-start gap-3">
                            <div className={`w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-semibold ${act.color} flex-shrink-0 mt-0.5`}>
                                {act.initial}
                            </div>
                            <div>
                                <p className="text-sm text-slate-700 leading-snug">
                                    <span className="font-bold text-slate-900">{act.name}</span> {act.action}
                                </p>
                                <p className="text-xs text-slate-400 mt-1">{act.time}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    )
}

export default RecentActivities