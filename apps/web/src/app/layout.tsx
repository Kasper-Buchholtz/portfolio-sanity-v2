import '@/styles/global.css'
import '@/styles/lenis.css'
import { draftMode } from 'next/headers'
import { Inter, PT_Serif } from 'next/font/google'

const sans = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
})

const serif = PT_Serif({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-serif',
  style: ['normal', 'italic'],
  weight: ['400', '700'],
  preload: true,
})



export default async function Root({ children }: { children: React.ReactNode }) {
  const isDraftModeEnabled = (await draftMode()).isEnabled;
  return (
    <html lang="da-DK" className={`${sans.variable} ${serif.variable}`}>
      <body
        className={`selection:text-superego-light-light selection:bg-superego-green ${isDraftModeEnabled ? 'debug-screens' : ''}`}
      >
        {children}
      </body>
    </html>
  );
}
