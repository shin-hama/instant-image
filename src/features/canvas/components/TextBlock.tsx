import * as React from 'react'
import { Text } from 'react-konva'
import Konva from 'konva'
import TextField from '@mui/material/TextField'
import { KonvaEventObject } from 'konva/lib/Node'

type Props = {
  point: Konva.Vector2d
}
const TextBlock = ({ point }: Props) => {
  const [editing, setEditing] = React.useState(false)
  const handleDoubleClick = (event: KonvaEventObject<MouseEvent>) => {
    console.log('test')
    setEditing(true)
  }
  const [value, setValue] = React.useState('some text')

  return editing ? (
    <TextField value={value} onChange={(e) => setValue(e.target.value)} />
  ) : (
    <Text
      text={value}
      fontSize={20}
      {...point}
      onDblClick={handleDoubleClick}
      onClick={(e) => {
        console.log('clicked')
        e.evt.preventDefault()
      }}
    />
  )
}

export default TextBlock
