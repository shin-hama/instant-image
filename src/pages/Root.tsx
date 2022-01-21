import * as React from 'react'
import Box from '@mui/material/Box'

import { Canvas } from 'features/canvas/components/Canvas'
import Navbar from 'features/canvas/components/Navbar'

type ShapeTypeProps = {
  shapeType: string
  setShapeType: React.Dispatch<React.SetStateAction<string>>
}
export const ShapeTypeContext = React.createContext<ShapeTypeProps>({
  shapeType: 'Line',
  setShapeType: () => {
    // no run
  },
})

const Root = () => {
  const [shapeType, setShapeType] = React.useState('Select')

  return (
    <Box sx={{ background: 'grey' }}>
      <ShapeTypeContext.Provider value={{ shapeType, setShapeType }}>
        <Navbar />
        <Box
          onCopy={() => console.log('handlePaste')}
          onPaste={() => console.log('test')}>
          <Canvas />
        </Box>
      </ShapeTypeContext.Provider>
    </Box>
  )
}

export default Root
