import * as React from 'react'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { ColorResult, CirclePicker } from 'react-color'

type Props = {
  color: string
  setColor: React.Dispatch<React.SetStateAction<string>>
}
const ColorPicker: React.FC<Props> = ({ color, setColor }) => {
  const handleChangeComplete = (
    color: ColorResult,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setColor(color.hex)
  }

  return (
    <Stack spacing={1}>
      <Typography>Color: {color}</Typography>
      <CirclePicker color={color} onChangeComplete={handleChangeComplete} />
    </Stack>
  )
}

export default ColorPicker
