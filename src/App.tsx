import * as React from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles'

import { PasteDataProvider } from 'contexts/PasteDataProvider'
import { StageRefProvider } from 'contexts/StageRefProvider'
import { TextEditorProvider } from 'contexts/TextEditorProvider'
import Root from 'pages/Root'
import { ConfigProvider } from 'features/config/contexts/ConfigProvider'
import { ShapesProvider } from 'features/canvas/contexts/ShapesProvider'
import { ShapeTypeProvider } from 'features/canvas/contexts/ShapeTypeProvider'

const customTheme = createTheme()

function App() {
  return (
    <div style={{ height: '100%' }}>
      <ThemeProvider theme={customTheme}>
        <PasteDataProvider>
          <StageRefProvider>
            <TextEditorProvider>
              <ConfigProvider>
                <ShapesProvider>
                  <ShapeTypeProvider>
                    <Root />
                  </ShapeTypeProvider>
                </ShapesProvider>
              </ConfigProvider>
            </TextEditorProvider>
          </StageRefProvider>
        </PasteDataProvider>
      </ThemeProvider>
    </div>
  )
}

export default App
