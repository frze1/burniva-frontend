import { Moon, BookOpen, Smile, Activity } from 'lucide-react'
import BurnoutCard from '../components/dashboard/BurnoutCard'
import SummaryCard from '../components/dashboard/SummaryCard'
import ChartSection from '../components/dashboard/ChartSection'
import InsightCard from '../components/dashboard/InsightCard'
import TodoCard from '../components/dashboard/TodoCard'

const summaryCards = [
  {
    icon: <Moon size={18} className="text-violet-500" />,
    iconBg: 'bg-violet-500/10 shadow-sm',
    label: 'Tidur Terakhir',
    value: '5,2 jam',
  },
  {
    icon: <BookOpen size={18} className="text-amber-500" />,
    iconBg: 'bg-amber-500/10 shadow-sm',
    label: 'Fokus Belajar',
    value: '6 jam',
  },
  {
    icon: <Smile size={18} className="text-emerald-500" />,
    iconBg: 'bg-emerald-500/10 shadow-sm',
    label: 'Mood Harian',
    value: 'Netral',
  },
  {
    icon: <Activity size={18} className="text-red-500" />,
    iconBg: 'bg-red-500/10 shadow-sm',
    label: 'Level Stres',
    value: 'Level 4',
  },
]

function Dashboard() {
  return (
    <div className="flex flex-col gap-6 p-6 w-full max-w-[1200px] mx-auto bg-[#F8FAFC] min-h-screen">
      
      {/* Burnout Hero Card */}
      <BurnoutCard score={82} />

      {/* REVISI: 4 Summary Cards (2 Kolom di HP, 4 Kolom di PC) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
        {summaryCards.map(card => (
          <SummaryCard key={card.label} {...card} />
        ))}
      </div>

      {/* Grafik + Sidebar kanan */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Kiri — Grafik (Makan 2 Kolom) */}
        <div className="lg:col-span-2">
          <ChartSection />
        </div>

        {/* Kanan — Insight + Todo */}
        <div className="flex flex-col gap-6">
          <InsightCard />
          <TodoCard done={1} total={6} />
        </div>
      </div>

    </div>
  )
}

export default Dashboard