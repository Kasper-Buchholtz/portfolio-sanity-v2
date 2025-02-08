import { TextJustify } from "@mynaui/icons-react";
import { defineField, defineType } from "sanity";
export const textType = defineType({
  name: "textBlock",
  type: "object",
  icon: TextJustify,
  description: 'Tekstblokken anvendes til generel brødtekst, der giver brugeren den relevante information. Afsnittene anbefales at være kortfattede og opdelte med bl.a. overskrifter og medier.',
  title: "Brødtekst",
  fields: [
    defineField({
      name: "body",
      title: "Brødtekst",
      type: "blockContent",
    }),
  ],
  preview: {
    select: {
      title: 'title.heading',
    },
    prepare({title}) {
      return {
        title: title || 'Brødtekst',
        subtitle: 'Brødtekst',
      }
    },
  },
});
