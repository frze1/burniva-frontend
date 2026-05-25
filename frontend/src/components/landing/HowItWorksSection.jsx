const steps = [
  {
    number: '01',
    title: 'Isi Data Harian',
    description: 'Lengkapi informasi mental dan gaya hidup harian seperti stres, tidur, dan kebiasaan belajar.',
  },
  {
    number: '02',
    title: 'AI Menganalisis Kondisi',
    description: 'AI kami memproses data kamu dan mengevaluasi tingkat risiko burnout.',
  },
  {
    number: '03',
    title: 'Dapatkan Hasil & Rekomendasi',
    description: 'Terima status kesehatan mental kamu beserta insight dan saran yang dapat ditindaklanjuti.',
  },
]

function HowItWorksSection() {
  return (
    <section id="cara-kerja" className="py-20 bg-slate-50">
      <div className="w-full px-6 sm:px-10 md:px-16 lg:px-24">

        <div className="text-center mb-12">
          <p className="text-sm font-medium text-primary-600 mb-2">Cara Kerja</p>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800">
            Tiga langkah sederhana
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map(({ number, title, description }) => (
            <div key={number} className="flex flex-col">
              <span className="text-4xl font-bold text-primary-200 mb-3">{number}</span>
              <h3 className="text-base font-semibold text-slate-800 mb-2">{title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{description}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

export default HowItWorksSection