import React, { useRef } from 'react'
import { Camera } from 'lucide-react'

function ProfileAvatarCard({ adminName = 'Admin Burniva', email = 'admin@burniva.id', profileImage = null, onImageChange }) {
    const fileInputRef = useRef(null)

    const handleCameraClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click()
        }
    }

    const handleFileChange = (e) => {
        const file = e.target.files?.[0]
        if (file && onImageChange) {
            const reader = new FileReader()
            reader.onloadend = () => {
                onImageChange(reader.result)
            }
            reader.readAsDataURL(file)
        }
    }

    const firstLetter = adminName ? adminName.charAt(0).toUpperCase() : 'A'

    return (
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex flex-col items-center h-full">
            <h3 className="text-base font-bold text-slate-800 self-start mb-6">Foto Profil</h3>
            
            <div className="relative mt-2">
                {/* Avatar Circle */}
                <div className="w-28 h-28 rounded-full bg-primary-600 flex items-center justify-center shadow-inner overflow-hidden">
                    {profileImage ? (
                        <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                        <span className="text-4xl font-semibold text-white tracking-wide">{firstLetter}</span>
                    )}
                </div>
                
                {/* Camera Icon Badge & Hidden Input */}
                <input 
                    type="file" 
                    ref={fileInputRef} 
                    onChange={handleFileChange} 
                    accept="image/*" 
                    className="hidden" 
                />
                <button 
                    onClick={handleCameraClick}
                    className="absolute bottom-0 right-0 bg-white rounded-full p-2 border border-slate-100 shadow-md hover:bg-slate-50 transition-colors duration-150 group cursor-pointer"
                >
                    <Camera size={16} className="text-primary-600 group-hover:scale-105 transition-transform" />
                </button>
            </div>

            <h4 className="text-base font-bold text-slate-800 mt-5">{adminName}</h4>
            <p className="text-sm text-slate-500 mt-0.5">{email}</p>

            <span className="mt-5 bg-primary-50 text-primary-700 border border-primary-100/70 rounded-full px-4 py-1.5 text-xs font-bold tracking-wide">
                Admin
            </span>
        </div>
    )
}

export default ProfileAvatarCard
