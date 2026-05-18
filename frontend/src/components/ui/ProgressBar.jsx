import { classNames } from '../../utils/helpers'

function ProgressBar({
  value = 0,
  max = 100,
  label,
  showValue = false,
  color = 'primary',
  size = 'md',
  className = '',
}) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100)

  const colors = {
    primary: 'bg-primary-600',
    success: 'bg-green-500',
    warning: 'bg-yellow-500',
    danger:  'bg-red-500',
    purple:  'bg-purple-500',
  }

  const sizes = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-3',
  }

  return (
    <div className={classNames('w-full', className)}>
      {(label || showValue) && (
        <div className="flex justify-between items-center mb-1.5">
          {label && <span className="text-xs text-slate-500">{label}</span>}
          {showValue && <span className="text-xs font-medium text-slate-600">{Math.round(percentage)}%</span>}
        </div>
      )}
      <div className={classNames('w-full bg-slate-100 rounded-full overflow-hidden', sizes[size])}>
        <div
          className={classNames('rounded-full transition-all duration-500', colors[color], sizes[size])}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}

export default ProgressBar