'use client'
import '@/styles/studio.css'
import { daDKLocale } from '@sanity/locale-da-dk'
import { visionTool } from '@sanity/vision'
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { unsplashImageAsset } from 'sanity-plugin-asset-source-unsplash'
import { media, mediaAssetSource } from 'sanity-plugin-media'
import { apiVersion, dataset, projectId } from '@/sanity/lib/sanity.api'
import { schema } from '@/sanity/schemas'
import { linkField } from '@repo/link-field'
import { theme as _theme } from './theme'
import { structure } from './src/sanity/structure'
import * as resolve from '@/sanity/lib/sanity.resolve'
import { presentationTool } from 'sanity/presentation'
import SuperegoLogo from '@/components/sanity/SuperegoLogo'
import { dashboardTool } from '@sanity/dashboard'
import HeroWidget from '@/components/sanity/HeroWidget'
import BannerWidget from '@/components/sanity/BannerWidget'
import NewsWidget from '@/components/sanity/NewsWidget'
import ProjectManagerWidget from '@/components/sanity/ProjectManagerWidget'
import SuperegoWidget from '@/components/sanity/SuperegoWidget'
import LinksWidget from '@/components/sanity/LinksWidget'
import { DocumentStatus } from '@/sanity/lib/sanity.badge'
import { CustomToolMenu } from '@/components/sanity/ToolMenu'
import { createVisualAction } from '@/sanity/actions/sanity.actions'
import { myTheme } from '@/sanity/lib/sanity.theme'
import { pages } from '@repo/sanity-studio/src/plugins/navigator/index'
import {
  documentInternationalization,
} from '@sanity/document-internationalization'
import Appconfig from 'config'



export default defineConfig({
  basePath: '/super-login',
  name: 'project-name',
  title: 'Superweb Studio',
  subtitle: 'Superweb Studio',
  projectId,
  theme: myTheme,
  icon: SuperegoLogo,
  dataset,
  schema: schema,
  studio: {
    components: { toolMenu: CustomToolMenu },
  },
  plugins: [
    dashboardTool({
      title: 'Startside',
      widgets: [
        {
          name: 'HeroWidget',
          component: HeroWidget,
          layout: { width: 'full' }, // You can adjust the layout width ('small', 'medium', 'full')
        },
        {
          name: 'BannerWidget',
          component: BannerWidget,
          layout: { width: 'full' }, // You can adjust the layout width ('small', 'medium', 'full')
        },
        {
          name: 'links',
          component: LinksWidget,
          layout: { width: 'auto', height: 'large' },
        },
        {
          name: 'NewsWidget',
          component: NewsWidget,
          layout: { width: 'medium', height: 'large' }, // You can adjust the layout width ('small', 'medium', 'full')
        },
        {
          name: 'ProjectManagerWidget',
          component: ProjectManagerWidget,
          layout: { width: 'medium', height: 'medium' }, // You can adjust the layout width ('small', 'medium', 'full')
        },
        {
          name: 'SuperegoWidget',
          component: SuperegoWidget,
          layout: { width: 'medium', height: 'auto' }, // You can adjust the layout width ('small', 'medium', 'full')
        },
      ],
    }),
    structureTool({ structure, title: 'Indhold' }),

    documentInternationalization({
      // Required configuration
      supportedLanguages: [
        ...Appconfig.i18n.locales
      ],
      schemaTypes: ['page', 'navigation', 'footer', 'settings', 'article', 'event'],
      languageField: 'locale',
    }),
    pages({
      i18n: Appconfig.i18n,
      title: 'Visuel redigering',
      resolve,
      previewUrl: {
        previewMode: {
          enable: '/api/draft-mode/enable',
        },
      },
      creatablePages: [
        {
          title: 'Sider',
          type: 'page',
        },
        {
          title: 'Artikler',
          type: 'article',
        },
        {
          title: 'Event',
          type: 'event',
        },
      ],
    }),

    media({
      creditLine: {
        enabled: true,
        excludeSources: ['unsplash'],
      },
      maximumUploadSize: 10000000,
    }),

    visionTool({ defaultApiVersion: apiVersion, title: 'Udviklingsværktøj' }),
    daDKLocale({ title: 'Dansk' }),
    unsplashImageAsset(),
    linkField({
      linkableSchemaTypes: ['page', 'event', 'article'],
    }),
  ],
  document: {
    actions: (prev, context) =>
      prev.map((originalAction) =>
        originalAction.action === 'publish'
          ? (props) => {
              const action = createVisualAction(originalAction)(props)
              return {
                ...action,
                tone: 'positive', // Ensure tone is one of the allowed types
                label: action?.label || 'Publish', // Ensure label is defined
              }
            }
          : originalAction,
      ),

    badges: (prev, context) => {
      if (
        context.schemaType === 'page' ||
        context.schemaType === 'article' ||
        context.schemaType === 'events'
      ) {
        return [DocumentStatus, ...prev]
      }
      return prev
    },
  },
  form: {
    // Don't use this plugin when selecting files only (but allow all other enabled asset sources)
    file: {
      assetSources: (previousAssetSources) => {
        return previousAssetSources.filter(
          (assetSource) => assetSource !== mediaAssetSource,
        )
      },
    },
  },
})
