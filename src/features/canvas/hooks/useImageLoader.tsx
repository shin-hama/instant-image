import * as React from 'react'
import { Image as KonvaImage } from 'react-konva'

import { useShapes } from '../contexts/ShapesProvider'

export const useImageLoader = () => {
  const [, actions] = useShapes()

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
    (image: HTMLImageElement, height: number, width: number) => {
      const size = {
        width: image.width,
        height: image.height,
      }
      const maxHeight = height * 0.6
      const maxWidth = width * 0.6
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
          // TODO: キャンバスサイズから描画位置を計算しているが、
          // x, y は Stage 座標に変換する必要がある
          x={(width - size.width) / 2}
          y={(height - size.height) / 2}
          width={size.width}
          height={size.height}
        />
      )
    },
    [actions]
  )

  const loadImage = React.useCallback(
    async (file: File, height: number, width: number) => {
      const url = URL.createObjectURL(file)
      if (url) {
        const image = await handleLoad(url)
        pushImage(image, height, width)
      }
      URL.revokeObjectURL(url)
    },
    [handleLoad, pushImage]
  )

  return loadImage
}
