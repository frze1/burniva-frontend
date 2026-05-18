import React from 'react';
import { User, Mail } from 'lucide-react';

function InfoItem({ icon: Icon, label, value, hideBorder }) {
  return (
    <div className={`flex items-center gap-4 py-4 ${!hideBorder ? 'border-b-[0.67px] border-gray-100' : ''}`}>
      <div className="w-10 h-10 rounded-[10px] bg-blue-50 flex items-center justify-center flex-shrink-0">
        <Icon size={18} className="text-blue-800" />
      </div>
      <div className="flex flex-col gap-0.5">
        <span className="text-sm text-gray-500 font-normal">{label}</span>
        <span className="text-base text-gray-900 font-normal leading-6">{value}</span>
      </div>
    </div>
  );
}

function ProfileView({ user }) {
  return (
    <div className="bg-white rounded-2xl border-[0.67px] border-gray-200 p-6 md:p-8 shadow-sm w-full max-w-[420px]">
      <div className="flex flex-col gap-1 mb-4">
        <h3 className="text-lg font-medium text-neutral-950 leading-7">Akun</h3>
        <p className="text-sm text-gray-500 leading-5">Informasi login kamu</p>
      </div>
      <div className="flex flex-col">
        <InfoItem icon={User} label="Nama Lengkap" value={user.nama} />
        <InfoItem icon={Mail} label="Email" value={user.email} hideBorder={true} />
      </div>
    </div>
  );
}

export default ProfileView;