import { useTheme } from '@mui/material/styles'
import { useWindowSize } from 'features/canvas/hooks/useWindowSize'
import * as React from 'react'

type CanvasSize = {
  x: number
  y: number
  width: number
  height: number
}

export const useCanvasSize = (): CanvasSize => {
  const theme = useTheme()
  const windowSize = useWindowSize()
  const [canvasSize, setCanvasSize] = React.useState<CanvasSize>({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  })

  React.useEffect(() => {
    const widthHeight = 11 / 21
    const toolbarHeight = Number.parseInt(
      theme.mixins.toolbar.minHeight?.toString() || '0'
    )
    const height = (windowSize.height - toolbarHeight) * 0.9
    const width = height * widthHeight * 2
    const x = (windowSize.width - width) / 2
    const y = (windowSize.height + toolbarHeight - height) / 2

    if (width > windowSize.width) {
      console.log('width is over')
    } else {
      setCanvasSize({
        x,
        y,
        width,
        height,
      })
    }
  }, [theme, windowSize.height, windowSize.width])

  return canvasSize
}
