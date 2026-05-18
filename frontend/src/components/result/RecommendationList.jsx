import React from 'react';

function RecommendationList({ recommendations }) {
  return (
    <div className="bg-white rounded-2xl border-[0.67px] border-gray-200 p-6 shadow-sm w-full">
      <div className="mb-6">
        <h3 className="text-lg font-medium text-neutral-950 leading-7 mb-1">
          Rekomendasi untuk kamu hari ini
        </h3>
        <p className="text-sm text-gray-500">
          Langkah kecil yang dapat membuat perbedaan besar
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {recommendations.map((rec, idx) => {
          const Icon = rec.icon;
          return (
            <div key={idx} className="flex items-start gap-4 p-4 rounded-[10px] border-[0.67px] border-gray-200 bg-white">
              <div className="w-10 h-10 rounded-[10px] bg-blue-50 flex items-center justify-center flex-shrink-0">
                <Icon size={18} className="text-blue-800" />
              </div>
              <div className="flex flex-col gap-0.5">
                <h4 className="text-base font-medium text-gray-900 leading-6">{rec.title}</h4>
                <p className="text-sm text-gray-500 leading-5">{rec.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default RecommendationList;