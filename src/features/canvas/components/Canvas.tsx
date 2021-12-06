import * as React from 'react'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'

// import Line from 'features/drawing/components/Line'
import Rect from 'features/drawing/components/Rect'
import Svg from 'utils/components/Svg'

const Canvas = () => {
  const [start, setStart] = React.useState({
    x: 0,
    y: 0,
  })
  const [items, setItems] = React.useState<React.ReactNode[]>([])
  const handleMouseDown = (event: React.MouseEvent) => {
    const { clientX, clientY } = event
    setStart({ x: clientX, y: clientY })
  }
  const handleMouseUp = (event: React.MouseEvent) => {
    const { clientX, clientY } = event
    const { left, top } = event.currentTarget.getBoundingClientRect()
    setStart({ x: 0, y: 0 })
    setItems((prev) => [
      ...prev,
      // <Line
      //   key={`item-${prev.length + 1}`}
      //   x1={((start.x - left) / 500) * 100}
      //   y1={((start.y - top) / 500) * 100}
      //   x2={((clientX - left) / 500) * 100}
      //   y2={((clientY - top) / 500) * 100}
      // />,
      <Rect
        key={`item-${prev.length + 1}`}
        x={((start.x - left) / 500) * 100}
        y={((start.y - top) / 500) * 100}
        width={((clientX - start.x) / 500) * 100}
        height={((clientY - start.y) / 500) * 100}
      />,
    ])
  }

  React.useEffect(() => {
    console.log(items)
  }, [items])

  return (
    <Box p={20}>
      <Paper
        id="test"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        sx={{ width: '500px', height: '500px' }}>
        <Svg height={500} width={500}>
          {items}
        </Svg>
      </Paper>
    </Box>
  )
}

export default Canvas
