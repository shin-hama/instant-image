import * as React from 'react'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'

import { Canvas } from 'features/canvas/components/Canvas'
import Navbar from 'features/canvas/components/Navbar'
import ToolPanel from 'features/canvas/components/ToolPanel'
import { useCanvasSize } from 'features/config/hooks/useCanvasSize'

const Root = () => {
  const canvasBoxRef = React.useRef<HTMLDivElement>(null)
  const canvasSize = useCanvasSize(canvasBoxRef)

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
          <Canvas canvasSize={canvasSize} />
        </Box>
      </Box>
      <ToolPanel canvasSize={canvasSize.canvas} />
    </Box>
  )
}

export default Root
