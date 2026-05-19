import { useState, useEffect } from 'react'
import { Moon, BookOpen, Smile, Activity } from 'lucide-react'
import { getDashboard } from '../services/dashboardService'
import { getTodos } from '../services/todoService'
import useAuthStore from '../store/auth/useAuthStore'
import BurnoutCard from '../components/dashboard/BurnoutCard'
import SummaryCard from '../components/dashboard/SummaryCard'
import ChartSection from '../components/dashboard/ChartSection'
import InsightCard from '../components/dashboard/InsightCard'
import TodoCard from '../components/dashboard/TodoCard'

const getInsight = (score) => {
  if (!score) return "Belum ada analisis. Yuk, isi data harianmu hari ini!";
  if (score <= 30) return "Kondisi mentalmu cukup baik hari ini. Pertahankan pola tidur dan aktivitas sehat.";
  if (score <= 60) return "Tingkat stres mulai meningkat. Cobalah mengatur waktu istirahat lebih baik.";
  return "Tingkat burnout cukup tinggi. Kurangi beban akademik dan prioritaskan kesehatan mental.";
};

const getMood = (score) => {
  if (!score) return "Belum ada";
  if (score <= 30) return "Tenang";
  if (score <= 60) return "Netral";
  return "Lelah";
};

const getStressLevel = (score) => {
  if (!score) return "Belum ada";
  if (score <= 20) return "Level 1";
  if (score <= 40) return "Level 2";
  if (score <= 60) return "Level 3";
  if (score <= 80) return "Level 4";
  return "Level 5";
};

function Dashboard() {
  const [dashboard, setDashboard] = useState(null);
  const [todos, setTodos] = useState([]);
  const user = useAuthStore(s => s.user);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const data = await getDashboard();
      setDashboard(data);
      
      const todosData = await getTodos();
      setTodos(todosData);
    } catch (error) {
      console.error(error);
    }
  };

  const doneTodos = todos.filter(t => t.status === 'completed').length;
  const totalTodos = todos.length;

  const summaryCards = [
    {
      icon: <Moon size={18} className="text-violet-500" />,
      iconBg: 'bg-violet-500/10 shadow-sm',
      label: 'Tidur Terakhir',
      value: dashboard?.latest?.sleep_hours ? `${dashboard.latest.sleep_hours} jam` : 'Belum ada',
    },
    {
      icon: <BookOpen size={18} className="text-amber-500" />,
      iconBg: 'bg-amber-500/10 shadow-sm',
      label: 'Fokus Belajar',
      value: dashboard?.latest?.study_hours ? `${dashboard.latest.study_hours} jam` : 'Belum ada',
    },
    {
      icon: <Smile size={18} className="text-emerald-500" />,
      iconBg: 'bg-emerald-500/10 shadow-sm',
      label: 'Mood Harian',
      value: getMood(dashboard?.latest?.burnout_score),
    },
    {
      icon: <Activity size={18} className="text-red-500" />,
      iconBg: 'bg-red-500/10 shadow-sm',
      label: 'Level Stres',
      value: getStressLevel(dashboard?.latest?.burnout_score),
    },
  ];

  return (
    <div className="flex flex-col gap-6 p-6 w-full max-w-[1200px] mx-auto bg-[#F8FAFC] min-h-screen">
      
      {/* Burnout Hero Card */}
      <BurnoutCard 
        score={dashboard?.latest?.burnout_score || 0} 
        levelStr={dashboard?.latest?.burnout_level || 'Belum ada'} 
        insight={getInsight(dashboard?.latest?.burnout_score)}
        userName={user?.name}
      />

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
          <ChartSection trendData={dashboard?.trend || []} />
        </div>

        {/* Kanan — Insight + Todo */}
        <div className="flex flex-col gap-6">
          <InsightCard />
          <TodoCard done={doneTodos} total={totalTodos} />
        </div>
      </div>

    </div>
  )
}

export default Dashboard