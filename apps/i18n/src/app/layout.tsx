import '@/styles/global.css'
import '@/styles/lenis.css'

export default async function RootLayout({
  children,
}) {
  return (
    <html >
      <body>
        {children}
      </body>
    </html>
  )
}