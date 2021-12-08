import * as React from 'react'
import Svg from 'utils/components/Svg'

type Props = {
  x: number
  y: number
  width: number
  height: number
  xlinkHref: string
}
const SvgImage: React.FC<Props> = (props) => {
  return (
    <Svg>
      <image {...props} />
    </Svg>
  )
}

export default SvgImage
