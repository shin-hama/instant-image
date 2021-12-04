import * as React from 'react'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'

import Line from 'features/drawing/components/Line'
import Svg from 'utils/components/Svg'

const Canvas = () => {
  const [start, setStart] = React.useState({
    x: 0,
    y: 0,
  })
  const [end, setEnd] = React.useState({
    x: 0,
    y: 0,
  })
  const [items, setItems] = React.useState<React.ReactNode[]>([])
  const handleMouseDown = (event: React.MouseEvent) => {
    console.log(event)
    const { clientX, clientY } = event
    setStart({ x: clientX, y: clientY })
  }
  const handleMouseUp = (event: React.MouseEvent) => {
    console.log(end)
    const { clientX, clientY } = event
    console.log(clientX, clientY)
    setEnd({ x: clientX, y: clientY })
    setItems((prev) => [
      ...prev,
      <Line
        key={`item-${prev.length + 1}`}
        x1={(start.x / 500) * 100}
        y1={(start.y / 500) * 100}
        x2={(clientX / 500) * 100}
        y2={(clientY / 500) * 100}
      />,
    ])
  }

  React.useEffect(() => {
    console.log(items)
  }, [items])

  return (
    <Box>
      <Paper
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        sx={{ width: '500px', height: '500px', aspectRatio: '1:1' }}>
        <Svg height={500} width={500}>
          {items}
        </Svg>
      </Paper>
    </Box>
  )
}

export default Canvas
