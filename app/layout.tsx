import '@/app/globals.css'
import { Poppins, Exo_2 } from 'next/font/google'
import { Toaster } from 'sonner'

const poppins = Poppins({ subsets: ['latin'], weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'] })
const exo2 = Exo_2({ subsets: ['latin'], weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'] })
export const metadata = {
  title: 'ChatFolio - Your AI Conversations, Beautifully Organized',
  description: 'Organize your AI conversations across multiple platforms with ChatFolio',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <Toaster richColors />
      <body className={exo2.className}>{children}</body>
    </html>
  )
}

