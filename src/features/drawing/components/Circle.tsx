import * as React from 'react'
import Svg from 'utils/components/Svg'

type Props = {
  cx: number
  cy: number
  rx?: number
  ry?: number
}
const Circle: React.FC<Props> = (props) => {
  return (
    <Svg>
      <ellipse {...props} fill="none" stroke={'#000'} strokeWidth="2" />
    </Svg>
  )
}

export default Circle
