import '@/styles/global.css'
import '@/styles/lenis.css'
import { VisualEditing } from 'next-sanity'
import { draftMode } from 'next/headers'
import { GoogleTagManager } from '@next/third-parties/google'
import { SanityLive } from '@/sanity/lib/sanity.live'
import { PageParams } from './[...slug]/page'
import { client } from '@/sanity/lib/sanity.client'
import { SITE_SETTINGS_QUERY } from '@/sanity/lib/sanity.queries'
import Script from 'next/script'

export default async function Root({ children }: { children: React.ReactNode, params: PageParams }) {
  const isDraftModeEnabled = (await draftMode()).isEnabled;
  const settings = await client.fetch(SITE_SETTINGS_QUERY)
  return (
    <html lang="da-DK">
      <GoogleTagManager gtmId={settings?.googleTagManager?.id} />
      <body
        className={`selection:text-superego-light-light selection:bg-superego-green ${isDraftModeEnabled ? 'debug-screens' : ''}`}
      >
        <Script
          id="show-banner"
          strategy="worker"
          dangerouslySetInnerHTML={{
            __html: settings?.headScripts,
          }}
        />
        {children}
        <SanityLive />
        {(await draftMode()).isEnabled && (
          <>
            <VisualEditing />
            <SanityLive />
          </>
        )}
        {/* Footer script from settings.footerScripts */}
        {/*         <Script
          id='footer-script'
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: settings.footerScripts }}
        /> */}
      </body>
    </html>
  )
}