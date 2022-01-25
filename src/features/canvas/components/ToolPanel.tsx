import * as React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Drawer from '@mui/material/Drawer'
import Stack from '@mui/material/Stack'

const ToolPanel = () => {
  const [openSub, setOpenSub] = React.useState(false)
  const mainPanelRef = React.useRef<HTMLDivElement>(null)

  const handleOpen = () => {
    setOpenSub(true)
  }
  const handleClose = () => {
    setOpenSub(false)
  }

  return (
    <>
      <Box
        ref={mainPanelRef}
        sx={{ width: '100vw', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Box
          sx={{
            width: '100%',
            overflow: 'auto',
          }}>
          <Stack direction="row" spacing={2}>
            <Button onClick={handleOpen}>Shape</Button>
            <Button onClick={handleOpen}>Text</Button>
            <Button onClick={handleOpen}>Upload</Button>
            <Button onClick={handleOpen}>Sample</Button>
            <Button onClick={handleOpen}>Sample</Button>
            <Button onClick={handleOpen}>Sample</Button>
          </Stack>
        </Box>
      </Box>
      <Drawer open={openSub} onClose={handleClose} anchor="bottom">
        <Stack direction="row" spacing={2}>
          <Button>hoge</Button>
          <Button>hoge</Button>
          <Button>hoge</Button>
          <Button>hoge</Button>
          <Button>Sample</Button>
          <Button>Sample</Button>
        </Stack>
        <Box sx={{ height: mainPanelRef.current?.clientHeight }}></Box>
      </Drawer>
    </>
  )
}

export default ToolPanel
