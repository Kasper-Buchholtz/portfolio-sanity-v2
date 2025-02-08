import { Album, ImageRectangle } from "@mynaui/icons-react";
import { defineField, defineType } from "sanity";
export const Gallery = defineType({
  name: "Gallery",
  type: "object",
  title: "Galleri",
  icon: ImageRectangle,
  fields: [
    {
      name: "images",
      type: "array",
      title: "Images",
      of: [
        {
          name: "image",
          type: "image",
          title: "Image",
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: "alt",
              type: "string",
              title: "Alternative text",
            },
          ],
        },
      ],
      options: {
        layout: "grid",
      },
    },
    defineField({
      name: "design",
      title: "Design",
      type: "design",
    }),
    
    defineField({
      name: "SectionSettings",
      title: "Indstillinger",
      type: "SectionSettings",
    }),
  ],
  preview: {
    select: {
      images: "images",
      image: "images.0",
    },
    prepare(selection) {
      const { images, image } = selection;

      return {
        title: `Galleri med ${Object.keys(images).length} billeder`,
        subtitle: `Galleri `,
        media: image,
      };
    },
  },
});
