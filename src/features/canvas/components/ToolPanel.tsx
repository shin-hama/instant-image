import * as React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'

const ToolPanel = () => {
  return (
    <Box sx={{ width: '100vw' }}>
      <Box sx={{ width: '100%', overflow: 'auto' }}>
        <Stack direction="row" spacing={2}>
          <Button>Sample</Button>
          <Button>Sample</Button>
          <Button>Sample</Button>
          <Button>Sample</Button>
          <Button>Sample</Button>
          <Button>Sample</Button>
        </Stack>
      </Box>
    </Box>
  )
}

export default ToolPanel
