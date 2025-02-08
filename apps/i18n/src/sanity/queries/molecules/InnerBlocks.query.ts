import { groq } from "next-sanity";
import { ButtonQuery } from "@/sanity/queries/atoms/Button.query";

export const InnerBlocksQuery = groq`
      innerBlocks[]{
        ...,
        _type == "button" => {
          ${ButtonQuery}
        },
      }
`