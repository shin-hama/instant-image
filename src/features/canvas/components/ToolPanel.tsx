import * as React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Drawer from '@mui/material/Drawer'
import Slider from '@mui/material/Slider'
import Stack from '@mui/material/Stack'
import {
  Shapes,
  ShapeTypeContext,
  isShape,
} from '../contexts/ShapeTypeProvider'
import Typography from '@mui/material/Typography'

import { useImageLoader } from 'features/canvas/hooks/useImageLoader'
import { Size } from 'features/config/hooks/useCanvasSize'

type ShapePanelsProps = {
  handleClose: () => void
}
const ShapePanels: React.FC<ShapePanelsProps> = ({ handleClose }) => {
  const { setShapeType } = React.useContext(ShapeTypeContext)
  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (isShape(event.currentTarget.value)) {
      setShapeType(event.currentTarget.value)
    }
    handleClose()
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

const ZoomSlider = () => {
  const [scale, setScale] = React.useState(50)
  const handleChange = (event: Event, newValue: number | number[]) => {
    if (newValue instanceof Array) {
      return
    }
    setScale(newValue)
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Stack direction="row" spacing={2} alignItems="center">
        <Slider value={scale} onChange={handleChange} />
        <Typography>{scale}%</Typography>
      </Stack>
    </Box>
  )
}

type ToolPanelProps = {
  canvasSize: Size
}
const ToolPanel: React.FC<ToolPanelProps> = ({ canvasSize }) => {
  const [openSub, setOpenSub] = React.useState(false)
  const mainPanelRef = React.useRef<HTMLDivElement>(null)
  const { setShapeType } = React.useContext(ShapeTypeContext)
  const loadImage = useImageLoader()

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (files.length > 0) {
      files.forEach((file) => {
        loadImage(file, canvasSize.height, canvasSize.width)
      })
    }
  }

  const handleTextClicked = () => {
    setShapeType('Text')
  }

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
        sx={{
          width: '100vw',
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}>
        <Box
          sx={{
            width: '100%',
            pt: 0.4,
            pb: 0.4,
            overflow: 'auto',
          }}>
          <Stack direction="row" spacing={2} alignItems="center">
            <Button onClick={handleOpen}>Shape</Button>
            <Button onClick={handleTextClicked}>Text</Button>
            <Button component="label">
              <input
                accept="image/*"
                multiple
                type="file"
                style={{ display: 'none' }}
                onChange={handleUpload}
              />
              Upload
            </Button>
            <Box sx={{ width: '30%' }}>
              <ZoomSlider />
            </Box>
          </Stack>
        </Box>
      </Box>
      <Drawer open={openSub} onClose={handleClose} anchor="bottom">
        <ShapePanels handleClose={handleClose} />
        <Box sx={{ height: mainPanelRef.current?.clientHeight }}></Box>
      </Drawer>
    </>
  )
}

export default ToolPanel
