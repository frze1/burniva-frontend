import { useState } from 'react' // useEffect dihapus karena sudah tidak dipakai
import { Link, useNavigate } from 'react-router-dom'
import { Menu, X, Activity } from 'lucide-react'
import { ROUTES } from '../../utils/constants'
// classNames dihapus jika tidak digunakan lagi di komponen lain dalam file ini
import Button from '../ui/Button'

const navLinks = [
  { label: 'Beranda',    href: '#beranda'   },
  { label: 'Fitur',      href: '#fitur'     },
  { label: 'Cara Kerja', href: '#cara-kerja' },
  { label: 'Tentang',    href: '#tentang'   },
]

function Navbar() {
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)
  // State scrolled dihapus

  const scrollTo = (href) => {
    setMenuOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    // Bagian ini yang diubah: classNames diganti dengan string kelas statis
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white border-b border-slate-100">
      <div className="max-w-6xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link to={ROUTES.HOME} className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary-600 flex items-center justify-center">
            <Activity size={18} className="text-white" />
          </div>
          <span className="text-base font-bold text-slate-800">BURNIVA</span>
        </Link>

        {/* Nav desktop */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map(({ label, href }) => (
            <button
              key={href}
              onClick={() => scrollTo(href)}
              className="text-sm text-slate-500 hover:text-slate-800 transition-colors"
            >
              {label}
            </button>
          ))}
        </nav>

        {/* Actions desktop */}
        <div className="hidden md:flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => navigate(ROUTES.LOGIN)}>
            Masuk
          </Button>
          <Button size="sm" onClick={() => navigate(ROUTES.REGISTER)}>
            Mulai Sekarang
          </Button>
        </div>

        {/* Hamburger mobile */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden p-2 rounded-xl text-slate-500 hover:bg-slate-100"
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 px-4 py-4 flex flex-col gap-2 shadow-md">
          {navLinks.map(({ label, href }) => (
            <button
              key={href}
              onClick={() => scrollTo(href)}
              className="text-sm text-slate-600 py-2 text-left hover:text-primary-600 transition-colors"
            >
              {label}
            </button>
          ))}
          <div className="flex gap-2 mt-2 pt-2 border-t border-slate-100">
            <Button variant="outline" size="sm" fullWidth onClick={() => navigate(ROUTES.LOGIN)}>
              Masuk
            </Button>
            <Button size="sm" fullWidth onClick={() => navigate(ROUTES.REGISTER)}>
              Mulai Sekarang
            </Button>
          </div>
        </div>
      )}
    </header>
  )
}

export default Navbar