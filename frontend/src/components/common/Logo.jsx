import { Link } from 'react-router-dom'
import logoCol from '../../assets/icons/Logo.svg'
import { ROUTES } from '../../utils/constants'

function Logo({ className = '', showText = true }) {
  return (
    <Link to={ROUTES.HOME} className={`flex items-center gap-2 text-primary-500 hover:text-primary-700 transition-colors ${className}`}>
      <img src={logoCol} alt="BURNIVA" className="w-8 h-8 object-contain shrink-0" />
      {showText && <span className="text-base font-bold text-inherit">BURNIVA</span>}
    </Link>
  )
}

export default Logo