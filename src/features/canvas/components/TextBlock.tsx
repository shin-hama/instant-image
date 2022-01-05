import * as React from 'react'
import { Text } from 'react-konva'
import Konva from 'konva'
import { KonvaEventObject } from 'konva/lib/Node'

import { TextEditorContext } from 'contexts/TextEditorProvider'
import { useTheme } from '@mui/material/styles'

type Props = {
  point: Konva.Vector2d
  value?: string
}
const TextBlock = ({ point, value: defaultValue = 'default' }: Props) => {
  const [value, setValue] = React.useState(defaultValue)
  const edit = React.useContext(TextEditorContext)
  const theme = useTheme()

  const handleDoubleClick = (event: KonvaEventObject<MouseEvent>) => {
    const text = event.target
    const textPos = text.absolutePosition()
    const pos = {
      x: textPos.x + (text.getStage()?.container().offsetLeft || 0),
      y: textPos.y + (text.getStage()?.container().offsetTop || 0),
    }
    text.hide()
    edit({ pos, value })
      .then((result) => {
        setValue(result)
      })
      .catch((result) => console.log(result))
      .finally(() => text.show())
  }

  return (
    <Text
      text={value}
      fontFamily={theme.typography.fontFamily}
      fontSize={20}
      {...point}
      draggable
      onDblClick={handleDoubleClick}
      onClick={(e) => e.evt.preventDefault()}
    />
  )
}

export default TextBlock
