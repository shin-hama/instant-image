import * as React from 'react'

import { useWindowSize } from 'react-use'

const MARGIN_MAG = 0.9

export type Size = {
  x: number
  y: number
  width: number
  height: number
}
export type CanvasSize = {
  stage: Size
  canvas: Size
}
export const useCanvasSize = (
  container: React.RefObject<HTMLDivElement>
): CanvasSize => {
  const windowSize = useWindowSize()

  const [canvasSize, setCanvasSize] = React.useState<CanvasSize>({
    stage: {
      x: 0,
      y: 0,
      width: 0,
      height: 0,
    },
    canvas: {
      x: 0,
      y: 0,
      width: 0,
      height: 0,
    },
  })

  React.useEffect(() => {
    if (!container.current) {
      return
    }
    const stageWidth = container.current.clientWidth
    const stageHeight = container?.current.clientHeight

    const stage: Size = {
      x: 0,
      y: 0,
      width: stageWidth,
      height: stageHeight,
    }
    const canvas: Size = {
      width: 0,
      height: 0,
      x: 0,
      y: 0,
    }

    const widthHeight = 22 / 21

    // Width / Height の小さい方に合わせてサイズを決める
    canvas.width = stageWidth * MARGIN_MAG
    canvas.height = canvas.width / widthHeight
    if (canvas.height > stageHeight * MARGIN_MAG) {
      canvas.height = stageHeight * MARGIN_MAG
      canvas.width = canvas.height * widthHeight
    }

    canvas.x = (stageWidth - canvas.width) / 2
    canvas.y = (stageHeight - canvas.height) / 2
    setCanvasSize({ stage, canvas })
  }, [container, windowSize.height, windowSize.width])

  return canvasSize
}
