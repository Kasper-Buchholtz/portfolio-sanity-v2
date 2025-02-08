'use client'
import React from 'react'
import ReactPlayer from 'react-player'
import Photo from '../atoms/Photo'
import Video from '../atoms/Video'
import { clean } from '@/utils/sanitize'

/**
 * @returns: A media component that can display images, videos, or Vimeo videos, with optional popup functionality.
 * @example: <Media data={mediaData} showInPopup={true} />
 * @alias: MediaComponent
 * @summary: This component is used to display media content such as images, videos, or Vimeo videos. It supports displaying media in a popup modal.
 * @version: 2.0.0
 * @property: [data] - The media data object containing image, video, or Vimeo information.
 * @property: [showInPopup] - A boolean indicating whether to display the video in a popup modal.
 * @author: Kasper Buchholtz & Emilie Hjøllund
 **/

interface MediaProps {
  data: any
  showInPopup?: boolean
}

const Media = ({ data, showInPopup }: MediaProps) => {
  const image = data?.imageObject?.image
  const videoObject = data?.videoObject
  const video = data?.videoObject?.video
  const thumbnail = data?.videoObject?.image
  const vimeoObject = data?.vimeoObject

  return (
    <>
      {(() => {
        switch (clean(data.select)) {
          case 'image':
            return <Photo image={image} />
          case 'video':
            return <Video showInPopup={showInPopup} video={video} thumbnail={thumbnail} />
          case 'vimeo':
            return <ReactPlayer url={vimeoObject?.url} />
          default:
            return null
        }
      })()}
    </>

  )
}

export default Media