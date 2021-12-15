import * as React from 'react'
import { Stage, Layer, Rect, Line, Ellipse } from 'react-konva'
import Konva from 'konva'

import { ShapeTypeContext } from 'pages/Root'

const CreateShape = (shape: string, p1: Konva.Vector2d, p2: Konva.Vector2d) => {
  switch (shape) {
    case 'Circle': {
      const center = {
        x: (p1.x + p2.x) / 2,
        y: (p1.y + p2.y) / 2,
      }
      const radius = {
        x: Math.abs(p1.x - p2.x) / 2,
        y: Math.abs(p1.y - p2.y) / 2,
      }
      return (
        <Ellipse
          x={center.x}
          y={center.y}
          radiusX={radius.x}
          radiusY={radius.y}
          fill="gray"
          stroke="blue"
        />
      )
    }
    case 'Rect': {
      const leftTop: Konva.Vector2d = {
        x: Math.min(p1.x, p2.x),
        y: Math.min(p1.y, p2.y),
      }
      const widthHeight: Konva.Vector2d = {
        x: Math.abs(p1.x - p2.x),
        y: Math.abs(p1.y - p2.y),
      }
      return (
        <Rect
          x={leftTop.x}
          y={leftTop.y}
          width={widthHeight.x}
          height={widthHeight.y}
          fill="gray"
          stroke="blue"
        />
      )
    }
    case 'Line':
      return (
        <Line points={[p1.x, p1.y, p2.x, p2.y]} stroke="blue" strokeWidth={4} />
      )
    default:
      break
  }
}

export const Canvas = () => {
  const { shapeType } = React.useContext(ShapeTypeContext)
  const [start, setStart] = React.useState<Konva.Vector2d>({
    x: 0,
    y: 0,
  })
  const [items, setItems] = React.useState<React.ReactNodeArray>([])

  const handleMouseDown = (event: Konva.KonvaEventObject<MouseEvent>) => {
    console.log(event)
    const pos = event.target.getStage()?.getPointerPosition()
    if (pos) {
      setStart(pos)
    }
  }
  const handleMouseUp = (event: Konva.KonvaEventObject<MouseEvent>) => {
    const pos = event.target.getStage()?.getPointerPosition()
    console.log(pos)
    setStart({ x: 0, y: 0 })
    if (pos) {
      const shape = CreateShape(shapeType, start, pos)
      if (shape) {
        setItems((prev) => [...prev, shape])
      }
    }
  }
  return (
    <Stage
      width={window.innerWidth}
      height={window.innerHeight}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}>
      <Layer>
        <Rect
          x={200}
          y={200}
          width={200}
          height={200}
          fill="gray"
          stroke={'blue'}
        />
        {items.map((item) => item)}
      </Layer>
    </Stage>
  )
}
