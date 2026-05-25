import { AlertTriangle, AlertCircle, ShieldCheck } from 'lucide-react'

// Sub-component for individual stats card
const StatCard = ({ icon: Icon, value, label, iconColor, iconBg }) => (
    <div className="bg-white rounded-2xl p-6 border border-slate-100/80 shadow-sm flex items-center gap-5 hover:shadow-md transition-shadow duration-300">
        <div className={`w-14 h-14 rounded-2xl ${iconBg} flex items-center justify-center flex-shrink-0`}>
            <Icon size={28} className={iconColor} />
        </div>
        <div>
            <h3 className="text-3xl font-bold text-slate-800 tracking-tight mb-0.5">{value}</h3>
            <p className="text-sm font-medium text-slate-400">{label}</p>
        </div>
    </div>
)

function MonitoringStats({ tinggiCount = 0, sedangCount = 0, rendahCount = 0 }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard 
                icon={AlertTriangle} 
                value={tinggiCount} 
                label="Total Tinggi" 
                iconColor="text-red-500" 
                iconBg="bg-red-50" 
            />
            <StatCard 
                icon={AlertCircle} 
                value={sedangCount} 
                label="Total Sedang" 
                iconColor="text-amber-500" 
                iconBg="bg-amber-50" 
            />
            <StatCard 
                icon={ShieldCheck} 
                value={rendahCount} 
                label="Total Rendah" 
                iconColor="text-emerald-500" 
                iconBg="bg-emerald-50" 
            />
        </div>
    )
}

export default MonitoringStats
