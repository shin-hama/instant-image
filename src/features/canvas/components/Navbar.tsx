import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import Toolbar from '@mui/material/Toolbar'

const Navbar = () => {
  const [shape, setShape] = React.useState('Line')
  const handleChange = (event: SelectChangeEvent) => {
    setShape(event.target.value)
  }

  return (
    <AppBar>
      <Toolbar>
        <FormControl fullWidth>
          <InputLabel id="shape-select-label">Shape</InputLabel>
          <Select
            labelId="shape-select-label"
            id="shape-select"
            value={shape}
            label="Shape"
            onChange={handleChange}>
            <MenuItem value={'Line'}>Line</MenuItem>
            <MenuItem value={'Rect'}>Rect</MenuItem>
          </Select>
        </FormControl>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
