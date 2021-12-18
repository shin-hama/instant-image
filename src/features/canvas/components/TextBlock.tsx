import * as React from 'react'
import { Text } from 'react-konva'
import Konva from 'konva'
import { KonvaEventObject } from 'konva/lib/Node'

import { TextEditorContext } from 'contexts/TextEditorProvider'

type Props = {
  point: Konva.Vector2d
}
const TextBlock = ({ point }: Props) => {
  const [value, setValue] = React.useState('default')
  const edit = React.useContext(TextEditorContext)
  const handleDoubleClick = (event: KonvaEventObject<MouseEvent>) => {
    console.log(event)
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
        console.log('then: ' + result)
      })
      .catch((result) => console.log(result))
      .finally(() => text.show())
  }

  return (
    <Text
      text={value}
      fontSize={20}
      {...point}
      onDblClick={handleDoubleClick}
      onClick={(e) => e.evt.preventDefault()}
    />
  )
}

export default TextBlock
