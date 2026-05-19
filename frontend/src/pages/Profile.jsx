import React, { useState, useEffect } from 'react';
import { Pencil, X, Save } from 'lucide-react';
import ProfileView from '../components/profile/ProfileView';
import ProfileEdit from '../components/profile/ProfileEdit';
import useAuthStore from '../store/auth/useAuthStore';
import authService from '../services/auth/authService';

function Profile() {
  const authUser = useAuthStore((state) => state.user);

  const initialUser = {
    nama: authUser?.name || '',
    email: authUser?.email || '',
    jenisKelamin: authUser?.gender || '',
    umur: authUser?.age || '',
    universitas: authUser?.university || '',
    prodi: authUser?.major || '',
    semester: authUser?.semester || '',
    photoUrl: authUser?.profile_image || null,
  };

  const [user, setUser] = useState(initialUser);
  const [form, setForm] = useState(initialUser);
  const [isEdit, setIsEdit] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchFreshProfile = async () => {
      try {
        const freshUser = await authService.getProfile();
        const newUser = {
          nama: freshUser.name || '',
          email: freshUser.email || '',
          jenisKelamin: freshUser.gender || '',
          umur: freshUser.age || '',
          universitas: freshUser.university || '',
          prodi: freshUser.major || '',
          semester: freshUser.semester || '',
          photoUrl: freshUser.profile_image || null,
        };
        setUser(newUser);
        setForm(newUser);
      } catch (err) {
        console.error("Gagal mengambil data profil terbaru:", err);
      }
    };
    fetchFreshProfile();
  }, []);

  // --- STATE KHUSUS FOTO PROFIL ---
  const [previewImage, setPreviewImage] = useState(null); // URL Base64 untuk preview
  const [imageFile, setImageFile] = useState(null);       // Objek File asli untuk dikirim ke backend

  const [passwords, setPasswords] = useState({ old: '', new: '', confirm: '' });

  const handleUserChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handlePasswordChange = (e) => setPasswords({ ...passwords, [e.target.name]: e.target.value });

  // Tangani ketika gambar dipilih di ProfileEdit
  const handleImageSelected = (previewUrl, file) => {
    setPreviewImage(previewUrl);
    setImageFile(file);
  };

  const handleSave = async () => {

    try {

      setLoading(true);

      const updatedData = {
        name: form.nama,
        email: form.email,
        gender: form.jenisKelamin,
        age: form.umur,
        university: form.universitas,
        major: form.prodi,
        semester: form.semester,
        profile_image: previewImage || user.photoUrl
      };

      const res =
        await authService
        .updateProfile(
          updatedData
        );

      const updatedUser = res;

      const newUser = {
        nama:
          updatedUser.name,

        email:
          updatedUser.email,

        jenisKelamin:
          updatedUser.gender,

        umur:
          updatedUser.age,

        universitas:
          updatedUser.university,

        prodi:
          updatedUser.major,

        semester:
          updatedUser.semester,

        photoUrl:
          updatedUser.profile_image
      };

      setUser(newUser);
      setForm(newUser);

      setIsEdit(false);

      setPreviewImage(
        null
      );

      setImageFile(
        null
      );

    } catch (error) {

      console.error(error);

      alert(
        error.response?.data?.message ||
        "Gagal update profile"
      );

    } finally {

      setLoading(false);

    }

  };

  const handleCancel = () => {
    setForm(user); 
    setPreviewImage(null); // Hapus preview jika batal
    setImageFile(null);
    setPasswords({ old: '', new: '', confirm: '' }); 
    setIsEdit(false);
  };

  const initial = form?.nama?.charAt(0).toUpperCase() || 'U';
  // Tampilkan preview foto baru secara live di top bar saat edit
  const displayImage = isEdit ? (previewImage || user.photoUrl) : user.photoUrl;

  return (
    <div className="p-6 md:p-10 md:px-12 min-h-screen bg-[#F8FAFC] flex flex-col gap-6 md:gap-8">
      <div className="w-full max-w-5xl mx-auto flex flex-col gap-6">
        
        {/* KARTU ATAS: Top Bar Tunggal yang Selaras Ukurannya dengan ProfileEdit */}
        <div className="bg-white rounded-2xl border-[0.67px] border-gray-200 shadow-sm flex items-center justify-between gap-2 p-6 md:p-8 transition-all">
          <div className="flex items-center gap-4 md:gap-6">
            
            {/* Area Avatar - Ukuran disamakan & proporsional */}
            <div className="w-14 h-14 md:w-20 md:h-20 bg-blue-800 flex items-center justify-center text-white border-[0.67px] border-blue-100 overflow-hidden shrink-0 rounded-xl md:rounded-2xl transition-all">
              {displayImage ? (
                <img src={displayImage} alt="Avatar" className="w-full h-full object-cover" />
              ) : (
                <span className="text-xl md:text-3xl font-medium">{initial}</span>
              )}
            </div>
            
            {/* Nama Pengguna */}
            <h2 className="text-slate-800 md:text-neutral-950 font-bold md:font-semibold text-base md:text-xl leading-snug transition-all">
              {isEdit ? (form.nama || 'Nama Pengguna') : user.nama}
            </h2>
          </div>

          {/* Tombol Aksi - Semua ukuran mobile & desktop sudah responsif dan sama presisi */}
          {!isEdit ? (
            <button
              onClick={() => setIsEdit(true)}
              className="bg-blue-800 hover:bg-blue-900 text-white flex items-center gap-1.5 px-3 py-2 md:px-5 md:py-2.5 rounded-xl md:rounded-[10px] text-xs md:text-base font-medium transition-all shadow-sm"
            >
              <Pencil size={14} className="md:w-4 md:h-4" /> 
            </button>
          ) : (
            <div className="flex items-center gap-2 md:gap-3 flex-shrink-0">
              <button
                onClick={handleCancel}
                className="flex items-center gap-1.5 px-3 py-2 md:px-5 md:py-2.5 rounded-xl md:rounded-[10px] border border-gray-200 text-gray-600 md:text-neutral-950 text-xs md:text-base font-medium hover:bg-gray-50 transition-colors shadow-sm md:shadow-none"
              >
                <X size={14} className="md:w-4 md:h-4" />
              </button>
              <button
                onClick={handleSave}
                disabled={loading}
                className="bg-blue-800 hover:bg-blue-900 text-white flex items-center gap-1.5 px-3 py-2 md:px-5 md:py-2.5 rounded-xl md:rounded-[10px] text-xs md:text-base font-medium transition-all shadow-sm disabled:opacity-50"
              >
                <Save size={14} className="md:w-4 md:h-4" /> {loading ? '...' : ' '}
              </button>
            </div>
          )}
        </div>

        {/* Konten Dinamis (View atau Edit) */}
        {!isEdit ? (
          <ProfileView user={user} />
        ) : (
          <ProfileEdit 
            form={form} 
            onUserChange={handleUserChange} 
            passwords={passwords} 
            onPasswordChange={handlePasswordChange}
            currentPhotoUrl={user.photoUrl}
            previewImage={previewImage}
            onImageSelected={handleImageSelected}
          />
        )}

      </div>
    </div>
  );
}

export default Profile;