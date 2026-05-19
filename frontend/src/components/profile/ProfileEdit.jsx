import React, { useRef } from 'react';
import { Camera } from 'lucide-react';
import Input from '../ui/Input';

function ProfileEdit({ 
  form, 
  onUserChange, 
  passwords, 
  onPasswordChange, 
  currentPhotoUrl, 
  previewImage, 
  onImageSelected
}) {
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onImageSelected(reader.result, file);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAvatarClick = () => {
    fileInputRef.current.click();
  };

  const initial = form?.nama?.charAt(0).toUpperCase() || 'U';
  const displayImage = previewImage || currentPhotoUrl;

  return (
    // REVISI: Langsung merender susunan Grid Utama tanpa Action Bar kembar
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 w-full items-start pb-4">
      
      {/* --- Kiri: Informasi Pribadi --- */}
      <div className="bg-white rounded-2xl border-[0.67px] border-gray-200 p-6 md:p-8 shadow-sm flex flex-col gap-6">
        <div className="flex flex-col gap-1">
          <h3 className="text-lg font-bold text-neutral-950 leading-7">Informasi Pribadi</h3>
          <p className="text-sm text-gray-500 leading-5">Perbarui data agar analisis AI tetap akurat.</p>
        </div>

        <div className="flex flex-col gap-5">
          <Input label="Nama Lengkap" name="nama" value={form.nama} onChange={onUserChange} placeholder="Nama Lengkap" />
          <Input label="Email" name="email" type="email" value={form.email} onChange={onUserChange} placeholder="kamu@kampus.ac.id" />
          
          {/* Jenis Kelamin */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-slate-700">Jenis Kelamin</label>
            <select
              name="jenisKelamin"
              value={form.jenisKelamin || ''}
              onChange={onUserChange}
              className="w-full h-11 text-sm rounded-xl border border-slate-200 bg-white px-4 text-slate-800 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="">Pilih Jenis Kelamin</option>
              <option value="Laki-laki">Laki-laki</option>
              <option value="Perempuan">Perempuan</option>
            </select>
          </div>

          {/* Umur */}
          <Input label="Umur" name="umur" type="number" value={form.umur} onChange={onUserChange} placeholder="Contoh: 21" />

          {/* Universitas */}
          <Input label="Universitas" name="universitas" value={form.universitas} onChange={onUserChange} placeholder="Nama Universitas" />

          {/* Program Studi */}
          <Input label="Program Studi" name="prodi" value={form.prodi} onChange={onUserChange} placeholder="Program Studi / Jurusan" />

          {/* Semester */}
          <Input label="Semester" name="semester" type="number" value={form.semester} onChange={onUserChange} placeholder="Contoh: 6" />
          
          {/* AREA EDIT FOTO */}
          <div className="flex flex-col gap-2 mt-1">
            <label className="text-sm font-medium text-gray-700">Foto Profil</label>
            
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileChange} 
              accept="image/*" 
              className="hidden" 
            />

            {/* Kotak Avatar */}
            <div 
              onClick={handleAvatarClick}
              className="w-24 h-24 bg-blue-800 rounded-2xl flex items-center justify-center relative cursor-pointer group hover:bg-blue-900 transition-colors overflow-hidden shadow-sm"
            >
              {displayImage ? (
                <img src={displayImage} alt="Avatar Preview" className="w-full h-full object-cover transition-transform group-hover:scale-105" />
              ) : (
                <span className="text-4xl text-white font-normal group-hover:scale-105 transition-transform">{initial}</span>
              )}
              
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Camera size={24} className="text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- Kanan: Keamanan --- */}
      <div className="bg-white rounded-2xl border-[0.67px] border-gray-200 p-6 md:p-8 shadow-sm flex flex-col gap-6">
        <div className="flex flex-col gap-1">
          <h3 className="text-lg font-bold text-neutral-950 leading-7">Keamanan</h3>
          <p className="text-sm text-gray-500 leading-5">Ubah kata sandi</p>
        </div>
        <div className="flex flex-col gap-5">
          <Input label="Kata Sandi Lama" name="old" type="password" value={passwords.old} onChange={onPasswordChange} placeholder="••••••••" />
          <Input label="Kata Sandi Baru" name="new" type="password" value={passwords.new} onChange={onPasswordChange} placeholder="••••••••" />
          <Input label="Konfirmasi Kata Sandi" name="confirm" type="password" value={passwords.confirm} onChange={onPasswordChange} placeholder="••••••••" />
        </div>
      </div>

    </div>
  );
}

export default ProfileEdit;