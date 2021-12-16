import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import Toolbar from '@mui/material/Toolbar'

import { ShapeTypeContext } from 'pages/Root'

const Navbar = () => {
  const { shapeType, setShapeType } = React.useContext(ShapeTypeContext)
  const handleChange = (event: SelectChangeEvent) => {
    setShapeType(event.target.value)
  }

  return (
    <AppBar>
      <Toolbar>
        <FormControl fullWidth>
          <InputLabel id="shape-select-label">Shape</InputLabel>
          <Select
            labelId="shape-select-label"
            id="shape-select"
            value={shapeType}
            label="Shape"
            onChange={handleChange}>
            <MenuItem value={'Line'}>Line</MenuItem>
            <MenuItem value={'Rect'}>Rect</MenuItem>
            <MenuItem value={'Circle'}>Circle</MenuItem>
            <MenuItem value={'Text'}>Text</MenuItem>
          </Select>
        </FormControl>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
