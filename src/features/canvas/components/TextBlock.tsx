import * as React from 'react'
import { Text } from 'react-konva'
import Konva from 'konva'
import { KonvaEventObject } from 'konva/lib/Node'

import { TextEditorContext } from 'contexts/TextEditorProvider'

const useTextEditor = () => {
  const edit = React.useContext(TextEditorContext)
  return edit
}

type Props = {
  point: Konva.Vector2d
}
const TextBlock = ({ point }: Props) => {
  const edit = useTextEditor()
  const handleDoubleClick = (event: KonvaEventObject<MouseEvent>) => {
    console.log('test')
    edit()
      .then(() => console.log('then'))
      .catch(() => console.log('catch'))
  }

  return (
    <Text
      text={'some text'}
      fontSize={20}
      {...point}
      onDblClick={handleDoubleClick}
      onClick={(e) => e.evt.preventDefault()}
    />
  )
}

export default TextBlock
