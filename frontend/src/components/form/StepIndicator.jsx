import React from 'react';
import { Check, Brain, GraduationCap, Heart, ClipboardCheck } from 'lucide-react';

const steps = [
  { id: 1, label: 'Mental', icon: Brain },
  { id: 2, label: 'Akademik', icon: GraduationCap },
  { id: 3, label: 'Gaya Hidup', icon: Heart },
  { id: 4, label: 'Tinjau', icon: ClipboardCheck },
];

function StepIndicator({ currentStep }) {
  return (
    // Lebar maksimal dibatasi agar indikator tidak merenggang terlalu jauh di layar besar
    <div className="flex items-center w-full max-w-2xl mx-auto mb-14 px-4">
      {steps.map((step, idx) => {
        const isDone = currentStep > step.id;
        const isActive = currentStep === step.id;
        const isLast = idx === steps.length - 1;
        const Icon = step.icon;

        return (
          <React.Fragment key={step.id}>
            {/* 1. Lingkaran & Teks */}
            <div className="relative flex flex-col items-center justify-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center outline outline-2 outline-offset-[-2px] transition-all duration-300 z-10 ${isActive || isDone
                    ? 'bg-primary-500 outline-primary-500 text-white shadow-sm'
                    : 'bg-white outline-gray-200 text-gray-400'
                  }`}
              >
                {isDone ? <Check size={18} strokeWidth={3} /> : <Icon size={18} />}
              </div>

              {/* Teks diposisikan absolut ke bawah agar tidak merusak layout Flexbox garis */}
              <span
                className={`absolute top-12 text-xs font-medium whitespace-nowrap transition-colors duration-300 ${isActive ? 'text-primary-500' : 'text-gray-500'
                  }`}
              >
                {step.label}
              </span>
            </div>

            {/* 2. Garis Penghubung (Hanya jika bukan step terakhir) */}
            {!isLast && (
              <div className="flex-1 h-[2px] bg-gray-200 mx-2 md:mx-4 overflow-hidden rounded-full">
                <div
                  className="h-full bg-primary-500 transition-all duration-500 ease-in-out"
                  style={{ width: isDone ? '100%' : '0%' }}
                />
              </div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}

export default StepIndicator;