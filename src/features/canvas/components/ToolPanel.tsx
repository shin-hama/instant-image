import * as React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Drawer from '@mui/material/Drawer'
import Stack from '@mui/material/Stack'
import {
  Shapes,
  ShapeTypeContext,
  isShape,
} from '../contexts/ShapeTypeProvider'

const ShapePanels = () => {
  const { setShapeType } = React.useContext(ShapeTypeContext)
  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (isShape(event.currentTarget.value)) {
      setShapeType(event.currentTarget.value)
    }
  }

  return (
    <Stack direction="row" spacing={2}>
      {Shapes.map((shape) => (
        <Button key={shape} onClick={handleClick} value={shape}>
          {shape}
        </Button>
      ))}
    </Stack>
  )
}

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
          </Stack>
        </Box>
      </Box>
      <Drawer open={openSub} onClose={handleClose} anchor="bottom">
        <ShapePanels />
        <Box sx={{ height: mainPanelRef.current?.clientHeight }}></Box>
      </Drawer>
    </>
  )
}

export default ToolPanel
