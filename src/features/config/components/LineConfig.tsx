import * as React from 'react'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

import { useLineConfig } from 'features/config/hooks/useLineConfig'
import ColorPicker from 'features/config/components/ColorPicker'

const LineConfigEditor = () => {
  const [config, setConfig] = useLineConfig()
  const [color, setColor] = React.useState('#000000')
  const [width, setWidth] = React.useState(config.strokeWidth || 1)

  const handleWidthChange = (e: SelectChangeEvent<number>) => {
    setWidth(e.target.value as number)
  }

  React.useEffect(() => {
    setConfig((prev) => ({
      ...prev,
      stroke: color,
      strokeWidth: width,
    }))
  }, [color, setConfig, width])

  return (
    <Stack spacing={2}>
      <Stack direction="row">
        <Typography>Width</Typography>
        <FormControl>
          <InputLabel id="line-width-label">line</InputLabel>
          <Select
            labelId="line-width-label"
            id="line-width"
            value={width}
            label="Line"
            onChange={handleWidthChange}>
            {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
              <MenuItem key={item} value={item}>
                {item}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>
      <ColorPicker color={color} setColor={setColor} />
    </Stack>
  )
}

export default LineConfigEditor
