import React from "react";
import Section from '@/components/sections/Section';
import { TextContainerProps } from '@/types/TextContainer.types';
import InnerBlocks from "../molecules/InnerBlocks";
/**
 *
 * @returns: En tekstcontainer.
 * @example: <TextContainer data={data} /> || <TextContainer data={data} asChild>Children</TextContainer>
 * @alias: TextContainer
 * @summary: Denne komponent bruges til at vise en tekstcontainer.
 * @version: 2.0.0
 * @property: [data, children, asChild, paddingX, paddingTop, paddingBottom]
 * @author: Kasper Buchholtz
 *
**/



const TextContainer: React.FC<TextContainerProps> = ({ data, asChild = false, children, paddingX, paddingTop, paddingBottom }) => {
  return (
    <Section
    variant="muted"
      data={data}
    >
      <div className="col-span-full">
        {asChild ? (
          <div>
            {children}
          </div>
        ) : (
          <InnerBlocks index={12} blocks={data?.innerBlocks} />
        )}
      </div>
    </Section>
  );
};

export default TextContainer;