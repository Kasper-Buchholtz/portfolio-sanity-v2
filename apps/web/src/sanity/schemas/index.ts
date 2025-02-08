import { SchemaTypeDefinition } from 'sanity'
import { IconPicker } from './sections/atoms/IconPickerInput.schema'
import blockContent from './blockContent.schema'

import category from './management/category.schema'
import employee from './management/employee.schema'
import position from './management/position.schema'
import article from './documents/article.schema'
import event from './documents/event.schema'
import page from './documents/page.schema'
import { ArticlesType } from './sections/ArticlesType.schema'
import { accordionType } from './sections/atoms/accordionType.schema'
import { buttonType } from './sections/atoms/ButtonType.schema'
import { figureType } from './sections/atoms/figureType.schema'
import { headingType } from './sections/atoms/headingType.schema'
import { textType } from './sections/atoms/textType.schema'
import { CallToAction } from './sections/callToAction.schema'
import { CallToAction2 } from './sections/CallToAction2.schema'
import { contactFormType } from './sections/contactForm.schema'
import { EmployeesType } from './sections/EmployeesType.schema'
import { EventType } from './sections/EventsType.schema'
import { formType } from './sections/formType.schema'
import { Gallery } from './sections/GalleryType.schema'
import { LogoGallery } from './sections/LogoGalleryType.schema'
import { LogoGallery2 } from './sections/LogoGallery2Type.schema'
import { innerBlocks } from './sections/innerBlocks.schema'
import { MediaType } from './sections/MediaType.schema'
import { pageBuilder } from './sections/pageBuilder.schema'
import { Color } from './sections/settings/Color.schema'
import { Design } from './sections/settings/Design.schema'
import { Media } from './sections/settings/Media.schema'
import { Padding } from './sections/settings/Padding.schema'
import { SectionSettings } from './sections/settings/SectionSettings.schema'
import { Seo } from './sections/settings/Seo.schema'
import { textContainerType } from './sections/textContainerType.schema'
import { textWithIllustration } from './sections/textWithIllustration.schema'
import { videoType } from './sections/videoType.schema'
import footer from './settings/footer.schema'
import navigation from './settings/navigation.schema'
import settings from './settings/settings.schema'
import redirects from './settings/redirects.schema'
import { heroType } from './sections/herotype.schema'
import { Hero2Type } from './sections/Hero2Type.schema'
import { Hero3Type } from './sections/Hero3Type.schema'
import { MediaObject } from './sections/atoms/MediaObject.schema'

export const schemaTypes = [
  heroType,
  Hero2Type,
  Hero3Type,
  textWithIllustration,
  formType,
  videoType,
  textContainerType,
  EmployeesType,
  blockContent,
  contactFormType,
  EventType,
  ArticlesType,
  Gallery,
  LogoGallery,
  LogoGallery2,
  MediaType,
  CallToAction,
  CallToAction2,
  IconPicker,
  // atoms
  figureType,
  headingType,
  accordionType,
  MediaObject,
  textType,
  buttonType,
  // Settings Sections
  Design,
  Media,
  pageBuilder,
  innerBlocks,
  Padding,
  Color,
  Seo,
  SectionSettings,
]

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    // Pages
    page,
    event,
    article,
    position,
    employee,
    // Management
    settings,
    redirects,
    footer,
    navigation,
    heroType,
    Hero2Type,
    Hero3Type,
    category,
    // Objects
    blockContent,
    Gallery,
    LogoGallery,
    LogoGallery2,
    CallToAction,
    CallToAction2,
    ArticlesType,
    IconPicker,
    textWithIllustration,
    formType,
    videoType,
    textContainerType,
    EmployeesType,
    contactFormType,
    EventType,
    MediaType,
    // Atoms
    figureType,
    headingType,
    accordionType,
    MediaObject,
    textType,
    buttonType,
    /*  */
    pageBuilder,
    Design,
    Seo,
    Media,
    Padding,
    Color,
    innerBlocks,
    SectionSettings,
  ],
}
