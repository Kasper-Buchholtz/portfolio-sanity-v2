import groq from 'groq'
import { pageBuilderQuery } from '@/sanity/queries/organisms/PageBuilder.query'
import { ImageQuery } from '@/sanity/queries/atoms/Image.query'

// GROQ Navigation Query
export const NAVIGATION_QUERY = groq`
*[_type == "navigation" && locale == $locale][0] {
  locale,
  links[] {
    link {
      ...,
      internalLink-> {
        _type,
        slug,
        title,
        locale,
        "_translations": *[_type == "translation.metadata" && references(^._id)].translations[].value-> {
          title,
          slug,
          locale,
          _type
        }
      }
    },
    "links": subLinks[] {
      "link": {
        ...,
        internalLink-> {
          _type,
          slug,
          locale,
          title,
          "_translations": *[_type == "translation.metadata" && references(^._id)].translations[].value-> {
            title,
            slug,
            locale,
            _type
          }
        }
      }
    }
  }
}

`
// GROQ Seo Query
export const SEO_QUERY = groq` // Inuse
seoGroup {
  "image": seoImage.asset->.url,
  ...
}
`

// GROQ event Query
export const EVENT_QUERY = groq`
*[_type == "event" && slug.current == $slug][0] {
  ...,
  _type,
  "localeInfo": {
    locale,
    "_translations": *[_type == "translation.metadata" && references(^._id)].translations[].value->{
      title,
      _type,
      slug,
      locale
    },
  },
  ${SEO_QUERY},
  ${pageBuilderQuery},
  image{
    ${ImageQuery}
  }
}
`

// GROQ Page Query
export const PAGE_QUERY = groq`
*[_type == "page" && slug.current == $slug && locale == $locale][0] {
  ...,
  "localeInfo": {
    locale,
    "_translations": *[_type == "translation.metadata" && references(^._id)].translations[].value->{
      title,
      _type,
      slug,
      locale
    },
  },
  _type,
  ${SEO_QUERY},
  ${pageBuilderQuery},
  image {
    ...,
    asset-> {
      ...,
      _id,
      url,
      _type,
      altText,
      description,
      title,
      metadata {
        blurHash,
        dimensions
      }
    }
  }
}
`
// GROQ Article Query
export const ARTICLE_QUERY = groq`
*[_type == "article" && slug.current == $slug][0] {
  ...,
  "localeInfo": {
    locale,
    "_translations": *[_type == "translation.metadata" && references(^._id)].translations[].value->{
      title,
      _type,
      slug,
      locale
    },
  },

  _type,
  ${SEO_QUERY},
  ${pageBuilderQuery},
  image {
    ...,
    asset-> {
      ...,
      _id,
      url,
      _type,
      altText,
      description,
      title,
      metadata {
        blurHash,
        dimensions
      }
    }
  }
}
`
// GROQ Footer Query
export const FOOTER_QUERY = groq`
    *[_type == "footer" && locale == $locale][0] {
      title,
      locale,
      logo {
       ${ImageQuery}
      },
      object {
        companyName,
        adressBook{
          street,
          zip
        },
        telephone,
        email,
        cvr
      },
      social[] {
        platform,
        url
      },
      openingHours[] {
        day,
        hours
      }
    }
`

// GROQ Settings Query
export const SITE_SETTINGS_QUERY = groq`
*[_type == "settings" && locale == $locale][0] {
  ...,
  bodyScripts,
  siteTitle,
  siteDescription,
  footerScripts,
  headScripts,
  googleTagManager {
    id,
    verification,
  }
}
`

// GROQ All Slugs for sitemap
export const allSlugsQuery = `
*[defined(slug.current)][]{
  "slug":slug.current,
  _type,
  _updatedAt,
  locale,
}
`
