import * as React from 'react'
import { styled } from '@mui/material'
import AppBar from '@mui/material/AppBar'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Toolbar from '@mui/material/Toolbar'

import { StageRef } from 'contexts/StageRefProvider'
import { useConfigEditor } from 'features/config/contexts/ConfigEditorProvider'
import { Size } from 'features/config/hooks/useCanvasSize'

const FlexDiv = styled('div')((theme) => ({
  flexGrow: 1,
}))

type Props = {
  canvasSize: Size
}
const Navbar: React.FC<Props> = ({ canvasSize }) => {
  const stageRef = React.useContext(StageRef)
  const handleDownload = () => {
    if (stageRef?.current) {
      const dataUrl = stageRef.current.toDataURL({
        x: canvasSize.x,
        y: canvasSize.y,
        width: canvasSize.width,
        height: canvasSize.height,
      })
      const link = document.createElement('a')
      link.download = 'stage.png'
      link.href = dataUrl
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  const setOpenConfigEditor = useConfigEditor()

  const handleOpenConfigEditor = () => {
    setOpenConfigEditor(true)
  }

  return (
    <AppBar sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar>
        <FlexDiv />
        <Stack direction="row" spacing={2}>
          <Button variant="contained" onClick={handleOpenConfigEditor}>
            config
          </Button>
          <Button onClick={handleDownload} variant="contained">
            Download
          </Button>
        </Stack>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
