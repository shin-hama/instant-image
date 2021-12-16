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
  const [shapeType, setShapeType] = React.useState('Line')
  const [pasteData, setPasteData] = React.useState<string | File>()
  const handlePaste = (e: ClipboardEvent) => {
    if (e.clipboardData === null) {
      return
    }

    if (e.clipboardData.files.length > 0) {
      const file = e.clipboardData.files[0]
      setPasteData(file)
    } else {
      setPasteData(e.clipboardData.getData('Text'))
    }
  }

  React.useEffect(() => {
    document.addEventListener('paste', handlePaste)

    return () => {
      document.removeEventListener('paste', handlePaste)
    }
  }, [])

  return (
    <Box>
      <ShapeTypeContext.Provider value={{ shapeType, setShapeType }}>
        <Navbar />
        <Box
          onCopy={() => console.log('handlePaste')}
          sx={{ margin: 10, border: 'black' }}
          onPaste={() => console.log('test')}>
          <Canvas pasteData={pasteData} />
        </Box>
      </ShapeTypeContext.Provider>
    </Box>
  )
}

export default Root
