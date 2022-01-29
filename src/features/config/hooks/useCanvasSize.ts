import * as React from 'react'

import { useWindowSize } from 'react-use'
import { Vector2d } from 'konva/lib/types'

type Size = {
  height: number
  width: number
}
type Scale = {
  scaleX: number
  scaleY: number
}
export type CanvasSize = Size & Vector2d & Scale
export type StageSize = Size & Vector2d

const initSize = () => ({
  height: 0,
  width: 0,
  x: 0,
  y: 0,
})
const initScale = () => ({
  scaleX: 1,
  scaleY: 1,
})

export const useStageSize = (container: React.RefObject<HTMLDivElement>) => {
  const [stageSize, setStageSize] = React.useState<StageSize>({
    ...initSize(),
  })
  const windowSize = useWindowSize()

  React.useEffect(() => {
    if (!container.current) {
      return
    }
    const stageWidth = container.current.clientWidth
    const stageHeight = container?.current.clientHeight

    // Stage のサイズは Scale に依存せず、画面サイズに一致するようにする
    setStageSize({
      height: stageHeight,
      width: stageWidth,
      x: 0,
      y: 0,
    })
  }, [container, setStageSize, windowSize.height, windowSize.width])

  return stageSize
}

const MARGIN_MAG = 0.9
const DPI = 300
const REAL_WIDTH = 220 // mm
const REAL_HEIGHT = 210 // mm
const MM_PER_INCH = 25.4 // mm/inch
const WIDTH = (DPI * REAL_WIDTH) / MM_PER_INCH
const HEIGHT = (DPI * REAL_HEIGHT) / MM_PER_INCH

export interface UseCanvasSize {
  readonly size: CanvasSize
  updateScale: (newScale: Scale) => void
}
export const useCanvasSize = (stage: StageSize): UseCanvasSize => {
  const [canvasSize, setCanvasSize] = React.useState<CanvasSize>({
    ...initSize(),
    ...initScale(),
  })

  React.useEffect(() => {
    const widthHeight = REAL_WIDTH / REAL_HEIGHT
    let displayWidth = stage.width * MARGIN_MAG
    let displayHeight = displayWidth / widthHeight
    // 高さが Stage の高さに収まらない場合は、高さが収まるように幅を調整する
    if (displayHeight > stage.height * MARGIN_MAG) {
      displayHeight = stage.height * MARGIN_MAG
      displayWidth = displayHeight * widthHeight
    }

    const scale = {
      x: displayWidth > 0 ? displayWidth / WIDTH : 0.01,
      y: displayHeight > 0 ? displayHeight / HEIGHT : 0.01,
    }

    // Canvas のサイズは Scale パラメータで調整されるので印刷用のサイズを使う
    setCanvasSize({
      height: HEIGHT,
      width: WIDTH,
      x: (stage.width - displayWidth) / 2 / scale.x,
      y: (stage.height - displayHeight) / 2 / scale.y,
      scaleX: scale.x,
      scaleY: scale.y,
    })
  }, [stage.height, stage.width])

  const updateScale = React.useCallback((newScale: Scale) => {
    console.log('update: ' + newScale.scaleX)
    setCanvasSize((prev) => ({
      ...prev,
      ...newScale,
    }))
  }, [])

  return { size: canvasSize, updateScale }
}
