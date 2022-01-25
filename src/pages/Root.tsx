import * as React from 'react'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'

import { Canvas } from 'features/canvas/components/Canvas'
import Navbar from 'features/canvas/components/Navbar'
import { useWindowSize } from 'react-use'
import ToolPanel from 'features/canvas/components/ToolPanel'

const Root = () => {
  const [canvasSize, setCanvasSize] = React.useState({ width: 0, height: 0 })
  const canvasBoxRef = React.useRef<HTMLDivElement>(null)
  const windowSize = useWindowSize()

  React.useEffect(() => {
    if (!canvasBoxRef.current) {
      return
    }

    setCanvasSize({
      width: canvasBoxRef.current.clientWidth,
      height: canvasBoxRef.current.clientHeight,
    })
  }, [canvasBoxRef, windowSize.height, windowSize.width])

  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        position: 'relative',
      }}>
      <Navbar />
      <Toolbar />
      <Box
        sx={{
          background: 'grey',
          height: '100%',
          width: '100%',
          position: 'relative',
          flex: '1 1 0%',
        }}>
        <Box
          ref={canvasBoxRef}
          onCopy={() => console.log('handlePaste')}
          onPaste={() => console.log('test')}
          sx={{
            position: 'absolute',
            height: '100%',
            width: '100%',
            overflow: 'hidden auto',
          }}>
          <Canvas width={canvasSize.width} height={canvasSize.height} />
        </Box>
      </Box>
      <ToolPanel></ToolPanel>
    </Box>
  )
}

export default Root
