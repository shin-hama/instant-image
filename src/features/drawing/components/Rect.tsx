import * as React from 'react'
import Svg from 'utils/components/Svg'

type Props = {
  x: number
  y: number
  width: number
  height: number
}
const Rect: React.FC<Props> = (props) => {
  return (
    <Svg>
      <rect {...props} fill="none" stroke={'#000'} strokeWidth="2" />
    </Svg>
  )
}

export default Rect
