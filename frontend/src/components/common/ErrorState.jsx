import { AlertCircle } from 'lucide-react'
import Button from '../ui/Button'

function ErrorState({ message = 'Terjadi kesalahan.', onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="w-16 h-16 rounded-2xl bg-red-50 flex items-center justify-center mb-4">
        <AlertCircle size={32} className="text-red-400" />
      </div>
      <h3 className="text-base font-semibold text-slate-700 mb-1">Oops!</h3>
      <p className="text-sm text-slate-400 max-w-xs mb-6">{message}</p>
      {onRetry && (
        <Button onClick={onRetry} variant="outline" size="sm">Coba Lagi</Button>
      )}
    </div>
  )
}

export default ErrorState