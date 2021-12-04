import * as React from 'react'

type Props = {
  size?: number
  color?: string
  children: React.ReactNode
}
const Svg: React.FC<Props> = (props: Props) => {
  console.log(props.children)
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.size || 100}
      height={props.size || 100}
      viewBox="0 0 24 24"
      fill="none"
      stroke={props.color || '#000'}
      strokeWidth="2">
      {props.children}
    </svg>
  )
}

export default Svg
