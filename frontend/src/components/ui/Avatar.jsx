import React from 'react'
import { classNames } from '../../utils/helpers'

function Avatar({ src, name, size = 'md', className = '' }) {
  // Preset ukuran avatar agar konsisten di seluruh aplikasi
  const sizeClasses = {
    sm: 'w-8 h-8 text-xs rounded-xl',               // Untuk Topbar
    md: 'w-12 h-12 text-base rounded-xl',           // Ukuran standar
    lg: 'w-24 h-24 text-4xl rounded-2xl',           // Untuk halaman Edit Profil User
    xl: 'w-28 h-28 text-4xl rounded-full',          // Untuk halaman Profil Admin
  }

  const initial = name ? name.charAt(0).toUpperCase() : 'U'
  const defaultClasses = sizeClasses[size] || sizeClasses.md

  // LOGIKA PENTING: Latar belakang transparan jika ada gambar, warna utama jika kosong
  const bgClass = src ? 'bg-transparent' : 'bg-primary-600 text-white'

  return (
    <div
      className={classNames(
        'relative flex items-center justify-center shrink-0 overflow-hidden transition-colors',
        defaultClasses,
        bgClass,
        className
      )}
    >
      {src ? (
        <img src={src} alt="Avatar" className="w-full h-full object-cover" />
      ) : (
        <span className="font-bold tracking-wide">{initial}</span>
      )}
    </div>
  )
}

export default Avatar
