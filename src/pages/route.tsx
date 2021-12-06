import * as React from 'react'
import Box from '@mui/material/Box'

import Canvas from 'features/canvas/components/Canvas'
import Navbar from 'features/canvas/components/Navbar'

const Route = () => {
  return (
    <Box>
      <Navbar />
      <Canvas />
    </Box>
  )
}

export default Route
