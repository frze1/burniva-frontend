import { ListChecks, Clock } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../../utils/constants'
import ProgressBar from '../ui/ProgressBar'

function TodoCard({ done = 1, total = 6 }) {
  const navigate = useNavigate()
  const remaining = total - done

  return (
    <div
      onClick={() => navigate(ROUTES.TODO)}
      className="bg-white rounded-2xl p-6 border-[0.67px] border-primary-100 shadow-[0px_1px_3px_0px_rgba(0,0,0,0.10)] hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer flex flex-col"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-9 h-9 rounded-2xl bg-primary-50 flex items-center justify-center">
          <ListChecks size={18} className="text-primary-500" />
        </div>
        <span className="text-lg font-semibold text-primary-500">To-Do Spesial</span>
      </div>

      <div className="flex items-end gap-2 mb-4">
        <span className="text-4xl font-bold text-primary-500 leading-none">{done}</span>
        <span className="text-sm font-medium text-primary-500 mb-1">/ {total} selesai</span>
      </div>

      <ProgressBar value={done} max={total} color="primary" size="sm" className="mb-4" />

      <div className="flex items-center gap-2">
        <Clock size={14} className="text- primary-500" />
        <span className="text-xs font-medium text-primary-500">Sisa {remaining} tugas menunggu</span>
      </div>
    </div>
  )
}

export default TodoCard