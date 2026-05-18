import Navbar from '../components/layout/Navbar'
import HeroSection from '../components/landing/HeroSection'
import FeaturesSection from '../components/landing/FeaturesSection'
import HowItWorksSection from '../components/landing/HowItWorksSection'
import BenefitsSection from '../components/landing/BenefitsSection'
import CTASection from '../components/landing/CTASection'
import Footer from '../components/landing/Footer'

function Landing() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <BenefitsSection />
      <CTASection />
      <Footer />
    </div>
  )
}

export default Landing