import * as React from 'react'
import { Stage, Layer, Rect } from 'react-konva'

export const Canvas = () => {
  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>
        <Rect
          x={200}
          y={200}
          width={200}
          height={200}
          fill="gray"
          stroke={'blue'}
        />
      </Layer>
    </Stage>
  )
}
