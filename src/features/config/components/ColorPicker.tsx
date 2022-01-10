import * as React from 'react'
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

  return <CirclePicker color={color} onChangeComplete={handleChangeComplete} />
}

export default ColorPicker
