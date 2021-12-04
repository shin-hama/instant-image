import * as React from 'react'
import Svg from 'utils/components/Svg'

type Props = {
  x1: number
  y1: number
  x2: number
  y2: number
}
const Line: React.FC<Props> = (props) => {
  return (
    <Svg>
      <line {...props} fill="none" stroke={'#000'} strokeWidth="2" />
    </Svg>
  )
}

export default Line
