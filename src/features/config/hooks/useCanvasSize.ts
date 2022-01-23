import * as React from 'react'

const MARGIN_MAG = 0.9

type CanvasSize = {
  x: number
  y: number
  width: number
  height: number
}

export const useCanvasSize = (
  stageWidth: number,
  stageHeight: number
): CanvasSize => {
  const [canvasSize, setCanvasSize] = React.useState<CanvasSize>({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  })

  React.useEffect(() => {
    const widthHeight = 22 / 21
    const size: CanvasSize = {
      width: 0,
      height: 0,
      x: 0,
      y: 0,
    }

    // Width / Height の小さい方に合わせてサイズを決める
    size.width = stageWidth * MARGIN_MAG
    size.height = size.width / widthHeight
    if (size.height > stageHeight * MARGIN_MAG) {
      size.height = stageHeight * MARGIN_MAG
      size.width = size.height * widthHeight
    }

    size.x = (stageWidth - size.width) / 2
    size.y = (stageHeight - size.height) / 2
    setCanvasSize(size)
  }, [stageHeight, stageWidth])

  return canvasSize
}
