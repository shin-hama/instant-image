import * as React from 'react'
import { styled } from '@mui/material'
import AppBar from '@mui/material/AppBar'
import Button from '@mui/material/Button'
import Toolbar from '@mui/material/Toolbar'

import { StageRef } from 'contexts/StageRefProvider'
import { useConfigEditor } from 'features/config/contexts/ConfigEditorProvider'

const FlexDiv = styled('div')((theme) => ({
  flexGrow: 1,
}))

const Navbar = () => {
  const stageRef = React.useContext(StageRef)
  const handleDownload = () => {
    if (stageRef?.current) {
      const dataUrl = stageRef.current.toDataURL()
      const link = document.createElement('a')
      link.download = 'stage.png'
      link.href = dataUrl
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  const setConfigEditor = useConfigEditor()

  const handleOpenShapeEditor = () => {
    setConfigEditor('Shape')
  }

  const handleOpenLineEditor = () => {
    setConfigEditor('Line')
  }

  return (
    <AppBar sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar>
        <FlexDiv />
        <Button variant="contained" onClick={handleOpenLineEditor}>
          line
        </Button>
        <Button variant="contained" onClick={handleOpenShapeEditor}>
          shape
        </Button>
        <Button onClick={handleDownload} variant="contained">
          Download
        </Button>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
