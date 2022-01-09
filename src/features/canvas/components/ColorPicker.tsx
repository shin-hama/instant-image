import * as React from 'react'
import { ColorResult, CirclePicker } from 'react-color'
import { ColorContext } from '../contexts/ColorProvider'

const ColorPicker = () => {
  const { color, setColor } = React.useContext(ColorContext)

  const handleChangeComplete = (
    color: ColorResult,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setColor(color.hex)
  }

  return <CirclePicker color={color} onChangeComplete={handleChangeComplete} />
}

export default ColorPicker
