import React from 'react'
import ArticlesSection from '@/components/sections/ArticlesSection'
import CallToActionSection from '@/components/sections/CallToActionSection'
import CallToActionSection2 from './sections/CallToActionSection2'
import EventSection from '@/components/sections/EventSection'
import GallerySection from '@/components/sections/GallerySection'
import Hero from '@/components/sections/HeroSection'
import Media from '@/components/sections/MediaSection'
import TextWithIllustration from '@/components/sections/TextWithIllustration'
import EmployeesSection from './sections/EmployeesSection'
import Breadcrumbs from './molecules/Breadcrumbs'
import TextContainer from './sections/textContainer'
import Hero2 from './sections/Hero2Section'
import Hero3 from './sections/Hero3Section'
import LogoGallery from './sections/LogoGallery'
import LogoGallery2 from './sections/LogoGallery2'
import ContactFormSection from './sections/ContactFormSection'
import { Section } from '@/types/PageBuilder.types'

export function renderSection(section: Section) {
    switch (section?._type) {
      case 'EmployeesType':
        return <EmployeesSection section={section} />
      case 'CallToAction':
        return <CallToActionSection section={section} />
      case 'CallToAction2':
        return <CallToActionSection2 section={section} />
      case 'hero':
        return (
          <React.Fragment>
            <Hero data={section} />
          </React.Fragment>
        )
      case 'Hero2':
        return (
          <React.Fragment >
            <Hero2 data={section} />
          </React.Fragment>
        )
      case 'Hero3':
        return (
          <React.Fragment >
            <Hero3 data={section} />
          </React.Fragment>
        )
      case 'LogoGallery':
        return (
          <React.Fragment >
            <LogoGallery data={section} />
          </React.Fragment>
        )
      case 'LogoGallery2':
        return (
          <React.Fragment >
            <LogoGallery2 data={section} />
          </React.Fragment>
        )
  
      case 'textWithIllustration':
        return <TextWithIllustration data={section} />
      case 'contactFormType':
        return <ContactFormSection data={section} />
      case 'Gallery':
        return <GallerySection section={section} />
      case 'ArticlesType':
        return (
          <ArticlesSection
  
            section={section}
            amount={section.amount}
          />
        )
      case 'EventType':
        return (
          <EventSection
            amount={section.amount}
            section={section}
  
          />
        )
        case 'textContainer':
          return (
            <TextContainer data={section} />
          )    
      default:
        return null
    }
  }