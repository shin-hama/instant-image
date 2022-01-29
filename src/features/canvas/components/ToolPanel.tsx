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
import { UseCanvasSize } from 'features/config/hooks/useCanvasSize'

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

type ZoomSliderProps = {
  canvasSize: UseCanvasSize
}
const ZoomSlider: React.FC<ZoomSliderProps> = ({
  canvasSize: { size, updateScale },
}) => {
  const scale = Math.round(size.scaleX * 100)

  React.useEffect(() => {
    console.log(scale)
    updateScale({ scaleX: scale / 100, scaleY: scale / 100 })
  }, [updateScale, scale])

  const handleChange = (event: Event, newValue: number | number[]) => {
    if (newValue instanceof Array) {
      return
    }
    updateScale({ scaleX: newValue / 100, scaleY: newValue / 100 })
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Stack direction="row" spacing={2} alignItems="center">
        <Slider value={scale} onChange={handleChange} min={1} max={100} />
        <Typography>{scale}%</Typography>
      </Stack>
    </Box>
  )
}

type ToolPanelProps = {
  canvasSize: UseCanvasSize
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
        loadImage(file, canvasSize.size.height, canvasSize.size.width)
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
              <ZoomSlider canvasSize={canvasSize} />
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
