import * as React from 'react'

import { useWindowSize } from 'react-use'

const MARGIN_MAG = 0.9
const DPI = 300
const REAL_WIDTH = 220 // mm
const REAL_HEIGHT = 210 // mm
const MM_PER_INCH = 25.4 // mm/inch
const WIDTH = (DPI * REAL_WIDTH) / MM_PER_INCH
const HEIGHT = (DPI * REAL_HEIGHT) / MM_PER_INCH

export type Size = {
  height: number
  width: number
  x: number
  y: number
}
export type CanvasSize = {
  stage: Size
  canvas: Size
  scale: {
    x: number
    y: number
  }
}

export const useCanvasSize = (
  container: React.RefObject<HTMLDivElement>
): CanvasSize => {
  const windowSize = useWindowSize()

  const [canvasSize, setCanvasSize] = React.useState<CanvasSize>({
    stage: {
      height: 0,
      width: 0,
      x: 0,
      y: 0,
    },
    canvas: {
      height: 0,
      width: 0,
      x: 0,
      y: 0,
    },
    scale: {
      x: 1,
      y: 1,
    },
  })

  React.useEffect(() => {
    if (!container.current) {
      return
    }
    const stageWidth = container.current.clientWidth
    const stageHeight = container?.current.clientHeight

    const widthHeight = REAL_WIDTH / REAL_HEIGHT
    let displayWidth = stageWidth * MARGIN_MAG
    let displayHeight = displayWidth / widthHeight
    if (displayHeight > stageHeight * MARGIN_MAG) {
      displayHeight = stageHeight * MARGIN_MAG
      displayWidth = displayHeight * widthHeight
    }

    const scale = {
      x: displayWidth / WIDTH,
      y: displayHeight / HEIGHT,
    }

    // Stage のサイズは Scale に依存せず、画面サイズに一致するようにする
    const stage: Size = {
      height: stageHeight,
      width: stageWidth,
      x: 0,
      y: 0,
    }
    // Canvas 内のサイズは Scale パラメータで調整されるので印刷時のサイズを使う
    const canvas: Size = {
      height: HEIGHT,
      width: WIDTH,
      x: (stageWidth - displayWidth) / 2 / scale.x,
      y: (stageHeight - displayHeight) / 2 / scale.y,
    }
    setCanvasSize({ stage, canvas, scale })
  }, [container, windowSize.height, windowSize.width])

  return canvasSize
}
