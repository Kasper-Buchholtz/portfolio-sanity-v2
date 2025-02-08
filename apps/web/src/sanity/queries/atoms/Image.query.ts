import groq from "groq";
export const ImageQuery = groq`
  asset-> {
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
  },
  crop {
    top,
    left,
    bottom,
    _type,
    right

  },
  hotspot {
    _type,
    width,
    x,
    y,
    height
  }
`;