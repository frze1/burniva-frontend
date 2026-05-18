import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { classNames } from '../../utils/helpers'

function Input({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  hint,
  leftIcon,
  disabled = false,
  required = false,
  className = '',
  ...props
}) {
  const [showPassword, setShowPassword] = useState(false)
  const isPassword = type === 'password'
  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type

  return (
    <div className={classNames('flex flex-col gap-1.5', className)}>
      {label && (
        <label className="text-sm font-medium text-slate-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <div className="relative">
        {leftIcon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
            {leftIcon}
          </div>
        )}
        <input
          type={inputType}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className={classNames(
            'w-full h-11 text-sm rounded-xl border bg-white',
            'placeholder:text-slate-400 text-slate-800',
            'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500',
            'disabled:bg-slate-50 disabled:cursor-not-allowed disabled:text-slate-400',
            error ? 'border-red-400 focus:ring-red-400 focus:border-red-400' : 'border-slate-200',
            leftIcon ? 'pl-10' : 'pl-4',
            isPassword ? 'pr-11' : 'pr-4',
          )}
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>
      {error && <p className="text-xs text-red-500">{error}</p>}
      {hint && !error && <p className="text-xs text-slate-400">{hint}</p>}
    </div>
  )
}

export default Input