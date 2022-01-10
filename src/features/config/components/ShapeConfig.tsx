import * as React from 'react'
import Stack from '@mui/material/Stack'

import { useShapeConfig } from 'features/config/contexts/ShapeConfigProvider'
import ColorPicker from 'features/config/components/ColorPicker'

const ShapeConfigEditor = () => {
  const [, setConfig] = useShapeConfig()
  const [color, setColor] = React.useState('#000000')

  React.useEffect(() => {
    setConfig((prev) => ({
      ...prev,
      fill: color,
    }))
  }, [color, setConfig])

  return (
    <Stack spacing={2}>
      <ColorPicker color={color} setColor={setColor} />
    </Stack>
  )
}

export default ShapeConfigEditor
