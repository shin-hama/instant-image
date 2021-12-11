import * as React from 'react'
import Box from '@mui/material/Box'

import Canvas from 'features/canvas/components/Canvas'
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
  const [shapeType, setShapeType] = React.useState('Line')
  const [pasteData, setPasteData] = React.useState<string | File>()
  const handlePaste = (e: React.ClipboardEvent) => {
    if (e.clipboardData.files.length > 0) {
      const file = e.clipboardData.files[0]
      setPasteData(file)
    } else {
      setPasteData(e.clipboardData.getData('Text'))
    }
  }

  return (
    <Box onPaste={handlePaste}>
      <ShapeTypeContext.Provider value={{ shapeType, setShapeType }}>
        <Navbar />
        <Canvas pasteData={pasteData} />
      </ShapeTypeContext.Provider>
    </Box>
  )
}

export default Root
