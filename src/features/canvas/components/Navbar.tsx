import * as React from 'react'
import { styled } from '@mui/material'
import AppBar from '@mui/material/AppBar'
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import Toolbar from '@mui/material/Toolbar'
import Menu from '@mui/material/Menu'

import { ShapeTypeContext } from 'pages/Root'
import { StageRef } from 'contexts/StageRefProvider'
import ColorPicker from './ColorPicker'

const FlexDiv = styled('div')((theme) => ({
  flexGrow: 1,
}))

const Navbar = () => {
  const { shapeType, setShapeType } = React.useContext(ShapeTypeContext)
  const handleChange = (event: SelectChangeEvent) => {
    setShapeType(event.target.value)
  }
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

  const [openMenu, setOpenMenu] = React.useState(false)
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null)

  const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setOpenMenu(true)
    setAnchorEl(event.currentTarget)
  }
  return (
    <AppBar>
      <Toolbar>
        <FormControl>
          <InputLabel id="shape-select-label">Shape</InputLabel>
          <Select
            labelId="shape-select-label"
            id="shape-select"
            value={shapeType}
            label="Shape"
            onChange={handleChange}>
            <MenuItem value={'Select'}>Select</MenuItem>
            <MenuItem value={'Line'}>Line</MenuItem>
            <MenuItem value={'Free'}>Free Line</MenuItem>
            <MenuItem value={'Rect'}>Rect</MenuItem>
            <MenuItem value={'Circle'}>Circle</MenuItem>
            <MenuItem value={'Text'}>Text</MenuItem>
          </Select>
        </FormControl>
        <FlexDiv />
        <Button variant="contained" onClick={handleOpenMenu}>
          color
        </Button>
        <Menu
          open={openMenu}
          anchorEl={anchorEl}
          onClose={() => setOpenMenu(false)}>
          <MenuItem>
            <ColorPicker />
          </MenuItem>
        </Menu>
        <Button onClick={handleDownload} variant="contained">
          Download
        </Button>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
