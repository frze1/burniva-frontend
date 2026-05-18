import { classNames } from '../../utils/helpers'

function Card({
  children,
  className = '',
  hover = false,
  padding = 'md',
  onClick,
  ...props
}) {
  const paddings = {
    none: '',
    sm:   'p-4',
    md:   'p-5',
    lg:   'p-6',
  }

  return (
    <div
      onClick={onClick}
      className={classNames(
        'bg-white rounded-2xl border border-slate-100 shadow-card',
        hover && 'hover:shadow-card-hover hover:-translate-y-0.5 cursor-pointer',
        paddings[padding],
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export default Card