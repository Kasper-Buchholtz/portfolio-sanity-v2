import { LinkOne } from "@mynaui/icons-react";
import { defineField, defineType } from "sanity";
// import { ButtonIcon } from "@/components/sanity/PageBuilderIcons";
export const buttonType = defineType({
  name: "button",
  type: "object",
  groups: [{ title: "Design", name: "design" }, { title: "Indhold", name: "content"}],
  description:
    "Knappen er et visuelt iøjnefaldende link på hjemmesiden, og kan bruges til at udføre en specifik handling. F.eks. at føre brugeren videre til ny side.",
  title: "Knap",
  icon: LinkOne,
  fields: [
    defineField({
      group: "content",
      name: "link",
      title: "Link",
      type: "link",
    }),

    defineField({
      group: "design",
      description: "Vælg en stil for knappen",
      name: "style",
      type: "string",
      title: "Stil",
      options: {
        layout: "radio",
        list: [
          { title: "Primær", value: "primary" },
          { title: "Sekundær", value: "secondary" },
          { title: "Gennemsigtig", value: "ghost" },
        ],
      },
      initialValue: "primary",
    }),
  ],
  preview: {
    select: {
      title: "link.label",
      subtitle: "style",
      url: "link.url",
      internalLink: "link.internalLink",
    },
    prepare({ title, subtitle, url, internalLink }) {
      return {
        title: title.charAt(0).toUpperCase() + title.slice(1),
        subtitle: `${subtitle.charAt(0).toUpperCase() + subtitle.slice(1)} | ${url || internalLink._ref}`,
      };
    },
  }
});
