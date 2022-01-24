import * as React from 'react'
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Stack from "@mui/material/Stack"

const ToolPanel = () => {
  return (
    <Box>
      <Stack direction="row" spacing={2}>
        <Button>Hoge</Button>
        <Button>Bar</Button>
        <Button>Upload</Button>
      </Stack>
    </Box>
  )
}

export default ToolPanel
