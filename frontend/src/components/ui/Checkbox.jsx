import { Check } from 'lucide-react'
import { classNames } from '../../utils/helpers'

function Checkbox({
  checked = false,
  onChange,
  label,
  disabled = false,
  className = '',
}) {
  return (
    <label className={classNames(
      'flex items-center gap-3 cursor-pointer group',
      disabled && 'cursor-not-allowed opacity-50',
      className
    )}>
      <div
        onClick={() => !disabled && onChange?.(!checked)}
        className={classNames(
          'w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0',
          'transition-all duration-150',
          checked
            ? 'bg-primary-600 border-primary-600'
            : 'bg-white border-slate-300 group-hover:border-primary-400'
        )}
      >
        {checked && <Check size={12} className="text-white" strokeWidth={3} />}
      </div>
      {label && (
        <span className={classNames(
          'text-sm text-slate-700',
          checked && 'line-through text-slate-400'
        )}>
          {label}
        </span>
      )}
    </label>
  )
}

export default Checkbox