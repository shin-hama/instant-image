import * as React from 'react'
// import Svg from './Svg'

const viewBox = 24

type Props = {
  x1: number
  y1: number
  x2: number
  y2: number
}
const Line: React.FC<Props> = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={500}
      height={500}
      viewBox={`0 0 ${viewBox} ${viewBox}`}
      fill="none"
      stroke={'#000'}
      strokeWidth="2">
      <line {...props} />
    </svg>
  )
}

export default Line
