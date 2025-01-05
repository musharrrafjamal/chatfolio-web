import Hero from '@/components/hero'
import Features from '@/components/features'
import HowToUse from '@/components/how-to-use'
import FeedbackForm from '@/components/feedback'
import Footer from '@/components/Footer'
export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-500 via-violet-700 to-purple-900">
      <Hero />
      <Features />
      <HowToUse />
      <FeedbackForm />
      <Footer />
    </main>
  )
}

