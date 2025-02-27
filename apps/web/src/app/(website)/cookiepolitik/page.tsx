import React from 'react'
import Script from 'next/script'
import PageContainer from '@/components/PageContainer'
import TextContainer from '@/components/sections/textContainer'
import Heading from '@/components/atoms/Heading'

const CookiePage = () => {
  return (
    <PageContainer>
      <TextContainer>
        <div>
          <Heading>Cookiepolitik</Heading>
          <div>
            <Script
              src="https://policy.app.cookieinformation.com/cid.js"
              data-culture="DA"
              id="CookiePolicy"
              strategy="lazyOnload"
              type="text/javascript"
            />
          </div>
        </div>
      </TextContainer>
    </PageContainer>
  )
}

export default CookiePage
