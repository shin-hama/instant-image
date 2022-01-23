import * as React from 'react'

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
    const widthHeight = 11 / 21
    const height = stageHeight * 0.95
    const width = height * widthHeight * 2
    const x = (stageWidth - width) / 2
    const y = (stageHeight - height) / 2

    if (width > stageWidth) {
      console.log('width is over')
    } else {
      setCanvasSize({
        x,
        y,
        width,
        height,
      })
    }
  }, [stageHeight, stageWidth])

  return canvasSize
}
