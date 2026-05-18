import { Link } from 'react-router-dom'
import { Activity } from 'lucide-react'
import { ROUTES } from '../../utils/constants'

function Footer() {
  return (
    <footer className="bg-white border-t border-slate-100 py-10">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-lg bg-primary-600 flex items-center justify-center">
                <Activity size={15} className="text-white" />
              </div>
              <span className="text-sm font-bold text-slate-800">BURNIVA</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-xs">
              Platform berbasis AI untuk pemantauan kesehatan mental mahasiswa.
            </p>
          </div>

          {/* Produk */}
          <div>
            <h4 className="text-sm font-semibold text-slate-700 mb-3">Produk</h4>
            <div className="flex flex-col gap-2">
              <a href='#fitur' className="text-xs text-slate-400 hover:text-primary-600 transition-colors">Fitur</a>
              <a href='#cara-kerja' className="text-xs text-slate-400 hover:text-primary-600 transition-colors">Cara Kerja</a>
            </div>
          </div>

          {/* Tentang */}
          <div>
            <h4 className="text-sm font-semibold text-slate-700 mb-3">Tentang</h4>
            <div className="flex flex-col gap-2">
              <a href="#tentang" className="text-xs text-slate-400 hover:text-primary-600 transition-colors">Tentang Kami</a>
            </div>
          </div>

        </div>

        <div className="border-t border-slate-100 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center gap-2">
          <p className="text-xs text-slate-400">© 2026 BURNIVA. Hak cipta dilindungi.</p>
          <p className="text-xs text-slate-400">Dibuat untuk kesejahteraan mahasiswa</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer