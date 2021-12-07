import * as React from 'react'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'

import Line from 'features/drawing/components/Line'
import Rect from 'features/drawing/components/Rect'
import Svg from 'utils/components/Svg'

import { ShapeTypeContext } from 'pages/Root'
import Circle from 'features/drawing/components/Circle'

type Point = {
  x: number
  y: number
}

const CreateShape = (shape: string, p1: Point, p2: Point, origin: Point) => {
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
        <Circle
          cx={((center.x - origin.x) / 500) * 100}
          cy={((center.y - origin.y) / 500) * 100}
          rx={(radius.x / 500) * 100}
          ry={(radius.y / 500) * 100}
        />
      )
    }
    case 'Rect': {
      const leftTop: Point = {
        x: Math.min(p1.x, p2.x),
        y: Math.min(p1.y, p2.y),
      }
      const widthHeight: Point = {
        x: Math.abs(p1.x - p2.x),
        y: Math.abs(p1.y - p2.y),
      }
      return (
        <Rect
          x={((leftTop.x - origin.x) / 500) * 100}
          y={((leftTop.y - origin.y) / 500) * 100}
          width={(widthHeight.x / 500) * 100}
          height={(widthHeight.y / 500) * 100}
        />
      )
    }
    case 'Line':
      return (
        <Line
          x1={((p1.x - origin.x) / 500) * 100}
          y1={((p1.y - origin.y) / 500) * 100}
          x2={((p2.x - origin.x) / 500) * 100}
          y2={((p2.y - origin.y) / 500) * 100}
        />
      )
    default:
      break
  }
}

type Props = {
  pasteData?: string | File
}
const Canvas: React.FC<Props> = ({ pasteData }) => {
  const [start, setStart] = React.useState<Point>({
    x: 0,
    y: 0,
  })
  const [items, setItems] = React.useState<React.ReactNode[]>([])
  const { shapeType } = React.useContext(ShapeTypeContext)

  const handleMouseDown = (event: React.MouseEvent) => {
    const { clientX, clientY } = event
    setStart({ x: clientX, y: clientY })
  }
  const handleMouseUp = (event: React.MouseEvent) => {
    const { clientX, clientY } = event
    const { left, top } = event.currentTarget.getBoundingClientRect()
    const end = { x: clientX, y: clientY }
    const canvasOrigin = { x: left, y: top }
    setStart({ x: 0, y: 0 })
    const shape = CreateShape(shapeType, start, end, canvasOrigin)
    if (shape) {
      setItems((prev) => [...prev, shape])
    }
  }

  React.useEffect(() => {
    if (pasteData) {
      console.log(pasteData)
    }
  }, [pasteData])

  return (
    <Box p={20}>
      <Paper
        id="test"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        sx={{ width: '500px', height: '500px' }}>
        <Svg height={500} width={500}>
          {React.Children.toArray(items)}
        </Svg>
      </Paper>
    </Box>
  )
}

export default Canvas
