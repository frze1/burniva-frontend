import React, { useState } from 'react'
import ProfileAvatarCard from '../../components/admin/profil/ProfileAvatarCard'
import ProfileAccountInfoCard from '../../components/admin/profil/ProfileAccountInfoCard'
import ProfileSecurityCard from '../../components/admin/profil/ProfileSecurityCard'
import useAuthStore from '../../store/auth/useAuthStore'
import authService from '../../services/auth/authService'
import api from '../../services/api'

function ProfilAdmin() {
    const { user, updateUser } = useAuthStore()

    // States for inputs
    const [adminName, setAdminName] = useState(user?.name || 'Admin Burniva')
    const [email, setEmail] = useState(user?.email || 'admin@burniva.id')
    const [profileImage, setProfileImage] = useState(user?.profileImage || null)

    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const handleSave = async () => {
        if (newPassword && newPassword !== confirmPassword) {
            alert('Password baru dan konfirmasi password tidak cocok!')
            return
        }

        try {
            // Update nama, email, profile image, dan password
            await authService.updateProfile({
                name: adminName,
                email: email,
                profile_image: profileImage,
                gender: user?.gender,
                age: user?.age,
                university: user?.university,
                major: user?.major,
                semester: user?.semester,
                old_password: oldPassword || undefined,
                new_password: newPassword || undefined
            })

            alert('Perubahan berhasil disimpan!')

            // Reset password fields
            setOldPassword('')
            setNewPassword('')
            setConfirmPassword('')
        } catch (error) {
            console.error("Gagal menyimpan profil", error)
            alert(error.response?.data?.message || "Terjadi kesalahan saat menyimpan profil")
        }
    }

    return (
        <div className="p-4 md:p-8 max-w-[1400px] mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-3 duration-300">
            {/* Grid Layout: Left (Avatar) & Right (Account/Security Details) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                {/* Left Side: Avatar Card */}
                <div className="lg:col-span-4">
                    <ProfileAvatarCard 
                        adminName={adminName}
                        email={email}
                        profileImage={profileImage}
                        onImageChange={setProfileImage}
                    />
                </div>

                {/* Right Side: Account and Security Cards */}
                <div className="lg:col-span-8 flex flex-col gap-6">
                    <ProfileAccountInfoCard 
                        adminName={adminName} 
                        email={email}
                        onChangeName={setAdminName}
                        onChangeEmail={setEmail}
                    />
                    
                    <ProfileSecurityCard 
                        oldPassword={oldPassword}
                        newPassword={newPassword}
                        confirmPassword={confirmPassword}
                        onChangeOld={setOldPassword}
                        onChangeNew={setNewPassword}
                        onChangeConfirm={setConfirmPassword}
                    />

                    <div className="flex justify-end">
                        <button 
                            onClick={handleSave}
                            className="bg-primary-600 text-white px-7 py-3.5 rounded-xl text-sm font-semibold tracking-wide shadow-sm hover:bg-primary-700 active:scale-[0.98] transition-all duration-150 cursor-pointer"
                        >
                            Simpan Perubahan
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfilAdmin
