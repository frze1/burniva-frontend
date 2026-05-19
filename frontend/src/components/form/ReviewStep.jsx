import React from 'react';

// Sub-komponen untuk merender kotak data (Dioptimalkan ukurannya untuk mode 2 kolom mobile)
function ReviewItem({ label, value }) {
  return (
    <div className="bg-slate-50 rounded-[10px] p-3 md:p-4 border-[0.67px] border-gray-200 flex flex-col gap-0.5">
      <p className="text-xs md:text-sm text-gray-500 font-normal leading-tight md:leading-5 truncate">
        {label}
      </p>
      <p className="text-base md:text-lg text-neutral-950 font-semibold md:font-normal leading-snug md:leading-7">
        {value}
      </p>
    </div>
  );
}

function ReviewStep({ formData }) {
  // --- REVISI UTAMA: FUNGSI FORMATTER WAKTU (JAM & MENIT) ---
  
  // 1. Mengubah angka Desimal ke format "X jam Y menit" (Untuk Belajar & Tidur)
  const formatDecimalToHoursMinutes = (decimal) => {
    const num = Number(decimal) || 0;
    const h = Math.floor(num);
    const m = Math.round((num - h) * 60);
    
    if (h === 0) return `${m} menit`;
    if (m === 0) return `${h} jam`;
    return `${h} jam ${m} menit`;
  };

  // 2. Mengubah Total Menit ke format "X jam Y menit" (Untuk Aktivitas Fisik)
  const formatMinutesToHoursMinutes = (totalMins) => {
    const mins = Number(totalMins) || 0;
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    
    if (h === 0) return `${m} menit`;
    if (m === 0) return `${h} jam`;
    return `${h} jam ${m} menit`;
  };

  // --- MAPPING DATA KE LABEL ---
  const items = [
    { label: 'Stres',               value: formData.stress },
    { label: 'Kecemasan',           value: formData.anxiety },
    { label: 'Tekanan Emosional',   value: formData.emotional_pressure }, 
    { label: 'Tekanan Akademik',    value: formData.academic_pressure },
    { label: 'Lama Belajar',        value: formatDecimalToHoursMinutes(formData.study_hours) },
    { label: 'Lama Tidur',          value: formatDecimalToHoursMinutes(formData.sleep_hours) },
    { label: 'Tekanan Finansial',   value: formData.financial_pressure },
    { label: 'Ekspektasi Keluarga', value: formData.family_expectation },
    { label: 'Dukungan Sosial',     value: formData.social_support },
    { label: 'Aktivitas Fisik',     value: formatMinutesToHoursMinutes(formData.activity_hours) },
  ];

  return (
    <div className="flex flex-col gap-5 md:gap-7 w-full">
      
      {/* Header Step Tinjau */}
      <div className="flex flex-col gap-1 w-full">
        <h2 className="text-xl font-medium text-neutral-950 leading-7">
          Tinjau Data Kamu
        </h2>
        <p className="text-sm font-normal text-gray-500 leading-5">
          Pastikan semua data sudah benar sebelum dianalisis.
        </p>
      </div>

      {/* Grid 2 Kolom per Baris */}
      <div className="grid grid-cols-2 gap-3 md:gap-4">
        {items.map((item, index) => (
          <ReviewItem key={index} label={item.label} value={item.value} />
        ))}
      </div>
      
    </div>
  );
}

export default ReviewStep;