"use client"

import React from 'react'
import { createDataAttribute, useOptimistic } from '@sanity/visual-editing'
import { PageBuilderProps, PageData, Section } from '@/types/PageBuilder.types'
import { renderSection } from './sections';
import { randomKey } from '@/utils/randomKey';
import { cva, VariantProps } from 'class-variance-authority';
import { cn } from '@/utils/twMerge';

const sanityConfig = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || '',
};


const PageBuilderVariant = cva('', {
  variants: {
    gridPlacement: {
      2: 'col-start-2 col-end-2',
      increased: 'grid-cols-3 grid gap-3',
      none: 'none',
    },
  },
  defaultVariants: {
    gridPlacement: 2,
  },
})
type ExtendedPageBuilderProps = PageBuilderProps & VariantProps<typeof PageBuilderVariant>

export function PageBuilder({
  sections: initialSections,
  documentId,
  documentType,
  gridPlacement,
  className=""
}: ExtendedPageBuilderProps) {
  const sections = useOptimistic<Section[], PageData>(
    initialSections,
    (currentSections, action) => {
      if (action.id !== documentId) {
        return currentSections;
      }

      if (action.document.sections) {
        return action.document.sections;
      }

      return currentSections;
    }
  );


  return (
    <div
        className={`min-h-screen space-y-3 ${cn(PageBuilderVariant({ gridPlacement, className }))}`}
  
      data-sanity={createDataAttribute({
        ...sanityConfig,
        id: documentId,
        type: documentType,
        path: 'pageBuilder',
      }).toString()}
    >
      {sections.map((section) => (
        <div
          key={section._key || randomKey()}
          data-sanity={createDataAttribute({
            ...sanityConfig,
            id: documentId,
            type: documentType,
            path: `pageBuilder[_key=="${section._key}"]`,
          }).toString()}
        >
          {renderSection(section)}
        </div>
      ))}
    </div>
  )
}

