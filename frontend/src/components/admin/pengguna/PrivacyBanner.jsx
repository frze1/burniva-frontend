import { ShieldCheck } from 'lucide-react'

function PrivacyBanner() {
    return (
        <div className="mt-6 bg-primary-50/50 border border-primary-100/80 rounded-2xl p-4 flex items-start sm:items-center gap-3">
            <ShieldCheck className="text-primary-500 shrink-0 mt-0.5 sm:mt-0" size={20} />
            <p className="text-sm text-primary-800 leading-snug">
                Admin tidak dapat melihat kata sandi pengguna. Burniva menjaga privasi data pengguna.
            </p>
        </div>
    )
}

export default PrivacyBanner
