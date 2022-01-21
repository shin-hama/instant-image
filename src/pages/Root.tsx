import * as React from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Toolbar from '@mui/material/Toolbar'

import { Canvas } from 'features/canvas/components/Canvas'
import Navbar from 'features/canvas/components/Navbar'
import { useWindowSize } from 'react-use'
import { useTheme } from '@mui/material/styles'

type ShapeTypeProps = {
  shapeType: string
  setShapeType: React.Dispatch<React.SetStateAction<string>>
}
export const ShapeTypeContext = React.createContext<ShapeTypeProps>({
  shapeType: 'Line',
  setShapeType: () => {
    // no run
  },
})

const Root = () => {
  const [shapeType, setShapeType] = React.useState('Select')
  const [height, setHeight] = React.useState(0)
  const [canvasSize, setCanvasSize] = React.useState({ width: 0, height: 0 })
  const canvasBoxRef = React.useRef<HTMLDivElement>(null)
  const windowSize = useWindowSize()

  const theme = useTheme()

  React.useEffect(() => {
    const toolbarHeight = Number.parseInt(
      theme.mixins.toolbar.minHeight?.toString() || '0'
    )
    setHeight(windowSize.height - toolbarHeight)
  }, [theme.mixins.toolbar.minHeight, windowSize.height])

  React.useEffect(() => {
    if (!canvasBoxRef.current) {
      return
    }
    setCanvasSize({
      width: canvasBoxRef.current.clientWidth,
      height: canvasBoxRef.current.clientHeight,
    })
  }, [canvasBoxRef, height])

  return (
    <Box
      sx={{
        background: 'grey',
        height: '100%',
        display: 'flex',
        flexFlow: 'column',
        flex: 1,
        position: 'relative',
      }}>
      <ShapeTypeContext.Provider value={{ shapeType, setShapeType }}>
        <Navbar />
        <Toolbar />
        <Grid
          container
          sx={{
            flex: '1 1 auto',
          }}>
          <Grid item xs={2}>
            <Box
              sx={{
                background: 'white',
              }}>
              test
            </Box>
          </Grid>
          <Grid item xs={10}>
            <Box
              ref={canvasBoxRef}
              onCopy={() => console.log('handlePaste')}
              onPaste={() => console.log('test')}
              sx={{ height: '100%' }}>
              <Canvas width={canvasSize.width} height={canvasSize.height} />
            </Box>
          </Grid>
        </Grid>
        <></>
      </ShapeTypeContext.Provider>
    </Box>
  )
}

export default Root
