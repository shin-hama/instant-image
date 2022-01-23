import * as React from 'react'
import { Image as KonvaImage } from 'react-konva'

import { useShapes } from '../contexts/ShapesProvider'
import { useWindowSize } from 'react-use'

export const useImageLoader = (width: number, height: number) => {
  const [maxWidth, setMaxWidth] = React.useState(width)
  const [maxHeight, setMaxHeight] = React.useState(height)
  const [, actions] = useShapes()
  const windowSize = useWindowSize()

  React.useEffect(() => {
    setMaxWidth(width)
    setMaxHeight(height)
  }, [width, height])

  const handleLoad = React.useCallback(async (src: string) => {
    return await new Promise<HTMLImageElement>((resolve, reject) => {
      const img = new window.Image()
      img.src = src

      img.onload = () => {
        resolve(img)
      }
      img.onerror = reject
    })
  }, [])

  const pushImage = React.useCallback(
    (image: HTMLImageElement) => {
      const size = {
        width: image.width,
        height: image.height,
      }
      // 最大サイズを超えている場合は、はみ出ないサイズに調整
      if (size.width > maxWidth || size.height > maxHeight) {
        if (size.width > size.height) {
          size.height = (maxWidth * size.height) / size.width
          size.width = maxWidth
        } else {
          size.width = (maxHeight * size.width) / size.height
          size.height = maxHeight
        }
      }

      actions.push(
        <KonvaImage
          draggable
          image={image}
          // TODO: Window size ではなく Canvas Size の中央に配置するようにする
          // Window size の変化に対する依存をへらすため
          x={(windowSize.width - maxWidth) / 2}
          y={(windowSize.height - maxHeight) / 2}
          width={size.width}
          height={size.height}
        />
      )
    },
    [actions, maxHeight, maxWidth, windowSize.height, windowSize.width]
  )

  const loadImage = React.useCallback(
    async (file: File) => {
      const url = URL.createObjectURL(file)
      if (url) {
        const image = await handleLoad(url)
        pushImage(image)
      }
      URL.revokeObjectURL(url)
    },
    [handleLoad, pushImage]
  )

  return loadImage
}
