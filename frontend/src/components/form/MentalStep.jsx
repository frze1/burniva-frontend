import React from 'react';
import Slider from '../ui/Slider';

function MentalStep({ data, onChange }) {
  return (
    // Wrapper utama dengan gap yang pas antara judul dan form
    <div className="flex flex-col gap-7 w-full">
      
      {/* Header Step Mental (Tanpa "Cek Harian") */}
      <div className="flex flex-col gap-1 w-full">
        <h2 className="text-xl font-medium text-neutral-950 leading-7">
          Kondisi Mental
        </h2>
        <p className="text-sm font-normal text-gray-500 leading-5">
          Ceritakan bagaimana perasaan kamu hari ini.
        </p>
      </div>

      {/* Form Sliders */}
      <div className="flex flex-col gap-5 w-full">
        
        {/* 1. Stres (Ada hint-nya) */}
        <Slider
          label="Seberapa stres kamu hari ini?"
          hint="Skala 1 (sangat tenang) sampai 10 (sangat stres)"
          value={data.stres}
          onChange={v => onChange('stres', v)}
          min={1} 
          max={10}
          minLabel="Rendah" 
          maxLabel="Tinggi"
        />

        {/* 2. Kecemasan (Tanpa hint) */}
        <Slider
          label="Seberapa cemas kamu hari ini?"
          value={data.kecemasan}
          onChange={v => onChange('kecemasan', v)}
          min={1} 
          max={10}
          minLabel="Rendah" 
          maxLabel="Tinggi"
        />

        {/* 3. Tekanan Emosional (Tanpa hint) */}
        <Slider
          label="Tingkat tekanan emosional saat ini"
          value={data.depresi} 
          onChange={v => onChange('depresi', v)}
          min={1} 
          max={10}
          minLabel="Rendah" 
          maxLabel="Tinggi"
        />
        
      </div>
    </div>
  );
}

export default MentalStep;