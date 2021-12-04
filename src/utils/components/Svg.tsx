import * as React from 'react'

type Props = {
  height?: number
  width?: number
  children: React.ReactNode
}
const Svg: React.FC<Props> = (props: Props) => {
  return (
    <svg
      // xmlns="http://www.w3.org/2000/svg"
      height={props.height}
      width={props.width}
      viewBox="0 0 100 100">
      {props.children}
    </svg>
  )
}

export default Svg
